exports.tables = `
  SELECT table_name
  FROM information_schema.tables
  WHERE table_type='BASE TABLE'
  AND table_schema NOT IN ('information_schema', 'pg_catalog');
`

exports.tableName =  (table) => `
select table_schema,
       table_name
from information_schema.tables
where table_name like '%${table}%'
    and table_schema not in ('information_schema', 'pg_catalog')
    and table_type = 'BASE TABLE'
order by table_name,
       table_schema;
`


exports.tableColumn =  (table) => `
select column_name,
       data_type
from information_schema.columns
where table_name =  '${table}'
`

exports.tableColumnType =  (table, column) => `
select column_name,
       data_type
from information_schema.columns
where table_name =  '${table}' and column_name='${column}'
`


exports.createTableADA = () =>`
  CREATE TABLE adausdt (
    id SERIAL  PRIMARY KEY,
    timestamp INTEGER,
    open NUMERIC(12, 8),
    high NUMERIC(12, 8),
    low NUMERIC(12, 8),
    close NUMERIC(12, 8),
    volume NUMERIC(20, 8),
    quoteasset NUMERIC(20, 8),
    trade INTEGER,
    takerbuybase NUMERIC(20, 8),
    takerbuyquote NUMERIC(20, 8),
    UNIQUE(timestamp)
  );
`

exports.insertTicker =  (table, timestamp, open, high, low, close, volume, quoteasset, trade, takerbuybase,takerbuyquote) => `
INSERT INTO ${table}(timestamp, open, high, low, close, volume, quoteasset, trade, takerbuybase,takerbuyquote)
VALUES ('${timestamp}','${open}',${high},${low},${close},${volume},${quoteasset},${trade},${takerbuybase},${takerbuyquote});
`

exports.lastTicker =  (table) => `
SELECT MAX(timestamp)
FROM ${table} ;
`
