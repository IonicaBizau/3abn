
# `$ 3abn`

 [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/3abn.svg)](https://www.npmjs.com/package/3abn) [![Downloads](https://img.shields.io/npm/dt/3abn.svg)](https://www.npmjs.com/package/3abn) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> A 3ABN radio client in the terminal.

This project uses the media stream from [this page](http://3abn.org/media/3abn-radio-broadcast/3abn-music-channel/). You can listen to it in the browser as well.

## :cloud: Installation

You can install the package globally and use it as command line tool:


```sh
$ npm i -g 3abn
```


Then, run `3abn --help` and see what the CLI tool can do.


```
$ 3abn --help
Usage: 3abn [options]

A 3ABN radio client in the terminal.

Options:
  -d, --daemon   If provided, the process will run in background.
  -v, --version  Displays version information.
  -h, --help     Displays this help.

Documentation can be found at https://github.com/IonicaBizau/3abn#readme.
```

## :clipboard: Example


Here is an example how to use this package as library. To install it locally, as library, you can do that using `npm`:

```sh
$ npm i --save 3abn
```



```js
const ThreeABN = require("3abn")

ThreeABN.playlistInfo((err, data) => {
    if (err) { return console.error(err); }
    console.log(data.playlist.map(c => `${c.date.format("HH:mm")} - ${c.title}`).join("\n"));

    // Start playing
    let radio = new ThreeABN({ autoplay: false });
    radio.on("song_changed", (err, current, latestFive, playlist) => {
        console.log("Playing: " + current);
    });
});
```

## :memo: Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
