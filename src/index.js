module.exports = function solveSudoku(matrix) {
  //   [7, 0, 0, 5, 0, 0, 0, 0, 0],
  //   [0, 0, 5, 0, 0, 0, 0, 0, 0],
  //   [0, 2, 0, 0, 0, 4, 8, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 4, 1, 0],
  //   [5, 0, 4, 7, 0, 0, 0, 0, 0],
  //   [0, 1, 0, 6, 4, 0, 0, 5, 0],
  //   [6, 9, 8, 2, 3, 5, 1, 0, 0],
  //   [4, 5, 7, 1, 0, 8, 2, 3, 6],
  //   [1, 3, 0, 4, 0, 7, 0, 0, 0]

  let emptyPlaces = [];
  //console.log("start matrix", matrix);

  for(let i = 0; i < 9; i++) {
    for(let j = 0; j < 9; j++) {
      if(matrix[i][j] !== 0) continue;
      //console.log("i:", i, " j:", j, matrix[i][j])
      let checkResult = checkPlace(matrix, i,j);
      //console.log("checkResult", checkResult);
      if(checkResult.values.length === 0) return false;
      emptyPlaces.push(checkResult);
    }
  }
  //console.log("emptyPlaces", emptyPlaces);
  if(emptyPlaces.length == 0) return matrix;
  
  emptyPlaces.sort((first, second) => { return first.values.length - second.values.length});
  //console.log("emptyPlaces", emptyPlaces);
  let place = emptyPlaces[0];
  let valueIndex = 0;
  //console.log("place", place);
  
  while(valueIndex < place.values.length) {
    if ( place.x == 8 && place.y == 0)
    {
      //console.log("fff");
    }
    matrix[place.y][place.x] = place.values[valueIndex];
    //console.log("matrix", matrix);
    let solved = solveSudoku(matrix);
    //console.log("solver", solved);
    if(solved !== false) {return solved;}
    matrix[place.y][place.x] = 0;
    valueIndex++;
  }
  return false;
}

function checkPlace(matrix, i, j) {
  let numbers = [1,2,3,4,5,6,7,8,9];
  for(let x = 0; x < 9; x++) {
    if(matrix[i][x] !== 0) numbers[matrix[i][x] - 1] = 0;
    if(matrix[x][j] !== 0) numbers[matrix[x][j] - 1] = 0;
  }
  for(let a = Math.floor(i / 3); a < Math.ceil((i == 0 ? 1: i) / 3); a++){
    for(let b = Math.floor(j / 3); b < Math.ceil((j == 0 ? 1: j) / 3); b++){
      if(matrix[a][b] !== 0) numbers[matrix[a][b] - 1] = 0;
    }
  }
  return {x: j, y: i, values: numbers.filter(it => it !== 0)};
}

// const initial = [
//   [6, 5, 0, 7, 3, 0, 0, 8, 0],
//   [0, 0, 0, 4, 8, 0, 5, 3, 0],
//   [8, 4, 0, 9, 2, 5, 0, 0, 0],
//   [0, 9, 0, 8, 0, 0, 0, 0, 0],
//   [5, 3, 0, 2, 0, 9, 6, 0, 0],
//   [0, 0, 6, 0, 0, 0, 8, 0, 0],
//   [0, 0, 9, 0, 0, 0, 0, 0, 6],
//   [0, 0, 7, 0, 0, 0, 0, 5, 0],
//   [1, 6, 5, 3, 9, 0, 4, 7, 0]
// ];
// console.log(solveSudoku(initial));