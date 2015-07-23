// Dependencies
var Player = require("player")
  , Ul = require("ul")
  ;

// Constants
const PLAY_URL = "http://216.235.85.20/play?s=";

/**
 * live365
 * Streams audio from `live365` by providing the radio name.
 *
 * @name live365
 * @function
 * @param {String} radioName The radio name on live365.
 * @param {Object} options An object containing the following fields:
 * @return {Player} The `Player` instance (see the `player` npm package).
 */
function live365 (radioName, options) {
    var pl = new Player(PLAY_URL + radioName);
    options = Ul.merge(options, {
        autoplay: true
    });
    pl.enable("stream");
    pl.play();
    return pl;
}

module.exports = live365;
