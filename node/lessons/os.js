const os = require('os');

// Возвращает текущую ОС - агалогично process.platform
console.log(os.platform());

// Возвращает архитектуру процессора
console.log(os.arch());

// Возвращает массив с информацией о ядрах
console.log(os.cpus());


/*ЗАПУСК РАЗНОГО КОЛИЧЕСТВА ПРОЦЕССОВ НА РАЗНЫХ ЯДРАХ*/
const os = require('os');
const cluster = require('cluster'); // для мультипроцессорных систем
const numCPUs = require('os').availableParallelism();

const cpus = os.cpus();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} запущен`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();

    // Если какой-то процесс по какой-то причине умер
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} умер`);
      // Сразу запускается новый процесс
      cluster.fork();

      // Еще можно использовать code и signal
      // if (code ===) {
      //   cluster.fork();
      // } else {
      //   console.log('Ошибка при запуске процесса. процесс умер');
      // }
    });

    // убить процесс
    // worker.kill(); 
  }
} else {
  console.log(`Worker ${process.pid} запущен`);

  setInterval(() => {
    console.log(`Worker ${process.pid} еще запущен`);
  }, 5000);

  // Завершение работы текущего worker
  process.exit(0);
}




// Возвращает информацию о свободной памяти
console.log(os.freemem());
// Возвращает информацию о всех памяти
console.log(os.totalmem());
// Возвращает информацию о сетевых интерфейсах
console.log(os.networkInterfaces());
// Возвращает имя пользователя
console.log(os.userInfo());
// Возвращает путь к домашней папке
console.log(os.homedir());
// и др.