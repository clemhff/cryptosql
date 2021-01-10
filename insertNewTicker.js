const q = require('./toolbox/queryList');
const { Pool, Client } = require('pg');
const {connId} = require('./env/dbId');
const axios = require('axios');

exports.insertNewTicker = async (symbol) => {


  const pool = new Pool(connId);
  /*pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })*/


  // async/await
  try {
    const lastTimestamp = await pool.query(q.lastTicker(symbol)); // last entry in database
    //console.log('result \n ' + JSON.stringify(lastTimestamp.rows[0].max));
    const {data}= await axios.get(`https://api.binance.com/api/v3/klines?symbol=ADAUSDT&interval=1m&startTime=${parseInt(lastTimestamp.rows[0].max ,10)+60000}&limit=1`); // get data from binance

    const addData = await pool.query(q.insertTicker(symbol, data[0][0], data[0][1], data[0][2], data[0][3], data[0][4], data[0][5], data[0][7], data[0][8], data[0][9],data[0][10]));
    console.log(data[0][0]);

  } catch (error) {
    console.error('error : ' + error);
  } finally {
    await pool.end()
  }

}
