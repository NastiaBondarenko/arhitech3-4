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


app2.listen(3007, () => {
    console.log('Application listening on port 3007!');
});

app2.post('/viewPur', urlencodedParser, async(req, res) => { 
  let resul = [];
    let resPur = await connection.query(`select*from purchase`);
    for(let i = 0 ; i < resPur.rows.length; i++){
    console.log(resPur.rows[i])
        console.log(`select*from productinpurchse where purchase_id = '${resPur.rows[i].purchase_id}'`)
       let resProdPur = await connection.query(`select*from productinpurchse where purchase_id = '${resPur.rows[i].purchase_id}'`)
       // console.log(resProdPur)
        let prods = [];
       for(let j = 0; j < resProdPur.rows.length; j++){
        console.log(`select* from product where product_id ='${resProdPur.rows[j]}'`)
          let prod = await connection.query(`select* from product where product_id ='${resProdPur.rows[j].product_id}'`);
          prods.push(prod.rows[0].productname)
       }
       resul.push({'purchase_id':resPur.rows[i].purchase_id, 'seller_id':resPur.rows[i].seller_id, 'status':resPur.rows[i].status, 'paymentmethod': resPur.rows[i].paymentmethod,'datapur':resPur.rows[i].datapur, 'price':resPur.rows[i].price, 'products':prods})
    }

    res.send({'result':resul})
});




app2.post('/createPur', urlencodedParser, async(req, res) => { 
    let num = Math.floor(Math.random() * 1000000000);
      let c = await connection.query(`INSERT INTO purchase VALUES ( '${num}', '${req.body.seller_id}', '${req.body.b.status}', '${req.body.b.way}', now(), '${req.body.b.pris}');`);

    for(let i = 0; i < req.body.b.product.length; i++){
      console.log(`INSERT INTO productinpurchse VALUES ('${req.body.b.product[i]}', '${num}')`)
      let a = await connection.query(`INSERT INTO productinpurchse VALUES ('${req.body.b.product[i]}', '${num}');`);
    }
      console.log(`INSERT INTO purchase VALUES ( '${num}', '${req.body.seller_id}', '${req.body.b.status}', '${req.body.b.way}', '${new Date()}', '${req.body.b.pris}');`)

      if(c.command == 'INSERT')  res.send({"result":true})
        else res.send({"result":false})
});


