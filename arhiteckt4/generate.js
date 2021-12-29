import {f} from './businesLayer/fasad.js';



for(let j = 100000; j< 150001; j++){


    function makeWord() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let num = 1+Math.floor(Math.random() * 20);
      for (var i = 0; i < num; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    function makeNum() {
        return 1+Math.floor(Math.random() * 1000000);
    }

    let body ={
        name: makeWord(),
        price: makeNum()
    }
console.log("26",j, body)

 let result = await f.chainOfResponsibility('/addProduct', body, j)

}
