const util = require('util');

// Transforma uma função que utiliza de callback para uso com promise
const getUserAddressAsync = util.promisify(getUserAddress);

/**
 * 0 - Obter um usuario
 * 1 - Obter o numero de telefone de um usuario a partir de seu ID
 * 2 - Obter o endereço do usuário pelo ID
 */

function getUser() {
	// Creating the promise
	/**
	 * In case of success: call resolve callback
	 * In case of errors: call reject callback
	 */
	return new Promise((resolve, reject) => {

		setTimeout(() => {
			return resolve({
				id: 1,
				name: 'Daiso',
				dateBirth: new Date()
			});
		}, 1000);

	});	
};

function getUserTelephone(userId) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			return resolve({
				'telephone': '123456789',
				'ddd': 12
			});
		}, 1000);
	});
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

const userPromise = getUser();
/**
 * Promise
 * 1. manipulação de sucesso: utilização do método .then() na promise
 * 2. manipulação de erros: utiliza-se metodo .catch
 */
userPromise
	.then(user => {
		return getUserTelephone(user.id)
			.then(telephone => {
				return {
					name: {
						name: user.name,
						id: user.id
					},
					telephone
				};
			})
			.catch(err => console.log('Error getting user telephone', err));
	})
	.then(userAndTel => {
        return getUserAddressAsync(userAndTel.name.id)
            .then(address => {
                return {...userAndTel, address}
            })
            .then(result => console.log('result:', result))
            .catch(err => console.log('Error getting user address:', err));
    })
	.catch(err => console.log('Error getting user:', err));