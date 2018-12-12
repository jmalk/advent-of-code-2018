const fs = require('fs');

function readFilePromise (filename) {
  return new Promise (function (resolve, reject) {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

module.exports = readFilePromise;