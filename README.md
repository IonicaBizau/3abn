
# `$ 3abn`

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Version](https://img.shields.io/npm/v/3abn.svg)](https://www.npmjs.com/package/3abn) [![Downloads](https://img.shields.io/npm/dt/3abn.svg)](https://www.npmjs.com/package/3abn)

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

## :question: Get Help

There are few ways to get help:

 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help from me, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:


## :memo: Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:



## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
