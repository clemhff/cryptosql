const {insertNewTicker} = require('./insertNewTicker');

//insertNewTicker('adadt');

let timerId = setInterval(() => {
  console.log("running a task every 0.9s");
  insertNewTicker('adausdt', 62000);
  insertNewTicker('ethusdt', 64000);
}, 900);
