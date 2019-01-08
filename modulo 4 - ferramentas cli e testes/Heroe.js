class Heroe {
  constructor({ name = null, ability = null, id = null }) {
    this.name = name;
    this.ability = ability;
    this.id = id;
  }
}

module.exports = Heroe;