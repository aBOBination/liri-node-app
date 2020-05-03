require('dotenv').config();
var fs = require('fs');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var axios = require('axios');
var figlet = require('figlet');
var moment = require('moment');
const { exec } = require('child_process');

var argCommand = process.argv[2];
var argSearch = process.argv.slice(3).join(' ');

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

// create a custom timestamp format for log statements
var logMessage = 'node liri.js ' + argCommand + ' ' + (argSearch ? argSearch : '').trim();

const log = require('simple-node-logger').createSimpleLogger('log.txt');
log.info(logMessage + ' ', new Date().toJSON());

function spotifyThis() {
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: argSearch }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    const items = data.tracks.items;
    console.log('========================================================= \n');
    items.forEach((res) => {
      console.log('Artist:    ' + res.artists[0].name);
      console.log('Song Name: ' + res.name);
      console.log('URL:       ' + res.external_urls.spotify);
      console.log('Album:     ' + res.album.name + '\n');
      console.log('========================================================= \n');
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
      console.log('========================================================= \n');
      data.forEach((item) => {
        console.log('Venue:    ' + item.venue.name);
        console.log('Location: ' + item.venue.location);
        console.log('Date:     ' + moment(item.datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY') + '\n');
        console.log('========================================================= \n');
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
      console.log('========================================================= \n');
      console.log('Title:                   ' + data.Title); // "MM/DD/YYYY"
      console.log('Year:                    ' + data.Year);
      console.log('IMDB Rating:             ' + data.imdbRating);
      data.Ratings.forEach((rating) => {
        if (rating.Source === 'Rotten Tomatoes') {
          console.log('Rotten Tomatoes Rating:  ' + rating.Value);
        }
      });
      console.log('Country:                 ' + data.Country);
      console.log('Language:                ' + data.Language);
      console.log('Plot:                    ' + data.Plot);
      console.log('Actors:                  ' + data.Actors + '\n');
      console.log('========================================================= \n');
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
    var dataArr = data.split('\n');
    var randomIndex = Math.floor(Math.random() * dataArr.length);
    exec('node liri.js ' + dataArr[randomIndex].split(',').join(' '), (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
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
    sexyText(movieThis());
    break;
  case 'do-what-it-says':
    doWhatItSays();
    break;
}
