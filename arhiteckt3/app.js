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
  // console.log("app 26")
  // console.log(request.body)
  console.log("here")
  // response.send("kl")
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


// app.post('/selectToTopic', urlencodedParser, async (req, res) => {
//     let r = await f.workBD('select', req.body) 
//     res.send(r);
// });


let server2  = '';
// console.log(parseInt((new Date()-server2) / (1000 * 60 * 60)/24))
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
  // let result = await f.chainOfResponsibility(request.originalUrl, request.body)
  console.log(server2, parseInt((new Date()-server2) / (1000 * 60 * 60)/24), )
  if(server2 == '' || parseInt((new Date()-server2) / (1000 * 60 * 60)/24)>1){
    console.log("69")
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
        // console.log(res2)
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
        // console.log(res3)
        f.chainOfResponsibility('/addServer3', res3.info)
  }
  // console.log(req, req.body)
  // console.log('app 103')
  let result = await f.chainOfResponsibility('/viewProduct', req.body)
  res.send(
     {"result":result}
      )

});
// )


// app.get('/updateProduct',urlencodedParser,  function (
//   request,
//   response
// ) {
//   response.sendFile(__dirname + '/presentationLayer')
// })
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

app.get('/price-list/', urlencodedParser, function (req, res) {
  var data = querystring.stringify({
    username: 'myname',
    password: 'pass'
  });

  var options = {
    host: 'localhost',
    port: 3001,
    path: '/price-list/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    let body;
    response.on('data', function (chunk) {
      body = chunk;
    });
    response.on('end', function() {

      res.send(body);
    })
  });
  httpreq.write(data);
  httpreq.end();
});




app.get("/search", urlencodedParser, function (req, res) {
  let url = req.query.query
  var data = querystring.stringify({
    username: 'myname',
    password: 'pass'
  });

  var options = {
    host: 'localhost',
    port: 3002,
    path: req.originalUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    let body;
    response.on('data', function (chunk) {
      body = chunk;
    });
    response.on('end', function() {

      res.send(body);
    })
  });
  httpreq.write(data);
  httpreq.end();
});


app.get('/details/*', urlencodedParser, function (req, res) {
 
  var data = querystring.stringify({
    username: 'myname',
    password: 'pass'
  });

  var options = {
    host: 'localhost',
    port: 3001,
    path: req.originalUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    let body;
    response.on('data', function (chunk) {
      body = chunk;
    });
    response.on('end', function() {
      res.send(body);
    })
  });
  httpreq.write(data);
  httpreq.end();
});







app.listen(3000, () => {
    console.log('Application listening on port 3000!');
});





import {f} from './businesLayer/fasad.js';