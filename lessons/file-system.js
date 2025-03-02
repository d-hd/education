const fs = require('fs');
const path = require('path');

/* СОЗДАНИЕ ПАПОК */
// mkdirSync - создает папку синхронно (повторно - ошибка)
fs.mkdirSync(path.join(__dirname, 'dir'));
fs.mkdirSync(path.join(__dirname, 'dir', 'dir2')); // Ошибка, так не создает подпапки
fs.mkdirSync(path.join(__dirname, 'dir', 'dir2'), {recursive: true}); // Создает подпапки

// mkdir - создает папку асинхронно (повторно - ошибка)
console.log('Старт');
fs.mkdir(path.resolve(__dirname, 'dir', 'dir2'), (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Папка создана');
})
console.log('Конец');
// Создает подпапки
fs.mkdir(path.resolve(__dirname, 'dir', 'dir2'), {recursive: true}, (err) => {});



/* УДАЛЕНИЕ ПАПОК */
// rmdir - удаляет папку
fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
  if (err) {
    throw err;
  }
});


/* СОЗДАТЬ ФАЙЛ И ЗАПИСАТЬ ДАННЫЕ */
// writeFile - создает файл и записывает в него данные. ПЕРЕЗАПИСЫВАЕТ
fs.writeFile(path.resolve(__dirname, 'test.txt'), 'Привет, мир!', (err) => {
  if (err) {
    throw err;
    return;
  }

  console.log('Файл создан');

  // Вложенность гарантирует, что файл уже создан
  fs.appendFile(path.resolve(__dirname, 'test.txt'), 'Hello!', (err) => {
    if (err) {
      throw err;
      return;
    }
  
    console.log('Данные добавлены');
  });
});


/* Использование Promise API */
const writeFileAsync = async (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        return reject(err.message);
      }

      resolve();
    });
  });
}

const appendFileAsync = async (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, data, (err) => {
      if (err) {
        return reject(err.message);
      }

      resolve();
    });
  });
}

// чтение файла
const readFileAsync = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
      if (err) {
        return reject(err.message);
      }

      resolve(data);
    });
  });
}

writeFileAsync(path.resolve(__dirname, 'test.txt'), 'Привет, мир!')
  .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), 'Hello!'))
  .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), 'World!'))
  .then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
  .then(data => console.log(data))
  .catch(err => console.log(err));

// удаление файла
const removeFileAsync = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.rm(filePath, {encoding: 'utf-8'}, (err, data) => {
      if (err) {
        return reject(err.message);
      }

      resolve(data);
    });
  });
}

writeFileAsync(path.resolve(__dirname, 'test.txt'), 'Привет, мир!')
.then(() => removeFileAsync(path.resolve(__dirname, 'test.txt')))
.then(() => console.log('Файл удален'))


/* Общая работа для работы с файлами */
const text = process.env.TEXT || '';
console.log(text);

writeFileAsync(path.resolve(__dirname, 'test.txt'), text)
.then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
.then(data => data.split(' ').length)
.then(data => writeFileAsync(path.resolve(__dirname, 'count.txt'),  `Колчестно слов: ${data}`))
.then(() => removeFileAsync(path.resolve(__dirname, 'test.txt')))

// Запуск npx cross-env TEXT="1 2 3 4 5 test" node lessons/file-system.js