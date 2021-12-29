
class Ispetification{

	constructor(body){
		this.bodyNew = {
			name: body.newName,
			price: body.newPrice
		}

		this.body ={
			name: body.name,
			price: body.price
		}
	}

	relisation(body, interval){
		let and = new nameAndPrice(body, interval);
		let andResult = and.audit();
		if(andResult != false) return andResult;

		let name = new onlyName(body);
		let nameResult = name.audit();
		if (nameResult != false) return nameResult;

		let price = new onlyPrice(body);
		let priceResult = price.audit();
		if 	(priceResult != false) return price.audit();

		return false	;
	}


	relisationNew(){
		return this.relisation(this.bodyNew, ',');
	}



	relisationWhere(){
		return this.relisation(this.body, 'and');
	}

}

class compositeSpecification{
	constructor(body){
		this.price = body.price;
		this.name = body.name;
	}

	audit(){

	}
}


class nameAndPrice extends compositeSpecification{
	constructor(body, interval){
		super(body);
		this.interval = interval;
	}

	audit(){
		if (this.name != '' && this.price != '') return  `productname = '${this.name}' ${this.interval} price = '${this.price}'`;
		else return false
	}
}

class onlyName extends compositeSpecification{
	constructor(body){
		super(body)
	}

	audit(){
		if (this.price != '') return  `price = '${this.price}'`;
		else return false
	}
}

class onlyPrice extends compositeSpecification{
	constructor(body){
		super(body)
	}

	audit(){
		if (this.name != '' ) return   `productname = '${this.name}'`;
		else return false
	}
}



export {Ispetification}