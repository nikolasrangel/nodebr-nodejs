const { deepEqual, ok } = require('assert');

const database = require('./database');

const DEFAULT_ITEM = {
  name: 'Flash',
  ability: 'Speed',
  id: 1
};

const DEFAULT_ITEM_UPDATE = {
  name: 'Aquaman',
  ability: 'Water',
  id: 2
};

// describe a "suite" with the given `title` and callback `fn` containing nested suites.
describe('Suite de manipulacao de herois', () => {
  // execute before running tests
  before(async () => {
    await database.insert(DEFAULT_ITEM);
    await database.insert(DEFAULT_ITEM_UPDATE);
  });

  // describe a specification or test-case with the given callback `fn` acting as a thunk.
  it('deve cadastrar um herói utilizando arquivos', async () => {
    const expected = DEFAULT_ITEM;

    const result = await database.insert(DEFAULT_ITEM);

    const [ actual ] = await database.getById(expected.id)

    deepEqual(actual, expected);
  });

  it('deve pesquisar um heroi utilizando arquivos', async () => {
    const expected = DEFAULT_ITEM;

    const [ result ] = await database.getById(expected.id);

    deepEqual(result, expected);
  });

  it('deve remover um heroi por id', async () => {
    const expected = true;

    const result = await database.removeById(DEFAULT_ITEM.id);

    deepEqual(result, expected);
  });

  it('deve atualizar um heroi pelo id', async () => {
    const expected = {
      ...DEFAULT_ITEM_UPDATE,
      name: 'Batman',
      ability: 'Money'
    };

    const newData = {
      name: 'Batman',
      ability: 'Money'
    };

    await database.updateById(DEFAULT_ITEM_UPDATE.id, newData);

    const [ result ] = await database.getById(DEFAULT_ITEM_UPDATE.id);

    deepEqual(result, expected);
  });

});