import express from 'express';
import path from 'path';
// const path = require('path');
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app2 = express();
app2.use(express.json()); 


const urlencodedParser = express.urlencoded({extended: false});

import pkg from 'pg';
const { Pool } = pkg;


const config1 = {
  user: 'postgres',
  host: 'localhost',
  database: 'architechserv2',
  password: '1',
  port: 5432,
};


class Singleton1 {
  constructor(){
  this.connection;    
  }

  returnconnection(){  
        if (!this.connection) {
         this.connection = this.createConnection();
       }
        return this.connection;
      
  }

  createConnection(){ 
    return new Pool(config1);

  }
  
}

let singl1 = new Singleton1();




app2.listen(3002, () => {
    console.log('Application listening on port 3002!');
});

let connection = singl1.returnconnection();


async function searchInfo  (id){
  let result = []
  console.log("app3 61", id)
  console.log(parseInt(id)+1, 100001+((parseInt(id)+1)*5000), 100000+(id*5000))
  const  res = await connection.query(`select * from product where product_id < ${100001+((parseInt(id)+1)*5000)} and product_id > ${100000+(id*5000)};`);
  console.log("62 app3",res.rows.length)
    return res.rows;
}


app2.post('/search', urlencodedParser, async (req, res) => {
  console.log("app3 69", req.body)
  let result = await searchInfo(req.body.id)
  // console.log(result)
  res.send({'result':result})
});

