const ICrud = require('./interfaces/interfaceCrud');

// Concrete class
class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log('Item has saved in Postgres database');    
  } 
}

module.exports = Postgres;