const readFilePromise = require('./promise-to-read-file');

let readFile = readFilePromise('./inputs/day-02');

readFile
  .then((data) => {
    let boxIds = data.split('\n');

    function reducer (tallies, currentValue) {
      if (aLetterOccursExactlyNTimes(currentValue, 2)) {
        tallies.idsWithExactlyTwoOfALetter += 1;
      }
      if (aLetterOccursExactlyNTimes(currentValue, 3)) {
        tallies.idsWithExactlyThreeOfALetter += 1;
      }
      return tallies;
    }

    let startingTallies = {
      idsWithExactlyTwoOfALetter: 0,
      idsWithExactlyThreeOfALetter: 0
    };

    let finalTallies = boxIds.reduce(reducer, startingTallies);
    console.log({finalTallies});

    const rudimentaryHash = finalTallies.idsWithExactlyTwoOfALetter * finalTallies.idsWithExactlyThreeOfALetter;
    console.log({rudimentaryHash});
  })
  .catch((err) => {
    console.error(err);
  });

function aLetterOccursExactlyNTimes (string, n) {
  const letterRegExes = [
    /a/g,
    /b/g,
    /c/g,
    /d/g,
    /e/g,
    /f/g,
    /g/g,
    /h/g,
    /i/g,
    /j/g,
    /k/g,
    /l/g,
    /m/g,
    /n/g,
    /o/g,
    /p/g,
    /q/g,
    /r/g,
    /s/g,
    /t/g,
    /u/g,
    /v/g,
    /w/g,
    /x/g,
    /y/g,
    /z/g,
  ];

  const lettersWhichAppearTwice = letterRegExes.filter((letterRegEx) => {
    const matches = string.match(letterRegEx);
    return matches && matches.length === n;
  })

  return lettersWhichAppearTwice.length > 0;
}

function sharedCharacters (stringA, stringB) {
  let a = stringA.split('');
  let b = stringB.split('');

  let sharedCharacters = a.filter((letter, index) => {
    return letter === b[index];
  });

  return sharedCharacters.join('');
}

console.log(`Expected abce, got ${sharedCharacters('abcde', 'abcxe')}`);
console.log(`Expected a, got ${sharedCharacters('abcde', 'acdef')}`);