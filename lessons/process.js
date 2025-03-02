// ижентификатор процесса
console.log(process.pid);
// переменные окружения
console.log(process.env.PORT);
console.log(process.env.NODE_ENV);

// аргументы командной строки
console.log(process.argv);

if (Math.random() > 0.5) {
  while (true) {}
} else {
  console.log("Скрипт завершается");
  // Экстренное завершение процесса
  process.exit();
}