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


app2.listen(3003, () => {
    console.log('Application listening on port 3003!');
});





app2.post('/register', urlencodedParser, async(req, res) => { 
    let num = Math.floor(Math.random() * 1000000000);
    // firstName, secondName, fatherName, login, password,
    // console.log(req.body) 
      let a = await connection.query(`INSERT INTO seller VALUES ('${num}', '${req.body.b.firstName}', '${req.body.b.secondName}', '${req.body.b.fatherName}'); insert into authentication VALUES ('${num}', '${req.body.b.login}', '${req.body.b.password}');`);
      if(a[0].command == 'INSERT' && a[1].command == 'INSERT')  
        res.send({"result":num})
        else res.send({"result":-1})
});


