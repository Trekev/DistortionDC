
var request = require('request');
var genre_dict = {
  "Rock": 1,
  "R&B": 2,
  "Country": 3,
  "Pop": 4,
  "Other": 5,
  "Dance/Electronic": 6,
  "Hip-Hop/Rap": 7
}

var venue_dict = {
  "9:30 Club": 1,
  "The Anthem - DC": 2
}
var venuelist = ["ZFr9jZdeda","KovZ917A3Y7"]
venuelist.forEach(function(ven){
  var req = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=AvPyAufHams5IXhwZp10Gd2rA88AMf7e&venueId=" + ven;
  console.log(req);
request(req, function (error, response, body) {
      var obj = JSON.parse(body);

    const { Client } = require('pg');

    const client = new Client({
      connectionString: "postgres://zygjgjaweejdzc:5a069c486f07e7d474c26a4a2c2ab0062e981518ebf10d530e9c3ac93849731b@ec2-23-23-212-121.compute-1.amazonaws.com:5432/denhrngn50051u",
  ssl: true,
});

client.connect();

client.query('SELECT id FROM upcoming_show ORDER BY id DESC LIMIT 1', (err, res) => {

  if (err) throw err;
  for (let row of res.rows) {
    var currentid = row['id'];
  }


  for (var i = 0; i < 20; i ++){
      console.log(genre_dict[obj["_embedded"]["events"][i]["classifications"][0]["genre"]["name"]]);
      client.query('INSERT INTO upcoming_show VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);',
      [currentid,
      obj["_embedded"]["events"][i]['dates']['start']['dateTime'],
      obj["_embedded"]["events"][i]["name"],
      obj["_embedded"]["events"][i]["url"],
      "",
      "",
      12,
      50,
      genre_dict[obj["_embedded"]["events"][i]["classifications"][0]["genre"]["name"]],
      venue_dict[obj["_embedded"]["events"][i]["_embedded"]["venues"][0]["name"]],
      obj["_embedded"]["events"][i]['id']]);
      currentid +=1;
    };
        client.query('SELECT * FROM upcoming_show', (err, res) => {
          if (err) throw err;
          for (let row of res.rows) {
            console.log(JSON.stringify(row));
          }
          client.end();
          });
});
});
});
