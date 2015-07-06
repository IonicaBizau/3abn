var Player = require("player")
  , Diable = require('diable')
  ;

if (!Diable.isDaemon()) {
  Diable({exit: false});
  return setTimeout(process.exit, 1000);
}


var pl = new Player("http://216.235.85.20/play?s=mcfnetwork1");
pl.enable("stream");
pl.on("playing", console.log);
pl.on("playend", console.log);
pl.on("error", console.log);
pl.play();
