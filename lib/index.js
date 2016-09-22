"use strict";

const Player = require("player")
    , ul = require("ul")
    , scrapeIt = require("scrape-it")
    , Daty = require("daty")
    , EventEmitter = require("events")
    , PageChanged = require("page-changed")
    , htmlDecoder = require("html-encoder-decoder")
    ;

// Constants
const PLAY_URL = "http://war.str3am.com:7180/MC01"
    , PLAYLIST_URL = "http://3abn.biz/RDO-MC_Playlist.htm"
    ;

class ThreeAbn extends Player {
    /**
     * threeAbn
     * Streams audio from `3abn.org`.
     *
     * @name threeAbn
     * @function
     * @param {Object} options An object containing the following fields:
     *
     *  - `autoplay` (Boolean): Autoplays the radio (default: `true`).
     *
     * @return {Player} The `Player` instance (see the `player` npm package).
     */
    constructor (options) {
        super(PLAY_URL);

        options = ul.merge(options, {
            autoplay: true
        });

        this.on("playing", () => {
            this.is_playing = true;
        })

        this.enable("stream");
        if (options.autoplay) {
            this.play();
        }

        new PageChanged(PLAYLIST_URL, (err, body) => {
            if (err) { return this.emit("song_changed_changed", err); }
            ThreeAbn.playlistInfo((err, data) => {
                if (err) { return this.emit("song_changed_changed", err); }
                this.songInfo = data;
                this.emit("song_changed", err, data.playing, data);
            });
        });

        this.songInfo = null;
    }

    /**
     * playlistInfo
     * Get the playlist information.
     *
     * @name playlistInfo
     * @function
     * @param {Function} cb The callback function.
     */
    static playlistInfo (cb) {
        return scrapeIt(PLAYLIST_URL, {
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
                    return html.split("<br>").slice(0, -1).map(c => {
                        let s = c.split(" - ")
                          , rawTime = s[0].slice(0, -2)
                          , isPM = s[0].slice(-2) === "pm"
                          , timeSplits = rawTime.split(":")
                          , hours = +timeSplits[0] + (isPM ? 12 : 0)
                          , minutes = +timeSplits[1]
                          , dat = new Daty()
                          ;

                        // 5 is the timezone offset
                        dat.setUTCHours(hours + 5);
                        dat.setUTCMinutes(minutes);

                        return {
                            title: s.slice(1).join(" - ")
                          , song_name: s[2]
                          , artist: s[1]
                          , raw_time: s[0]
                          , date: dat
                        }
                    });
                }
            }
        }, cb);
    }
}

module.exports = ThreeAbn;
