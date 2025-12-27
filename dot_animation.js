function delay() {
  for (let index = 0; index < 400000000; index++) {
  }
}
function rightAngledTriaAnimation() {
  while(true) {
    for (let index = 0; index < 10; index++) {
      console.clear();
      console.log(rightTriangle(index));      
      delay();
    }
  }
}
function rightTriangle(limit) {
  let emoji = '';
  for (let index = 0; index < limit; index++) {
    emoji += '\n'+'💥'.repeat(index) ;
  }
  return emoji;
}

rightAngledTriaAnimation();