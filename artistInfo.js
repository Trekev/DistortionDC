const { Client } = require('pg');
var request = require('request');
var Spotify = require('spotify-web-api-js');
var XMLHttpRequest = require("xmlhttprequest");


var spotifyApi = new Spotify();
spotifyApi.setAccessToken('BQAzlJycT22FydDwnNXDMr17yRhP_DWHZnR1oD2SnUnExCaCa9XB3TBljxc0ODw44q1sqYPM7Y9NRhEbqmKaX7EfZC_F9hvvvgeUiLKq3oY-H--I2MCZaNFV-dSthIh8ukYItID_PndHYA');




const client = new Client({
  connectionString: "postgres://zygjgjaweejdzc:5a069c486f07e7d474c26a4a2c2ab0062e981518ebf10d530e9c3ac93849731b@ec2-23-23-212-121.compute-1.amazonaws.com:5432/denhrngn50051u",
  ssl: true,
  });


client.connect();
const query = "SELECT band FROM upcoming_show"

function getArtist(){
  return new Promise(function(resolve,reject){
    client.query(query, (err,res) =>{
      if (err) throw err;
      var searchlist = [];
      for (let row of res.rows){
        var search = row['band'].replace(/ /g,'+');
        searchlist.push(search);
      }
      resolve(searchlist);
    })
  })
  }
function getID(artist){
  return new Promise((resolve,reject) => {
      spotifyApi.searchArtists(row, function(err, data) {
        if (err) console.error(err);
        if(data['artists']['total']> 0){
          resolve(data['artists']['items'][0]['id'])
        }
        else {idList.push('')};
      })
    })
    }
  getArtist()
    .then(v => { // `getArtist` returns a promise

          }

          getID().then(b =>{console.log(b)}).catch()

      })
    .catch(function(v) { });

// client.query(query, (err,res) =>{
//
//   return new Promise(function(resolve, reject){
//     if (err) throw err;
//     var searchlist = [];
//     for (let row of res.rows){
//
//       var search = row['band'].replace(/ /g,'+');
//       searchlist.push(search);
//     // if (search.indexOf('w/') > 0){search = search.substring(0, search.indexOf('w/'))}
//
//
//
//     }
//     resolve(searchlist);
// });
// });
//
//   client.query(query)
//     .then(res => console.log(res))
//     .catch(e => console.error(e.stack))
//
// client.end();
