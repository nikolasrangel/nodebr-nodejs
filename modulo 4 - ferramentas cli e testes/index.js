const Commander = require('commander');

const Database = require('./database');
const Heroe = require('./Heroe');


const main = async () => {
  Commander
    .version('v1')
    .option('-n, --name [value]', 'Heroe name')
    .option('-a, --ability [value]', 'Heroe ability')
    .option('-s, --save', 'Save heroe')
    .option('-g, --get', 'Get heroes')
    .option('-i, --id [value]', 'Heroe id')
    .option('-r, --remove', 'Remove a heroe by id')
    .option('-u, --update [value]', 'Update a heroe by id')
    .parse(process.argv);

  try {
    if (Commander.save) {
      const heroe = new Heroe(Commander);
      //console.log(heroe);
      
      delete heroe.id;

      const result = await Database.insert(heroe);

      if (!result) {
        throw Error('Error saving heroe in database');
      }

      console.log(`Heroe ${heroe.name} has saved in DB`);
    }

    if (Commander.get) {
      const result = await Database.getById();
      console.log('Heroes:', result);      
    }

    if (Commander.remove) {
      const heroe = new Heroe(Commander);

      const result = await Database.removeById(heroe.id);

      if (!result) {
        throw Error('Error removing heroe from database');
      }

      console.log(`Heroe has removed from database.`);
    }

    if (Commander.update) {
      const id = parseInt(Commander.id);
    
      const heroe = new Heroe(Commander);

      // Removing null values
      const newHeroe = Object.keys(heroe).reduce((acc, curr) => {
        if (heroe[curr] !== null)
          acc[curr] = heroe[curr];
        return acc;
      }, {});

      const result = await Database.updateById(id, newHeroe);
      
      if (!result) {
        throw Error('Error updating heroe in database');
      }

      console.log(`Heroe has updated.`);
    }

  } catch (error) {
    console.log('Error!', error);
  }
};

main();