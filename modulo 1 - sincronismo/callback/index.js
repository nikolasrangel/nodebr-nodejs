/**
 * 0 - Obter um usuario
 * 1 - Obter o numero de telefone de um usuario a partir de seu ID
 * 2 - Obter o endereço do usuário pelo ID
 */

function getUser(callback) {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      name: 'Daiso',
      dateBirth: new Date()
    });
  }, 1000);
};


function getUserTelephone(userId, callback) {
  setTimeout(() => {
    return callback(null, {
      'telephone': '123456789',
      'ddd': 12
    });
  }, 1000);
};


function getUserAddress(userId, callback) {
  setTimeout(() => {
    return callback(null, {
      'rua': 'Avenida Ouro Fino',
      'numero': 1209,
      'cep': '12233400'
    });
  }, 2000);
};


function getUserResolver(errUser, user) {
  if (errUser) {
    console('Error getting user data', err);
    return;
  }

  console.log('user:', user);
  

  // Using anonymous function
  getUserTelephone(user.id, (errTelephone, telephone) => {
    if (errTelephone) {
      console('Error getting user telephone', errTelephone);
      return;
    }

    console.log('telephone:', telephone);
    
    // Getting user address
    getUserAddress(user.id, (errAddress, address) => {
      if (errAddress) {
        console.log('Error getting user address', errAddress);
        return;        
      }

      console.log('address:', address);
    });

  });

}

getUser(getUserResolver);
//const telephone = getUserTelephone(user.id);
//console.log('telephone: ', telephone);

