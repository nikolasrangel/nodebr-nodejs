const { getPeople } = require('./service');

(async () => {
	try {
		const { results } = await getPeople('a');
    
    const heights = results.map(person => parseInt(person.height));

    const heightsTotal = heights.reduce((previous, current) => {
      return previous + current
    }, 0);
							
		console.log(heightsTotal);
	} catch (error) {
		console.log(error);
	}
})();