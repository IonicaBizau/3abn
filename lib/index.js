"use strict";

const ul = require("ul")
    , scrapeIt = require("scrape-it")
    , Daty = require("daty")
    , EventEmitter = require("events")
    , PageChanged = require("page-changed")
    , htmlDecoder = require("html-encoder-decoder")
    , noop = require("noop6")
    , abs = require("abs")
    , fs = require("fs")
    , spawn = require("child_process").spawn
    ;

// Constants
const PLAY_URL = "http://war.str3am.com:7180/MC01"
    , PLAYLIST_URL = "https://3abnpraisehim.tv/RDO-MC_Playlist.htm"
    ;

class ThreeAbn extends EventEmitter {

    /**
     * threeAbn
     * Streams audio from `3abn.org`.
     *
     * @name threeAbn
     * @function
     * @param {Object} options An object containing the following fields:
     *
     *  - `autoplay` (Boolean): Autoplays the radio (default: `true`).
     *  - `favorites_path` (String): The favorite songs file path (default: `~/3abn-favorites`).
     *
     * @return {Player} The `Player` instance (see the `player` npm package).
     */
    constructor (options) {
        super();

        options = this.abn_options = ul.merge(options, {
            autoplay: true
          , favorites_path: abs("~/3abn-favorites")
        });

        this.songInfo = null;
        this.is_playing = false;
        this._player = null;

        this.on("playing", () => {
            this.is_playing = true;
        });

        if (options.autoplay) {
            this.play();
        }

        this._page = new PageChanged(PLAYLIST_URL, (err, body) => {
            if (err) { return this.emit("song_changed_error", err); }
            ThreeAbn.playlistInfo(body, (err, data) => {
                if (err) { return this.emit("song_changed_error", err); }
                this.songInfo = data;
                this.liked_current_song = false;
                this.emit("song_changed", err, data.playing, data);
            });
        });

    }

    /**
     * play
     * Play the live stream.
     *
     * @name play
     * @function
     */
    play () {
        if (this._player) { return; }

        const player = this._player = spawn("ffplay", ["-nodisp", "-loglevel", "error", PLAY_URL], {
            stdio: "ignore"
        });

        player.on("spawn", () => this.emit("playing"));
        player.on("error", err => {
            this._player = null;
            this.emit("error", err);
        });
        player.on("exit", () => {
            if (this._player !== player) { return; }
            this._player = null;
            this.is_playing = false;
            this.emit("playend");
        });
    }

    stop () {
        if (this._player) { this._player.kill(); }
        if (this._page) { clearInterval(this._page.interval); }
        this._player = null;
        this.is_playing = false;
    }

    /**
     * playlistInfo
     * Get the playlist information.
     *
     * @name playlistInfo
     * @function
     * @param {Function} cb The callback function.
     */
    static playlistInfo (html, cb) {
        let scrapingInfo = {
            playing: {
                selector: "table td"
              , eq: 1
            }
          , playlist: {
                selector: "table td"
              , eq: 3
              , how: "html"
              , convert (html) {
                    html = htmlDecoder.decode(html);
                    return html.split(/<br\s*\/?>/i).filter(Boolean).map(c => {
                        let s = c.split(" - ")
                          , rawTime = s[0].trim().slice(0, -2).trim()
                          , isPM = s[0].trim().slice(-2) === "pm"
                          , timeSplits = rawTime.split(":")
                          , hours = (+timeSplits[0] % 12) + (isPM ? 12 : 0)
                          , minutes = +timeSplits[1]
                          , dat = new Daty()
                          ;

                        // 5 is the timezone offset
                        dat.setUTCHours(hours + 5);
                        dat.setUTCMinutes(minutes);

                        return {
                            title: s.slice(1).join(" - ").trim()
                          , song_name: s.slice(2).join(" - ").trim()
                          , artist: (s[1] || "").trim()
                          , raw_time: s[0].trim()
                          , date: dat
                        }
                    });
                }
            }
        };

        if (typeof html === "function") {
            cb = html;
            html = null;
        }

        if (html) {
            return cb(null, scrapeIt.scrapeHTML(html, scrapingInfo));
        }

        return scrapeIt(PLAYLIST_URL, scrapingInfo, (err, result) => {
            cb(err, result && result.data);
        });
    }

    /**
     * likeCurrentSong
     * Stores the current song name in the favorites list.
     *
     * @name likeCurrentSong
     * @function
     * @param {Function} cb The callback function.
     */
    likeCurrentSong (cb) {
        cb = cb || noop;
        if (this.liked_current_song) { return cb(null, null, false); }
        if (!this.songInfo) {
            return cb(new Error("Missing the song information."));
        }
        fs.appendFile(this.abn_options.favorites_path, `${this.songInfo.playing}\n`, err => {
            if (!err) {
                this.liked_current_song = true;
                this.emit("liked_current");
            }
            cb(err);
        });
    }
}

module.exports = ThreeAbn;
