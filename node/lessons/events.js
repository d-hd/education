const Emitter = require('events');

const emitter = new Emitter();

// emitter.on создает пользовательское событие. 
// Название - кастомное, аргументы - любое число.
emitter.on('message', (first, second, third) => {
  console.log('Передано сообщение' + first);
  console.log('Второй аргумент' + second);
});

const MESSAGE = process.env.MESSAGE || '';

if (MESSAGE) {
  // emitter.emit вызывает событие. Второй аргумент - параметр, который передается в callback.
  // emit может быть бесконечно много для единожды созданного события через on
  emitter.emit('message', MESSAGE, 'параметр2');
} else {
  emitter.emit('message', 'Не указано сообщение');
}

// Для того, чтобы единожды вызвать событие, используется emitter.once
const callback = (first, second, third) => {
  console.log('Передано сообщение' + first);
  console.log('Второй аргумент' + second);
};

emitter.once('message2', callback);

const MESSAGE2 = process.env.MESSAGE || '';
emitter.emit('message2', MESSAGE, 'параметр2'); // вызовет событие и удалит его, дальше не будет вызвваны
emitter.emit('message2', MESSAGE, 'параметр2');
emitter.emit('message2', MESSAGE, 'параметр2');
emitter.emit('message2', MESSAGE, 'параметр2');

// Также удалить события можно через 
emitter.removeAllListeners();
emitter.removeListener('message2', callback); // удалит конкретное событие


/* Когда использовать?*/
// http
// websocket
// long polling
// clusters 
// И очень много где. Почти каждый модуль node использует eventEmitter.