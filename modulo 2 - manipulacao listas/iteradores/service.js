const axios = require('axios');

// star wars api
const URL = 'https://swapi.co/api/people';

const getPeople = async function getPersonDataByName(name) {
    const uri = `${URL}/?search=${name}&format=json`;
    const response = await axios.get(uri);

    return response.data;
};

module.exports = {
    getPeople
};

// testing
// (async _ => {
//     try {
//         const person = await getPeople('r2');
//         console.log(person);    
//     } catch (err) {
//         console.log('error getting people data');        
//     }    
// })();