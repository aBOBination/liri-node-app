# liri-node-app

This is a LIRI app meant to help users search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

# Prerequisites

- create a `.env` file in the project directory and populate with your api keys in the following format:

```
# Spotify and OMDB API keys

SPOTIFY_ID=********************************
SPOTIFY_SECRET=********************************
OMDB_KEY=********
```
* Next you'll want to do a `npm install` in the project directory to ensure all packages are installed

# Commands
### Below are the commands you can use for this app.

- `concert-this`

- `spotify-this-song`

- `movie-this`

- `do-what-it-says` (This command picks a randon command from above)

In order to search type the following in your termal of the project directory:

```
node liri.js [command from above] "search term"
```
# Examples:

Below is an example of searching for concerts.

```
node liri.js concert-this foofighters
```

[![Image from Gyazo](https://i.gyazo.com/6f05ff1e0f5917986959a5f000c2b7a9.gif)](https://gyazo.com/6f05ff1e0f5917986959a5f000c2b7a9)

---

```
node liri.js do-what-it-says
```

[![Image from Gyazo](https://i.gyazo.com/13b235aa9a612901a5aa67c15821f501.gif)](https://gyazo.com/13b235aa9a612901a5aa67c15821f501)

---
# Packages Installed

    "axios": "^0.19.2",
    "dotenv": "^8.2.0",
    "figlet": "^1.4.0",
    "node-spotify-api": "^1.1.1",
    "simple-node-logger": "^18.12.24"
