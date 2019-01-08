const service = require('./service');

(async () => {
	try {
		const result = await service.getPeople('a');
		let names = [];

		console.time('for');
		for (let index = 0; index < result.results.length; index++) {
			const person = result.results[index];
			names.push(person.name);
		}
		console.timeEnd('for');

		names = [];

		console.time('for in');
		for (const index in result.results) {
			const person = result.results[index];
			names.push(person.name);
		}
		console.timeEnd('for in');

		names = [];

		console.time('for of');
		for (const person of result.results) {
			names.push(person.name);			
		}
		console.timeEnd('for of');


		console.log('names:', names);

	} catch (error) {
		console.log('error getting data:', error);		
	}
})();