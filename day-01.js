const fs = require('fs');

fs.readFile('day-01-input', 'utf8', (err, data) => {
  if (err) throw err;
  const frequencyChanges = data.split('\n')
  .map(change => parseInt(change));

  const frequencyDiff = frequencyChanges.reduce((a, b) => a + b);
  console.log(`Result of all frequency changes: ${frequencyDiff}`);

  const firstFrequencyReachedTwice = calculateFirstFrequencyReachedTwice(frequencyChanges);
  console.log(`First frequency reached twice: ${firstFrequencyReachedTwice}`);
});

function calculateFirstFrequencyReachedTwice (frequencyChanges) {
  let frequenciesReached = [0];
  let firstRepeat;

  for (let limitCount = 0; limitCount < 10000; limitCount++) {
    if (firstRepeat !== undefined) {
      break;
    }
    for (let i = 0; i < frequencyChanges.length; i++) {
      let newFrequency = frequenciesReached[frequenciesReached.length - 1] + frequencyChanges[i];
      if (frequenciesReached.includes(newFrequency)) {
        firstRepeat = newFrequency;
        break;
      } else {
        frequenciesReached.push(newFrequency);
      }
    }
  }

  return firstRepeat;
}