
// Sudoku

const sudoku = {
  ids: {
    container: '',
    table: 'sudoku',
    cell_prefix: 'sudo'
  },
  len: 9,
  board: null,
  setupBoard: function (container_id){
    sudoku.ids.container = container_id;
    // Array(sudoku.len).fill(Array(sudoku.len).fill(' '))
    // Array(sudoku.len).fill(Array(sudoku.len).fill(' '))
    // Array.from(Array(sudoku.len), (a) => { Array.from(Array(sudoku.len), (b) => ' ') })
    const board = Array.from(
      Array(sudoku.len),
      (a) => a = Array.from(
        Array(sudoku.len),
        (b) => b = ' ') );
    sudoku.board = board;
    
    sudoku.makeTable();

    // sudoku.printBoard();

    // sudoku.changeCell({ row: 0, col: 0 }, '5');
    
    // sudoku.printBoard();
    
    // sudoku.changeCell({ row: 8, col: 0 }, '3');
    
    // sudoku.printBoard();
    
    // sudoku.changeCell({ row: 8, col: 8 }, '7');
    
    // sudoku.printBoard();
  },
  printBoard: function (){
    console.log(JSON.stringify(sudoku.board));
  },
  changeCell: function (coords, val){
    if (sudoku.board){
      sudoku.board[coords.row][coords.col] = val;
    }
  },
  makeTable: function (){
  
    function ret_cell(id){
      const cell = document.createElement("td");
      cell.id = id;
      const inputfield = document.createElement("input");
      inputfield.type = 'text';
      inputfield.setAttribute('maxlength', 1);
      inputfield.setAttribute('size', 1);
      inputfield.addEventListener('change', sudoku.updateListener);
      cell.appendChild(inputfield);
      return cell;
    }
  
    function ret_cellrow(i){
      const row = document.createElement("tr");
      for (let j = 0; j < sudoku.len; j++){
        row.appendChild(ret_cell(`${sudoku.ids.cell_prefix}_${i}_${j}`));
      }
      return row;
    }
    
    if (!document.getElementById(sudoku.ids.table)){
      const table = document.createElement("table");
      table.id = sudoku.ids.table;
      
      for (let i = 0; i < sudoku.len; i++){
        const row = ret_cellrow(i);
        table.appendChild(row);
      }
      
      const container = document.getElementById(sudoku.ids.container);
      container.appendChild(table);
  
      // const game_status_el = document.createElement("p");
      // game_status_el.id = ttt.game_status_id;
      // container.appendChild(game_status_el);
      
      // const create_button = document.getElementById(ttt.create_btn_id);
      // create_button.setAttribute('onclick', 'ttt.reset()');
      // create_button.innerHTML = "Reset board";
    }
  },
  updateListener: function (e){
    let coords = e.target.parentElement.id.split('_').filter((el) => !Number.isNaN(el));
    coords = { row: coords[0], col: coords[1] };
    // sudoku.changeCell(coords = { row: coords[0], col: coords[1] }, val = e.target.value);
    sudoku.changeCell(coords, e.target.value);
  },
  updateTable: function (){
    const values = sudoku.board;

    for (let i = 0; i < sudoku.len; i++){
      for (let j = 0; j < sudoku.len; j++){
        const table_cell = document.getElementById(`${sudoku.ids.cell_prefix}_${i}_${j}`);
        table_cell.firstChild.value = values[i][j];
      }
    }
  },
};
