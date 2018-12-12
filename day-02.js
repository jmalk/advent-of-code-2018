const readFilePromise = require('./promise-to-read-file');

let readFile = readFilePromise('./inputs/day-02');

readFile
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });