const cron = require('node-cron');
const {insertNewTicker} = require('./insertNewTicker');


cron.schedule("* * * * *", async function() {

  console.log("running a task every minute");
  insertNewTicker('adausdt');

});


/*const ticker = {
  timestamp : 1524002400000,
  open : 0.25203000,
  high : 0.25203000,
  low : 0.25150000,
  close : 0.25150000,
  volume : 27549.50000000,
  quote_asset: 6934.46322360,
  trade : 21,
  tbb : 297.68000000,
  tbq : 74.99452240
};*/
//dbClientTest();

//dbQuery(q.tables);
