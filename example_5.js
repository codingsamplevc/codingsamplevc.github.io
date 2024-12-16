
// test sudoku

const test = {
  len: 9,
  board: null,
  setupBoard: function (container_id){
    // Array(test.len).fill(Array(test.len).fill(' '))
    // Array(test.len).fill(Array(test.len).fill(' '))
    // Array.from(Array(test.len), (a) => { Array.from(Array(test.len), (b) => ' ') })
    const board = Array.from(
      Array(test.len),
      (a) => a = Array.from(
        Array(test.len),
        (b) => b = ' ') );
    test.board = board;

    test.printBoard();

    test.changeCell({ row: 0, col: 0 }, '5');
    
    test.printBoard();
    
    test.changeCell({ row: 8, col: 0 }, '3');
    
    test.printBoard();
    
    test.changeCell({ row: 8, col: 8 }, '7');
    
    test.printBoard();
  },
  printBoard: function (){
    console.log(JSON.stringify(test.board));
  },
  changeCell: function (coords, val){
    if (test.board){
      test.board[coords.row][coords.col] = val;
    }
  },
};
