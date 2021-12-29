import { Product} from '../persistenseLayer/requests.js';
import {Ispetification} from './specification.js'


class Fasad{
	constructor(){
		this.classArray = [new insertHendler(),  new updateHendler(), new deleteHendler(), new addServer2(), new addServer3()];
		this.product = new Product;
	}

	async chainOfResponsibility(url, body, j){
		// console.log(j)
		for (let i = 0 ; i < this.classArray.length; i++){
			if (this.classArray[i].url == url){
				const res = await this.classArray[i].request(body, this.product, j);
				// console.log(res)
				return res;
			}
		}
	}

}


class baseHandler{
	constructor(url){
		this.url = url;
	}
	async request(){}
} 




class insertHendler extends baseHandler{
	constructor(){
		super('/addProduct');
	}	
	async request(body, product, i){
		if (body.price == '' || body.name == '') return "Дані введені не коректно"
		let num = i;
		if(i == undefined) num = 150300+Math.floor(Math.random() * 1000000000);
		let str = `'${num}','${body.name}', '${body.price}'`;
		let res = await product.insert(str, 'product');
		if (res.command == "INSERT") return "Товар додано";
	}
}
class addServer2 extends baseHandler{
	constructor(){
		super('/addServer2');
	}	
	async request(body, product, id){
		// console.log("fasad55", id, body)
		let table; 
		if(id == 0)  table = await product.deleteTable('forProductServer2');
		for(let i = 0; i < body.length; i++){
			// console.log(body[i])
			let str = `'${body[i].product_id}','${body[i].productname}', '${body[i].price}'`;
			let res = await product.insert(str, 'forProductServer2');
			// if (res.command == "INSERT") return "Товар додано";
		}
	}
}


class addServer3 extends baseHandler{
	constructor(){
		super('/addServer3');
	}	
	async request(body, product){
		// console.log("fasad73", body)
		let table= await product.deleteTable('forProductServer3');
		for(let i = 0; i < body.length; i++){
			// console.log(body[i])
			let str = `'${body[i].product_id}','${body[i].name}', '${body[i].price}'`;
			let res = await product.insert(str, 'forProductServer3');
			// if (res.command == "INSERT") return "Товар додано";
		}
	}
}




class updateHendler extends baseHandler{
	constructor(){
		super('/updateProduct');
	}
	async request(body, product){
		if((body.name =="" && body.price == "") || (body.newName =="" && body.newPrice == "")) return "Дані введені не коректно"
		let instr = new Ispetification(body)
		let update = instr.relisationNew();
		console.log("update", update)
		let where = instr.relisationWhere();
		console.log("where", where)
		const res =  await product.update(update, where);
		if (res.command == "UPDATE" && res.rowCount > 0) return "Дані про товар оновлено";
		else return "Дані введені не коректно"
	}
}


class deleteHendler extends baseHandler{
	constructor(){
		super('/deleteProduct');
	}
	async request(body, product){
		let instr = new Ispetification(body)
		let where = instr.relisationWhere();
		const res = await product.delete(where);
		console.log(res)
		if (res.command == "DELETE" && res.rowCount > 0) return "Товар видалено";
		return "Дані про товар введені не коректно";

	}
}


let f = new Fasad()


export {f};	