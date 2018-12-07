const fs = require('fs');

fs.readFile('day-01-input', 'utf8', (err, data) => {
  if (err) throw err;
  const frequencyChanges = data.split('\n')
    .map(change => parseInt(change));
  console.log(frequencyChanges);
  const frequencyDiff = frequencyChanges.reduce((a, b) => a + b);
  console.log(frequencyDiff);
});