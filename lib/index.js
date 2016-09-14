"use strict";

const Player = require("player")
    , ul = require("ul")
    ;

// Constants
const PLAY_URL = "http://war.str3am.com:7180/MC01";

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
module.exports = options => {
    let pl = new Player(PLAY_URL);

    options = ul.merge(options, {
        autoplay: true
    });

    pl.enable("stream");

    if (options.autoplay) {
        pl.play();
    }

    return pl;
};
