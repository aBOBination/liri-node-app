require('dotenv').config();
var fs = require('fs');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var axios = require('axios');
var spotify = new Spotify(keys.spotify);
var argCommand = process.argv[2];
var argSearch = process.argv[3];
var figlet = require('figlet');

function sexyText(run) {
    figlet(argSearch, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
        run;
    });
}

function spotifyThis() {
    spotify.search({ type: 'track', query: argSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        const items = data.tracks.items;
        console.log('---------------------------------------------------------');
        items.forEach((res) => {
            console.log(res.artists[0].name);
            console.log(res.name);
            console.log(res.external_urls.spotify);
            console.log(res.album.name);
            console.log('---------------------------------------------------------');
        });
    });
}

function concertThis() {
    var url = 'https://rest.bandsintown.com/artists/' + argSearch + '/events?app_id=codingbootcamp';

    axios
        .get(url)
        .then(function (response) {
            // handle success
            data = response.data;
            console.log('---------------------------------------------------------');
            data.forEach((item) => {
                console.log(item.datetime); // "MM/DD/YYYY"
                console.log(item.venue.name);
                console.log(item.venue.location);
                console.log('---------------------------------------------------------');
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

function movieThis() {
    var omdb_key = keys.omdb.key;
    var url = 'http://www.omdbapi.com/?apikey=' + omdb_key + '&t=' + argSearch;

    axios
        .get(url)
        .then(function (response) {
            // handle success
            data = response.data;
            console.log('---------------------------------------------------------');
            console.log('Title                  : ' + data.Title); // "MM/DD/YYYY"
            console.log('Year                   : ' + data.Year);
            console.log('IMDB Rating            : ' + data.imdbRating);
            data.Ratings.forEach((rating) => {
                if (rating.Source === 'Rotten Tomatoes') {
                    console.log('Rotten Tomatoes Rating : ' + rating.Value);
                }
            });
            console.log('Country                : ' + data.Country);
            console.log('Language               : ' + data.Language);
            console.log('Plot                   : ' + data.Plot);
            console.log('Actors                 : ' + data.Actors);
            console.log('---------------------------------------------------------');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(',');

        // We will then re-display the content as an array for later use.
        console.log(dataArr);
    });
}

switch (argCommand) {
    case 'concert-this':
        sexyText(concertThis());
        break;
    case 'spotify-this-song':
        sexyText(spotifyThis());
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
}
