const path = require('path');

// Позволяет склеить путь из нескольких частейвне записимости от ОС
const joinedPath = path.join('first', 'second', 'third');
console.log('joinedPath - ', joinedPath);

// __dirname - хранится путь к текущей директории
const joinedPathDirname = path.join(__dirname, 'first', 'second', 'third');
console.log('joinedPathDirname - ', joinedPathDirname);

// ".." - переход в родительскую директорию
const parentDirPath = path.join(__dirname, '..');
console.log('parentDirPath - ', parentDirPath);



// resolve - склеивает путь из нескольких частей и возвращает абсолютный путь
const resolvedPath = path.resolve('first', 'second', 'third');
console.log('resolvedPath - ', resolvedPath);

// работает мнее предсказуемо - d:\first\second\third
const resolvedPathError = path.resolve('/first', 'second', 'third');
console.log('resolvedPathError - ', resolvedPathError);



const fullappath = path.resolve(__dirname, '../first', 'second', 'third.js');
// Парсит путь на объект
const parsedPath = path.parse(fullappath);
console.log('parsedPath - ', parsedPath);


/*-------------------*/

const siteURL = 'http://localhost:8080/users?id=50#top';

const url = new URL(siteURL);
console.log(url);