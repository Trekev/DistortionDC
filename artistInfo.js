const { Client } = require('pg');
var request = require('request');
var Spotify = require('spotify-web-api-js');
var XMLHttpRequest = require("xmlhttprequest");


var spotifyApi = new Spotify();
spotifyApi.setAccessToken('BQDnc_6eRpmcACVmRZHtp55JCdWnHhn6emhKIPseAJW_ff5Xs-oAmyIjuR6t4coH9SlHEzcVHyPCWP2RhkezSmtmUGApGa0sSqbty-EQ7FZTM3HRIpIW0OotzjK1iJUukpD1Adm_2r2tCg');




const client = new Client({
  connectionString: "postgres://zygjgjaweejdzc:5a069c486f07e7d474c26a4a2c2ab0062e981518ebf10d530e9c3ac93849731b@ec2-23-23-212-121.compute-1.amazonaws.com:5432/denhrngn50051u",
  ssl: true,
  });


client.connect();
const query = "SELECT * FROM upcoming_show"

function getArtist(){
  return new Promise(function(resolve,reject){
    client.query(query, (err,res) =>{
      if (err) throw err;
      var searchlist = [];
      for (let row of res.rows){
        var search = row['band'].replace(/ /g,'+');
        var key = row['id']
        var obj = {}
        obj[key] = search
        searchlist.push(obj);
      }
      resolve(searchlist);
    })
  })
  }
function getID(artist){
  return new Promise((resolve,reject) => {
      idList =[]
      spotifyApi.searchArtists(artist, function(err, data) {
        if (err) console.error(err);

        if(data['artists']['total']> 0){
          resolve(data['artists']['items'][0]['id'])
        }
        else {resolve('')};
      })
    })
    }
  getArtist()
    .then(v => { // `getArtist` returns a promise
      var ids = Object.keys(v)



           v.forEach(searchstring =>{
             getID(Object.values(searchstring)[0]).then(b =>{
             id = Object.keys(searchstring)[0]
             var updatestring = "UPDATE upcoming_show SET artist_id='"+b+"' WHERE id='"+id+"'"
             console.log(updatestring)

             client.query(updatestring)
             .then(res => console.log(res.rows[0]))
             .catch(e => console.error(e.stack))


          }).catch()
        })

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
