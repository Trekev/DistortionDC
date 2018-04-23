
var request = require('request');


var venue_dict = {
  "9:30 Club": 1,
  "The Anthem": 2
}
var venuelist = ["3552789","922"]
venuelist.forEach(function(ven){
  var req = "http://api.songkick.com/api/3.0/venues/"+ven+"/calendar.json?apikey=Y1UngdKHDM4ZudvV";
  console.log(req);
  request(req, function (error, response, body) {
      var obj = JSON.parse(body);

      console.log(
      obj["resultsPage"]["results"]["event"][0]['start']['datetime'],
      obj["resultsPage"]["results"]["event"][0]['performance'][0]['artist']['displayName'],
      obj["resultsPage"]["results"]["event"][0]['uri'],
      "",
      "",
      12,
      50,
      "",
      obj["resultsPage"]["results"]["event"][0]['venue']['displayName'],
      // obj["_embedded"]["events"][i]['id']

      )
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
      if (obj["resultsPage"]["results"]["event"][i]['start']['datetime'] == null){
        var starttime = obj["resultsPage"]["results"]["event"][i]['start']['date']
      }
      else{
        var starttime = obj["resultsPage"]["results"]["event"][i]['start']['datetime'];
      }
      console.log(starttime);
      client.query('INSERT INTO upcoming_show VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);',
      [currentid,
      starttime,
      obj["resultsPage"]["results"]["event"][i]['performance'][0]['artist']['displayName'],
      obj["resultsPage"]["results"]["event"][i]['uri'],
      "",
      "",
      12,
      50,
      "1",
      venue_dict[obj["resultsPage"]["results"]["event"][i]['venue']['displayName']],
      obj["resultsPage"]["results"]["event"][i]['id']]).catch(e => console.log(obj["resultsPage"]["results"]["event"][i]['performance'][0]['artist']['displayName']+
      "Already in database, skipping..."));
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
