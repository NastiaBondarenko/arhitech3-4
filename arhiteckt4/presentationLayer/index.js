'use strict'


const  getzapros = async () => {
    let name = document.getElementById('addName').value
    let price = document.getElementById('addNum').value

    const response = await fetch('http://127.0.0.1:3000/addProduct', {
      method: 'POST',
      body: JSON.stringify({
       name, price,  
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    let res = await response.json();
    alert(res.result)
}


const  deleteProduct = async () => {
    let name = document.getElementById('deletName').value
    let price = document.getElementById('deletNum').value

    const response = await fetch('http://127.0.0.1:3000/deleteProduct', {
      method: 'POST',
      body: JSON.stringify({
       name, price,  
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    let res = await response.json();
    alert(res.result)
}

const  updatePr = async () => {
    let name = document.getElementById('updateOldName').value
    let price = document.getElementById('updateOldNum').value
    let newName = document.getElementById('updateName').value
    let newPrice = document.getElementById('updateNum').value



    const response = await fetch('http://127.0.0.1:3000/updateProduct', {
      method: 'POST',
      body: JSON.stringify({
       name, price,  newName, newPrice
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    let res = await response.json();
    alert(res.result)
}

let seller_id

const register = async ()=>{
    let firstName = document.getElementById('registerName').value
    let secondName = document.getElementById('registerSeconName').value
    let fatherName = document.getElementById('registerFatherName').value
    let login = document.getElementById('registerLogin').value
    let password = document.getElementById('registerPassword').value
    console.log("here 64")

    if(firstName!='' && secondName!='' && login!='' && password!=''){
      console.log("here 67")
        const response = await fetch('http://127.0.0.1:3000/register', {
        method: 'POST',
        body: JSON.stringify({
         firstName, secondName, fatherName, login, password, 
        }),
        headers: { 'Content-Type': 'application/json' },
      });

         let res = await response.json();
         if(res.result > 0 ){
          console.log(res.result, "79")
          window.location = 'http://127.0.0.1:3000/mainMenu.html'
         }
         else {
          alert("Щось пішло не так")
         }
    }
}


const enter = async()=>{
    let login = document.getElementById('enterLogin').value
    let password = document.getElementById('enterPassword').value
    console.log("here 64")

    if(login!='' && password!=''){
      console.log("here 93")
          const response = await fetch('http://127.0.0.1:3000/enter', {
          method: 'POST',
          body: JSON.stringify({
           login, password, 
          }),
          headers: { 'Content-Type': 'application/json' },
        });

         let res = await response.json();
         console.log(res.result)
         if(res.result>0){
          window.location = 'http://127.0.0.1:3000/mainMenu.html'
         } else{
          alert("Щось пішло не так")
         }
    }


}

const viewPr = async () => {
  let name = document.getElementById('searchName').value
    let priceFrom = document.getElementById('searchFrom').value
    let priceTo = document.getElementById('searchTo').value


    const response = await fetch('http://127.0.0.1:3000/viewProduct', {
      method: 'POST',
      body: JSON.stringify({
       name, priceTo, priceFrom
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    let res = await response.json();
     // let res = await response.json()
     document.getElementById('Table').innerHTML=`<tr>
                    <th>Назва</th>
                    <th>Ціна</th>
                </tr>`;
                console.log(res)
    for (let i = 0; i < res.result.length; i++){
        var row = document.createElement("tr");
        row.innerHTML=`<th>${res.result[i].productname}</th><th>${res.result[i].price}</th>`
        document.getElementById('Table').appendChild(row)
    }
}

const   productForPurpoche= async () => {
  console.log("here 143")
    let name = document.getElementById('searchNameForPur').value
    let priceFrom = document.getElementById('searchFromForPur').value
    let priceTo = document.getElementById('searchToForPur').value


    const response = await fetch('http://127.0.0.1:3000/viewProduct', {
      method: 'POST',
      body: JSON.stringify({
       name, priceTo, priceFrom
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    let res = await response.json();
     // let res = await response.json()
     document.getElementById('TableForPur').innerHTML=`<tr>
                    <th>Назва</th>
                    <th>Ціна</th>
                    <th></th>
                </tr>`;
                console.log(res)
    for (let i = 0; i < res.result.length; i++){
        var row = document.createElement("tr");
        row.innerHTML=`<th>${res.result[i].productname}</th><th>${res.result[i].price}</th><th><button onclick="addToPur(${res.result[i].product_id}, '${res.result[i].productname}', ${res.result[i].price})">Додати до замовлення</button></th>`
        document.getElementById('TableForPur').appendChild(row)
    }

}

let productIdForPurpose = [];

const addToPur = async (id, name, prise) =>{
    productIdForPurpose.push(id);
  document.getElementById('productPurpoche').innerHTML += `<p>${name}</p>`
  let pr = document.getElementById('prisePurpoche').innerHTML.slice(6)
  let pris = parseInt(pr.slice(0, pr.length-4))
  console.log(pris)

  document.getElementById('prisePurpoche').innerHTML = `Ціна: ${pris+prise} грн`

  // prisePurpoche

}


const createPur = async () =>{
  let status = document.getElementById('statusPurpose').value;
  let way = document.getElementById('wayPurpose').value;
  let product = productIdForPurpose
  let pr = document.getElementById('prisePurpoche').innerHTML.slice(6)
  let pris = parseInt(pr.slice(0, pr.length-4))
  console.log(way, status, product, pris)
  if(product.length>0){
    const response = await fetch('http://127.0.0.1:3000/createPur', {
      method: 'POST',
      body: JSON.stringify({
       way, status, product, pris
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    let res = await response.json();
    if(res.result) alert("Покупку створено")
  }
}

const viewPurpose = async () =>{
   const response = await fetch('http://127.0.0.1:3000/viewPur', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    let res = await response.json();
   console.log(res.result)
   document.getElementById('TableForViewProduct').innerHTML =`<tr>
                    <th>Номер покупки</th>
                    <th>Статус</th>
                    <th>Метод оплати</th>
                    <th>Ціна</th>
                    <th>Дата</th>
                    <th>Товари</th>
                </tr>`;

    for (let i = 0; i < res.result.length; i++){
        var row = document.createElement("tr");
        row.innerHTML=`<th>${res.result[i].purchase_id}</th>
        <th>${res.result[i].status}</th><th>${res.result[i].paymentmethod}</th>
        <th>${res.result[i].price}</th><th>${res.result[i].datapur}</th>`
        var th = document.createElement("th");
        for(let j = 0 ; j < res.result[i].products.length; j++){
          th.innerHTML += `<p>${res.result[i].products[j]}</p>`
        }
        row.appendChild(th)
        document.getElementById('TableForViewProduct').appendChild(row)
    }      
    
  
}

const getProducts = id => {
  console.log(id); // выводит id
  dispatch({
      type: GET_PRODUCTS_REQUEST,
      payload: {
      wait: true
    }
  });
  return dispatch => {
    fetch(`/backend/${id}.json`)
      .then(
        response => dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: {
            wait: false,
            products: response.json()
          }
        })
      )
  };
};