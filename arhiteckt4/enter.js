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


app2.listen(3004, () => {
    console.log('Application listening on port 3004!');
});





app2.post('/enter', urlencodedParser, async(req, res) => { 
    // let num = Math.floor(Math.random() * 1000000000);
    // firstName, secondName, fatherName, login, password,
    console.log(req.body) 
    console.log(`select * from authentication where login = ${req.body.b.login} and paswd = ${req.body.b.password}`)
      let a = await connection.query(`select * from authentication where login = '${req.body.b.login}' and paswd = '${req.body.b.password}'`);
      if(a.rows.length == 1){
       res.send({"result":a.rows[0].seller_id})
      }
        else res.send({"result":-1})
});

