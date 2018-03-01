
var request = require('request');

request('https://app.ticketmaster.com/discovery/v2/events.json?apikey=AvPyAufHams5IX\
hwZp10Gd2rA88AMf7e&venueId=KovZpZA7knFA', function (error, response, body) {
    var obj = JSON.parse(body);
    // console.log([3,
    // obj["_embedded"]["events"][0]['dates']['start']['dateTime'],
    // obj["_embedded"]["events"][0]["name"],
    // "",
    // "",
    // "",
    // 12,
    // 50,
    // 1,
    // 1]);

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
      console.log(i);
      client.query('INSERT INTO upcoming_show VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);',
      [currentid,
      obj["_embedded"]["events"][i]['dates']['start']['dateTime'],
      obj["_embedded"]["events"][i]["name"],
      "",
      "",
      "",
      12,
      50,
      1,
      1]);
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
