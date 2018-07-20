var moment = require('moment');
console.log(moment().format());


    const { Client } = require('pg');

    const client = new Client({
      connectionString: "postgres://zygjgjaweejdzc:5a069c486f07e7d474c26a4a2c2ab0062e981518ebf10d530e9c3ac93849731b@ec2-23-23-212-121.compute-1.amazonaws.com:5432/denhrngn50051u",
  ssl: true,
});

client.connect();


var oldlist = [];
function remove_old(){
  return new Promise((resolve,reject) => {
    var oldlist = [];
    client.query('SELECT * FROM upcoming_show', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    if (moment(row['date']).isBefore("2018-10-27")){
      console.log('Identified old show, adding to remove list' + row['band'])
      oldlist.push(row['id']);
    }
  }

  if (oldlist.length > 1){
  oldlist = oldlist.join(',');

  delstring = 'DELETE FROM upcoming_show WHERE id IN (' + oldlist + ')'
  resolve(delstring);
}})
})
}

remove_old().then( delstring =>{
  console.log(delstring);
  client.query(delstring, (err, res) => {
    if (err) {
    console.error('connection error', err.stack)
  }
  client.end();
  })
});


client.query('SELECT * FROM upcoming_show', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
     console.log(JSON.stringify(row));
  }

});
