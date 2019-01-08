const { getPeople } = require('./service');

(async () => {
	try {
		const { results } = await getPeople('a');
		
		const larsFamily = results
							.filter(person => person.name.toLowerCase().includes('lars'))
							.map(larsMember => larsMember.name);
							
		console.log(larsFamily);
		
	} catch (error) {
		console.log(error);
	}
})();