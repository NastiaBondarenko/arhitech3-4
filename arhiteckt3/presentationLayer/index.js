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




const  viewPr = async () => {
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
    for (let i = 0; i < res.result.length; i++){
        var row = document.createElement("tr");
        row.innerHTML=`<th>${res.result[i].productname}</th><th>${res.result[i].price}</th>`
        document.getElementById('Table').appendChild(row)
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