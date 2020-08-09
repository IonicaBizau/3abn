## Documentation

You can see below the API reference of this module.

### `threeAbn(options)`
Streams audio from `3abn.org`.

#### Params

- **Object** `options`: An object containing the following fields:
 - `autoplay` (Boolean): Autoplays the radio (default: `true`).
 - `favorites_path` (String): The favorite songs file path (default: `~/3abn-favorites`).

#### Return
- **Player** The `Player` instance (see the `player` npm package).

### `play()`
Play the live stream.

### `playlistInfo(cb)`
Get the playlist information.

#### Params

- **Function** `cb`: The callback function.

### `likeCurrentSong(cb)`
Stores the current song name in the favorites list.

#### Params

- **Function** `cb`: The callback function.

