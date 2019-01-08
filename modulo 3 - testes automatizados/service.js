const { get } = require('axios');

const URL = 'https://swapi.co/api/people';

const getPeople = async function getPeopleByOneName(name) {
  const urlWithQueryString = `${URL}/?search=${name}&format=json`;

  try {
    const result = await get(urlWithQueryString);
    return result.data.results.map(parsePerson);
  } catch (error) {
    throw new Error(error);
  }

};

const parsePerson = ({ name, height }) => {
  return { name, height };
}

module.exports = {
  getPeople
};