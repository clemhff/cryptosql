const {insertNewTicker} = require('./insertNewTicker');

//insertNewTicker('adadt');

let timerId = setInterval(() => {
  console.log("running a task every 5s");
  insertNewTicker('adausdt', 120000);
  insertNewTicker('ethusdt', 240000);
}, 5000);
