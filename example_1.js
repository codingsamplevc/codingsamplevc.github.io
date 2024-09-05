// JavaScript example 1: TicTacToe

const ttt = {
  playerTurn: 1,
  players: ['O', 'X'],
  prefix: 'ttt',
  table_id: 'tttTable',
  game_over: 0,
  create_btn_id: 'createTTT'
};

function get_Value(id){
  return document.getElementById(id).innerHTML;
}

function checkWinCondition(player){
  
  let diagL = 0;
  let diagR = 0;
  for (let k = 0; k < 3; k++){
    if (get_Value(`${ttt.prefix}_${k}_${k}`) == player){
      diagL++;
    }
    if (get_Value(`${ttt.prefix}_${k}_${2 - k}`) == player){
      diagR++;
    }
  }
  
  if (diagL == 3 || diagR == 3){
    return true;
  }
  
  
  let horiz = 0;
  let vert = 0;
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      if (get_Value(`${ttt.prefix}_${i}_${j}`) == player){
        horiz++;
      }
      if (get_Value(`${ttt.prefix}_${j}_${i}`) == player){
        vert++;
      }
    }
    
    if (horiz == 3 || vert == 3){
      return true;
    }
    horiz = 0;
    vert = 0;
  }
  
  return false;
}


function get_CurrentPlayer(){
  return ttt.players[ttt.playerTurn % 2];
}

function advanceTurn(){
  ttt.playerTurn++;
}

function chooseCell(){
  if (ttt.game_over) { return; }
  const gameStatusEl = document.getElementById("ttt_game_status");
  gameStatusEl.innerHTML = '';
  if (this.innerHTML == ' '){
    this.innerHTML = get_CurrentPlayer();
    const curPlayer = get_CurrentPlayer();
    if (ttt.playerTurn > 4 && checkWinCondition(curPlayer)){
      gameStatusEl.innerHTML = `Player ${curPlayer} won!`;
      ttt.game_over = !(ttt.game_over);
    }
    advanceTurn();
  } else {
    gameStatusEl.innerHTML = 'Cell has already been taken.';
  }
}

function reset_TTT(table_id){
  if (!document.getElementById(table_id)) { return; }
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      const cell = document.getElementById(`${ttt.prefix}_${i}_${j}`);
      cell.innerHTML = ' ';
    }
  }
  ttt.playerTurn = 1;
  const gameStatusEl = document.getElementById("ttt_game_status");
  gameStatusEl.innerHTML = '';
}


function create_TicTacToeTable(container_id){
  // Function that creates an HTML table that can be used to play TicTacToe
    
  function returnTableCell(id){
    const tCell = document.createElement("td");
    tCell.id = id;
    tCell.onclick = chooseCell;
    tCell.innerHTML = ' ';
    return tCell;
  }
  
  
  function returnTableRow(i){
    const tRow = document.createElement("tr");
    for (let j = 0; j < 3; j++){
      tRow.appendChild(returnTableCell(`${ttt.prefix}_${i}_${j}`));
    }
    return tRow;
  }
  
  if (!document.getElementById(ttt.table_id)){
    const tableEl = document.createElement("table");
    tableEl.id = ttt.table_id;
    
    for (let i = 0; i < 3; i++){
      const tRow = returnTableRow(i);
      tableEl.appendChild(tRow);
    }
    
    const tableContainer = document.getElementById(container_id);
    tableContainer.appendChild(tableEl);

    const gameStatusEl = document.createElement("p");
    gameStatusEl.id = "ttt_game_status";
    tableContainer.appendChild(gameStatusEl);
  }

  const create_button = document.getElementById(ttt.create_btn_id);
  create_button.setAttribute('onclick', "reset_TTT('" + ttt.table_id + "')");
  create_button.innerHTML = "Reset board";
}
