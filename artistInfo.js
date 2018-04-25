const { Client } = require('pg');
var request = require('request');
var Spotify = require('spotify-web-api-node');
var XMLHttpRequest = require("xmlhttprequest");




  var spotifyApi = new Spotify({

      redirectUri : 'http://localhost:8888/callback/'
    }

  );
  function wait4token(){
  return new Promise(resolve => {
  spotifyApi.clientCredentialsGrant()
    .then(function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      resolve();
    }, function(err) {
      console.log('Something went wrong when retrieving an access token', err.message);
    });
})
}

const client = new Client({
  connectionString: "postgres://zygjgjaweejdzc:5a069c486f07e7d474c26a4a2c2ab0062e981518ebf10d530e9c3ac93849731b@ec2-23-23-212-121.compute-1.amazonaws.com:5432/denhrngn50051u",
  ssl: true,
  });


client.connect();
const query = "SELECT * FROM upcoming_show"

async function getArtist(){
  var x = await wait4token()
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
      spotifyApi.searchArtists(artist).then(function(data){
        if(data['body']['artists']['total']> 0){
          resolve(data['body']['artists']['items'][0]['id'])
        }
      }).catch(function(err){console.log(err)})

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

async function getGenre(){
  var x = await wait4token()

    client.query("SELECT artist_id FROM upcoming_show", (err,res) =>{
      if (err) throw err;
      for (let row of res.rows){
        row = row['artist_id']
        if (typeof(row) == 'string'){
          if (row.length > 2){
            spotifyApi.getArtist(row)
              .then(function(data) {
                var b = data.body['genres']
                var updatestring = "UPDATE upcoming_show SET genres='"+b+"' WHERE artist_id='"+row+"'";
                client.query(updatestring)
                .then(res => console.log(res.rows[0]))
                .catch(e => console.error(e.stack))
              }, function(err) {
                console.error(err);
              });
          }
        };
      }
    })

  }

getGenre()
