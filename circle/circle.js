function formLinesOfCircle(curRow, radius) {
  const emptyChars = ((curRow * (curRow + 1)) / 2);
  const noOfStars = radius - emptyChars;
  const length = emptyChars + noOfStars;

  return ('*'.repeat(noOfStars)).padStart(length);
}

function circle() {
  const radius = parseInt(prompt('enter radius : '));
  const diameter = radius * 2;

  const linesOfCircle = [];

  for (let curRow = 0; curRow <= radius - 1; curRow++) {
    const lines = formLinesOfCircle(curRow, diameter);
    linesOfCircle.push(lines + lines.trimStart());
    linesOfCircle.unshift(lines + lines.trimStart());
  }
  return linesOfCircle;
}

console.log(circle());
