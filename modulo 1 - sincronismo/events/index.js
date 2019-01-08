const EventEmitter = require('events');

class MeuEmissor extends EventEmitter {

}

// instancia
const meuEmissor = new MeuEmissor();

// simulacao de evento
const nomeEvento = 'usuario:click';
// observador: observa o disparo deste evento
meuEmissor.on(nomeEvento, click => {
  console.log('um usuario clicou:', click);  
});
// dispara eventos
// meuEmissor.emit(nomeEvento, 'no footer');
// meuEmissor.emit(nomeEvento, 'na barra de rolagem');

// interação com usuario no console
const stdin = process.openStdin();
stdin.addListener('data', value => {
  console.log(`tu digitases: ${value.toString().trim()}`);  
})