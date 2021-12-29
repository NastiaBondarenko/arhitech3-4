import express from 'express';
import path from 'path';
// const path = require('path');
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import pkg from 'pg';
const { Pool } = pkg;

import * as query from 'querystring'
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'architect1',
  password: '1',
  port: 5432,
};

let connection = new Pool(config);



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app2 = express();
app2.use(express.json()); 

const urlencodedParser = express.urlencoded({extended: false});


app2.listen(3005, () => {
    console.log('Application listening on port 3005!');
});





app2.post('/filter', urlencodedParser, async(req, res) => { 
    let body = req.body.b
    let where = `where productname like '%${body.name}%' `;
    if (body.priceTo != '') where +=` and price < '${body.priceTo}'`;
    if (body.priceFrom != '') where += ` and price > '${body.priceFrom}'`;
    
    const res1 = await connection.query(`select * from product ${where};`);
    const res2 = await connection.query(`select * from forproductserver2 ${where};`);
    const res3 = await connection.query(`select * from forproductserver3 ${where};`);

    // const res1 = await product.select('*', where, 'product');
    // const res2 = await product.select('*', where, 'forproductserver2');
    // const res3 = await product.select('*', where, 'forproductserver3');
    const result = res1.rows.concat(res2.rows).concat(res3.rows)

    // console.log(result)
    res.send({'result':result}) ;
 
});

