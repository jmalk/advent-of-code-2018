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

    const allPairsOfBoxIds = allPairs(boxIds);

    const pairsWithOnlyOneDifference = allPairsOfBoxIds.filter((pair) => {
      const sameLength = pair[0].length === pair[1].length;
      const onlyOneDifference = sharedCharacters(pair[0], pair[1]).length === pair[0].length - 1;
      return sameLength && onlyOneDifference;
    });

    console.log(`Shared characters of box IDs: ${sharedCharacters(pairsWithOnlyOneDifference[0][0], pairsWithOnlyOneDifference[0][1])}`);
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

// console.log(`Expected abce, got ${sharedCharacters('abcde', 'abcxe')}`);
// console.log(`Expected a, got ${sharedCharacters('abcde', 'acdef')}`);

function allPairs (arr) {
  let pairs = [];

  arr.forEach((element, index, array) => {
    for (let i = index + 1; i < array.length; i++) {
      pairs.push([element, array[i]]);
    }
  });

  return pairs;
}

// console.log(`Expected [ab, ac, bc], got ${JSON.stringify(allPairs(['a', 'b', 'c']))}`);