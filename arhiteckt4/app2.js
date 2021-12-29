import express from 'express';
import path from 'path';
// const path = require('path');
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app2 = express();

const urlencodedParser = express.urlencoded({extended: false});



let info = [
{
  product_id :  15200,
  name: 'шкіряний диван',
  price:1400
},
{
  product_id : 15202,
  name: 'крісло',
  price:500
},
{
  product_id : 15203,
  name: 'шкаф деревяний',
  price:4500
},
{
  product_id : 15204,
  name: 'пуфік кухоний',
  price:1200
},
{
  product_id : 15205,
  name: 'шкаф кухоний',
  price:4200
},
{
  product_id : 15206,
  name: 'стіл деревяний',
  price:1000
}
]



function productList(info){
  let list = []
  for (let inf of info){
    list.push(inf.name)
  } 
  return list
}



app2.post('/price-list/', urlencodedParser, (req, res) => {
  res.send(productList(info))

});
app2.listen(3001, () => {
    console.log('Application listening on port 3001!');
});


function searchInfo(id){
  for (let i = 0; i < info.length; i++){
    if(info[i].product_id == id){
     return info[i]
   }
  }
  return null
}



app2.post('/search', urlencodedParser, async(req, res) => {
  console.log('here')
  const a = () =>{ res.send({'info':info})}
  setTimeout(a, 20000);
  

});


app2.post('/details/*', urlencodedParser, (req, res) => {
  let url = req.query.id
  let result =  searchInfo(url)
  res.send(result)
});



