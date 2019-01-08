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


// using IIFE: immediately-invoked function expression
(async _ => {
	try {
		console.time('timer');

		// get user
		const user = await getUser();
		//const phone = await getUserTelephone(user.id);
		//const address = await getUserAddressAsync(user.id);
		
		const [ phone, address ] = await Promise.all([
			getUserTelephone(user.id),
			getUserAddressAsync(user.id)
		]);

		console.log('user:', user);
		console.log('phone:', phone);
		console.log('address:', address);
		
		console.timeEnd('timer');
	} catch (error) {
		console.log('deu ruim');	
	}
})();