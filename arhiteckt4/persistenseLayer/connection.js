import pkg from 'pg';
const { Pool } = pkg;


const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'architect1',
  password: '1',
  port: 5432,
};


class Singleton {
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
    return new Pool(config);

  }
  
}

let singl = new Singleton();



export default singl;