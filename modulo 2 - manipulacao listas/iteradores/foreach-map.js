const service = require('./service');




(async () => {
    // creating a custom map method in array's prototype
    Array.prototype.customMap = function(callback) {
        const arr = [];
        for (let index = 0; index < this.length; index++) {
            const result = callback(this[index], index);
            arr.push(result);
        }
        return arr;
    }

    try {
        const response = await service.getPeople('n');
        let names = [];

        console.time('foreach');
        response.results.forEach(person => {
        names.push(person.name);
        });
        console.timeEnd('foreach');

        names = [];

        console.time('map');
        names = response.results.map(person => person.name);
        console.timeEnd('map');

        names = [];

        console.time('custom-map');
        names = response.results.customMap((person, index) => person.name);
        console.timeEnd('custom-map');

        console.log(names);
    } catch (error) {
        console.log(error);
    }
    
})();