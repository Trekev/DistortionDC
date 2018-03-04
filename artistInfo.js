const { Client } = require('pg');
var request = require('request');

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

  getArtist()
    .then(function(v) { // `getArtist` returns a promise
      for(let row of v){console.log(row)}; // iterate through results

    })
    .catch(function(v) {
    });

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
