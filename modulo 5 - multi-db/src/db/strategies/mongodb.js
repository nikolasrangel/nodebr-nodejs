const ICrud = require('./interfaces/interfaceCrud');

// Concrete class
class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log('Item has saved in MongoDB database');    
  }
}

module.exports = MongoDB;