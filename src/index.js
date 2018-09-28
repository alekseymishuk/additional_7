module.exports = function solveSudoku(matrix) {
  let emptyPlaces = [];

  //getting all empty places and theirs possible values
  for(let i = 0; i < 9; i++) {
    for(let j = 0; j < 9; j++) {
      if(matrix[i][j] !== 0) continue;
      let empltyPlace = getPossibleValues(matrix, i,j);
      if(empltyPlace.values.length === 0) return false;
      emptyPlaces.push(empltyPlace);
    }
  }

  //is no one empty places? return result
  if(emptyPlaces.length == 0) return matrix;
  
  // sort by minimal count of possible values
  emptyPlaces.sort((first, second) => { return first.values.length - second.values.length});
  
  //let start calculate result
  let place = emptyPlaces[0];
  let valueIndex = 0;
  while(valueIndex < place.values.length) {
    matrix[place.y][place.x] = place.values[valueIndex];
    let solved = solveSudoku(matrix);
    // if solved === false - result is not correct, need to set other value.
    // if solved is matrix - Sudoku has been solved
    if(solved !== false) return solved;
    matrix[place.y][place.x] = 0;
    valueIndex++;
  }
  // return on step back and set other value
  return false;
}

function getPossibleValues(matrix, i, j) {
  let numbers = [1,2,3,4,5,6,7,8,9];
  
  //check vertical and horizontal lines
  for(let x = 0; x < 9; x++) {
    if(matrix[i][x] !== 0) numbers[matrix[i][x] - 1] = 0;
    if(matrix[x][j] !== 0) numbers[matrix[x][j] - 1] = 0;
  }

  //check square
  for(let a = Math.floor(i / 3) * 3; a < Math.floor((i / 3) + 1) * 3; a++){
    for(let b = Math.floor(j / 3) * 3; b < Math.floor((j / 3) + 1) * 3; b++){
      if(matrix[a][b] !== 0) numbers[matrix[a][b] - 1] = 0;
    }
  }

  //return data of empty place
  return {x: j, y: i, values: numbers.filter(it => it !== 0)};
}