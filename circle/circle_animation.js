const sqr = (x) => x * x;

const distanceBetween = (point1, point2) => 
  Math.sqrt(sqr(point1[0] - point2[0] ) + sqr(point1[1] - point2[1]))


const drawCircle = (width, height, XOfCenter, YOfCenter, radius) => {
  const lines = [];
  for (let curHeight = 0; curHeight < height; curHeight++) {
    let line = '';
    for (let curWidth = 0; curWidth < width; curWidth++) {
      const distance = distanceBetween([curWidth, curHeight], [XOfCenter, YOfCenter]);
      const char = distance === radius ? '● ' : '  ';
      line += char;
    }
    lines.push(line);
  }
  return lines.join('\n');
}

const delay = (multiplier) => {
  for (let index = 0; index <= multiplier * 100000000; index++);
}


const main = () => {
  const width = 30;
  const height = 30;
  const XOfCenter = 15;
  const YOfCenter = 15;
  const radius = 13;
  for (let curRadius = 1; curRadius <= radius; curRadius++) {
    console.clear();
    console.log(drawCircle(width, height, XOfCenter, YOfCenter, curRadius));
    delay(3);
  }
}
  
main()