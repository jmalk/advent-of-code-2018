const readFilePromise = require('./promise-to-read-file');

let readFile = readFilePromise('./inputs/day-03');

readFile
  .then((data) => {
    let fabricClaims = data.split('\n')
    let parsedFabricClaims = fabricClaims.map(parseClaim);
    let areasClaimed = parsedFabricClaims.map(areaClaimed);

    let squaresClaimedOnce = new Set();
    let squaresClaimedMoreThanOnce = new Set();

    areasClaimed.forEach((claim) => {
      claim.forEach((square) => {
        if (squaresClaimedOnce.has(square)) {
          squaresClaimedMoreThanOnce.add(square);
        }
        squaresClaimedOnce.add(square);
      });
    });

    console.log(`Squares of fabric claimed more than once: ${squaresClaimedMoreThanOnce.size}`);
  })
  .catch((err) => {
    console.error(err);
  });

function parseClaim (claimString) {
  let tokens = claimString.split(' ');

  let id = tokens[0];

  let positionString = tokens[2];
  let positionArray = positionString.split(',');
  let x = positionArray[0];
  let yString = positionArray[1];
  let y = yString.substring(0, yString.length - 1);

  let width = tokens[3].split('x')[0];
  let height = tokens[3].split('x')[1];

  return {
    id,
    x: parseInt(x),
    y: parseInt(y),
    width: parseInt(width),
    height: parseInt(height)
  }
}

function areaClaimed ({ x, y, width, height }) {
  let leftEdge = x;
  let rightEdge = x + width;
  let topEdge = y;
  let bottomEdge = y + height;

  let claimed = [];

  for (let i = leftEdge; i < rightEdge; i++) {
    for (let j = topEdge; j < bottomEdge; j++) {
      claimed.push(`${i}x${j}`);
    }
  }
  return claimed;
}

// let testClaim = areaClaimed({
//   id: '#what',
//   x: 3,
//   y: 2,
//   width: 5,
//   height: 4
// });
// console.log(`Area claimed: ${JSON.stringify(testClaim)}`);