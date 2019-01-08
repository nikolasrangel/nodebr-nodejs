const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {

  constructor() {
    this.FILENAME = 'heroes.json';
  }

  async getFileData() {
    const file = await readFileAsync(this.FILENAME, 'utf8');
    return JSON.parse(file.toString());
  }

  async writeInFile(data) {
    await writeFileAsync(this.FILENAME, JSON.stringify(data));
    return true; 
  }

  async insert(dataToInsert) {
    const allDataFromFile = await this.getFileData();

    const id = dataToInsert.id <= 2 ? dataToInsert.id : Date.now();

    const dataWithId = {...dataToInsert, id};

    const dataToWrite = [...allDataFromFile, dataWithId];

    const result = await this.writeInFile(dataToWrite);

    return result;
  }

  async getById(id) {
    const data = await this.getFileData();
    // if id is undefined, get all data
    const filtered = data.filter(item => id ? item.id === id : true);
    return filtered;
  }

  async removeById(id) {
    if (!id) {
      return this.writeInFile([]);
    }

    const data = await this.getFileData();

    const index = data.findIndex(elem => elem.id === parseInt(id));

    if (index === -1) {
      throw Error('the informed user doesnt exist in database');
    }

    // remove the element without mutation
    const filteredData = data.filter((elem, idx) => idx != index);

    return await this.writeInFile(filteredData);
  }

  async updateById(id, modifications) {
    const data = await this.getFileData();

    const index = data.findIndex(elem => parseInt(elem.id) === id);

    if (index === -1) {
      throw Error('the informed user id doesnt exist in database');
    }

    // removing the target
    const dataFiltered = data.filter(elem => parseInt(elem.id) !== id);

    // updating the target's values
    const targetUpdated = {
      ...data[index],
      ...modifications
    };

    return await this.writeInFile([
      ...dataFiltered,
      targetUpdated
    ]);
  }


}

module.exports = new Database();