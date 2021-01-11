const q = require('./toolbox/queryList');
const axios = require('axios');
const {connId} = require('./env/dbId');
const { Pool, Client } = require('pg');
const {dbPoolTest} = require('./toolbox/dbtest');

exports.insertNewTicker = async (symbol) => {


  const pool = new Pool(connId);
  /*pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })*/


  // async/await
  try {
    ////check database connection
    dbPoolTest();

    ////check data model
    const tableExist = await pool.query(q.tableName(symbol));
    if (tableExist.rows.length === 0) {

      console.log('Table doesn\'t exist');
      const createTable = await pool.query(q.createTable(symbol)); // create table
      const createIndex= await pool.query(q.createIndex(symbol)); // create index
      const f = await q.firstTicker(symbol); // 1st ticker objet
      console.log(JSON.stringify(f));
      const createFirstTicker = await pool.query(q.insertTicker(symbol, f.timestamp, f.open, f.high, f.low, f.close, f.volume, f.quote_asset, f.trade, f.tbb, f.tbq)); // insert 1st ticker

    }
    else {
      //// add new data workflow
      const lastTimestamp = await pool.query(q.lastTicker(symbol)); // last entry in database
      const {data}= await axios.get(`https://api.binance.com/api/v3/klines?symbol=ADAUSDT&interval=1m&startTime=${parseInt(lastTimestamp.rows[0].max ,10)+60000}&limit=1`); // get data from binance

      const addData = await pool.query(q.insertTicker(symbol, data[0][0], data[0][1], data[0][2], data[0][3], data[0][4], data[0][5], data[0][7], data[0][8], data[0][9],data[0][10])); //insert data in the database
      console.log(data[0][0]);
    }

  } catch (error) {
    console.error('error : ' + error);
  } finally {
    await pool.end()
  }

}
