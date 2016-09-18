"use strict";

const ThreeABN = require("../lib")

ThreeABN.playlistInfo((err, data) => {
    if (err) { return console.error(err); }
    console.log(data.playlist.map(c => `${c.date.format("HH:mm")} - ${c.title}`).join("\n"));

    // Start playing
    let radio = new ThreeABN({ autoplay: false });
    radio.on("song_changed", (err, current, latestFive, playlist) => {
        console.log("Playing: " + current);
    });
});
