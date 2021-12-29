import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as querystring from 'querystring'
import * as http from 'http'
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json()); 
const urlencodedParser = express.urlencoded({extended: false});

app.use(express.static(path.join(__dirname, 'presentationLayer')));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/presentationLayer`);
});


app.get('/addProduct', urlencodedParser, function (
  request,
  response
) {
  response.sendFile(`${__dirname}/presentationLayer`)
})
app.post('/addProduct', urlencodedParser,  async  (
  request,
  response
) =>{
      let result = await f.chainOfResponsibility(request.originalUrl, request.body)
      response.send(
              {"result":result}
      )
  
})

let server2  = '';
let server3  = '';

app.get('/viewProduct',urlencodedParser,  function (
  request,
  response
) {
  response.sendFile(__dirname + '/presentationLayer')
})
app.post('/viewProduct',urlencodedParser,async function (
  req,
  res
) {
  if (!req.body) return response.sendStatus(400)
  if(server2 == '' || parseInt((new Date()-server2) / (1000 * 60 * 60)/24)>1){
      server2 = new Date();
      for(let i = 0 ; i < 10; i++){
      let id = i;
        const response = await fetch('http://127.0.0.1:3002/search', {
          method: 'POST',
          body: JSON.stringify({
           id, 
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        let res2 = await response.json();
          
        f.chainOfResponsibility('/addServer2', res2.result, id)
      }
  }
  console.log(server3, parseInt((new Date()-server3) / (1000 * 60 * 60)/24))

  if(server3 == '' || parseInt((new Date()-server3) / (1000 * 60 * 60)/24)>1){
    console.log("89")
      server3 = new Date();
      let id = 0;
        const response2 = await fetch('http://127.0.0.1:3001/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
        ;


        let res3 = await response2.json();
        f.chainOfResponsibility('/addServer3', res3.info)
  }
let b = req.body
   const response3 = await fetch('http://127.0.0.1:3005/filter', {
          method: 'POST',
          body: JSON.stringify({
            b
          }),
          headers: { 'Content-Type': 'application/json' },
        })

    let res4 = await response3.json();
  // let result = await f.chainOfResponsibility('/viewProduct', req.body)
  res.send(
     {'result':res4.result}
      )

});

let seller_id = 141696444;

app.post('/updateProduct',urlencodedParser, async function (
  request,
  response
) {
  if (!request.body) return response.sendStatus(400)
  let result = await f.chainOfResponsibility(request.originalUrl, request.body)
  
  response.send(
     {"result":result}
      )
  
})


app.get('/deleteProduct',urlencodedParser,  function (
  request,
  response
) {
  response.sendFile(__dirname + '/presentationLayer')
})
app.post('/deleteProduct',urlencodedParser, async function (

  request,
  response
) {
  if (!request.body) return response.sendStatus(400)
   let result = await f.chainOfResponsibility(request.originalUrl, request.body)
  
  response.send(
      {"result":result}
      )
  
})


app.post('/register',urlencodedParser, async function (

  req,
  res
) {
  let b = req.body
   const response = await fetch('http://127.0.0.1:3003/register', {
          method: 'POST',
          body: JSON.stringify({
            b
          }),
          headers: { 'Content-Type': 'application/json' },
        })

    let res1 = await response.json();
    seller_id = res1.result;
    console.log(res1)
    res.send(res1)
  
})



app.post('/enter',urlencodedParser, async function (

  req,
  res
) {
  let b = req.body
  console.log(req.body)
   const response = await fetch('http://127.0.0.1:3004/enter', {
          method: 'POST',
          body: JSON.stringify({
            b
          }),
          headers: { 'Content-Type': 'application/json' },
        })

    let res1 = await response.json();
    seller_id = res1.result;
    console.log(res1)
    res.send(res1)
  
})



app.post('/createPur',urlencodedParser, async function (

  req,
  res
) {
  let b = req.body
  // console.log("156 app")
   const response = await fetch('http://127.0.0.1:3007/createPur', {
          method: 'POST',
          body: JSON.stringify({
            b, seller_id
          }),
          headers: { 'Content-Type': 'application/json' },
        })

    let res1 = await response.json();
    console.log(res1)
    res.send(res1)
  
})

app.post('/viewPur',urlencodedParser, async function (

  req,
  res
) {
  let b = req.body
  // console.log("156 app")
   const response = await fetch('http://127.0.0.1:3007/viewPur', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })

    let res1 = await response.json();
    console.log(res1)
    res.send(res1)
  
})




app.listen(3000, () => {
    console.log('Application listening on port 3000!');
});





import {f} from './businesLayer/fasad.js';