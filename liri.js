require('dotenv').config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var axios = require('axios');
var spotify = new Spotify(keys.spotify);

var argCommand = process.argv[2];
var argSearch = process.argv[3];

function spotifyThis() {
    spotify.search({ type: 'track', query: argSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        const items = data.tracks.items
        console.log('---------------------------------------------------------')
        items.forEach(res => {
            console.log(res.artists[0].name)
            console.log(res.name)
            console.log(res.external_urls.spotify)
            console.log(res.album.name)
            console.log('---------------------------------------------------------')
        });
    });
}

function concertThis() {
    console.log('stuff');
}

function movieThis() {
    console.log('stuff');
}

function doWhatItSays() {
    console.log('stuff');
}

switch (argCommand) {
    case 'concert-this':
        concertThis();
        break;
    case 'spotify-this-song':
        spotifyThis();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
}
