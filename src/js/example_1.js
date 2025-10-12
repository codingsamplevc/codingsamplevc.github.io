// JavaScript example 1: TicTacToe

const ttt = {
  game_over: 0,
  playerTurn: 1,
  players: ['O', 'X'],
  prefix: 'ttt',
  table_id: 'tttTable',
  create_btn_id: 'createTTT',
  game_status_id: 'ttt_game_status',
  get_Value: function (id){
    return document.getElementById(id).innerHTML;
  },
  checkWinCondition: function (player){
    let diagL = 0;
    let diagR = 0;
    for (let k = 0; k < 3; k++){
      if (ttt.get_Value(`${ttt.prefix}_${k}_${k}`) == player){
        diagL++;
      }
      if (ttt.get_Value(`${ttt.prefix}_${k}_${2 - k}`) == player){
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
        if (ttt.get_Value(`${ttt.prefix}_${i}_${j}`) == player){
          horiz++;
        }
        if (ttt.get_Value(`${ttt.prefix}_${j}_${i}`) == player){
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
  },
  get_CurrentPlayer: function (){
    return ttt.players[ttt.playerTurn % 2];
  },
  advanceTurn: function (){
    ttt.playerTurn++;
  },
  chooseCell: function (){
    if (ttt.game_over) { return; }
    const game_status_el = document.getElementById(ttt.game_status_id);
    game_status_el.innerHTML = '';
    if (this.innerHTML == ' '){
      this.innerHTML = ttt.get_CurrentPlayer();
      const curPlayer = ttt.get_CurrentPlayer();
      if (ttt.playerTurn > 4 && ttt.checkWinCondition(curPlayer)){
        game_status_el.innerHTML = `Player ${curPlayer} won!`;
        ttt.game_over = 1;
      }
      ttt.advanceTurn();
      if (ttt.playerTurn > 9) {
        game_status_el.innerHTML = `It's a draw!`;
        ttt.game_over = 1;
      }
    } else {
      game_status_el.innerHTML = 'Cell has already been taken.';
    }
  },
  reset: function (){
    if (!document.getElementById(ttt.table_id)) { return; }
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        const cell = document.getElementById(`${ttt.prefix}_${i}_${j}`);
        cell.innerHTML = ' ';
      }
    }
    ttt.game_over = 0;
    ttt.playerTurn = 1;
    const game_status_el = document.getElementById(ttt.game_status_id);
    game_status_el.innerHTML = '';
  },
  createBoard: function (container_id){
      
    function returnTableCell(id){
      const tCell = document.createElement("td");
      tCell.id = id;
      tCell.onclick = ttt.chooseCell;
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
  
      const game_status_el = document.createElement("p");
      game_status_el.id = ttt.game_status_id;
      tableContainer.appendChild(game_status_el);
      
      const create_button = document.getElementById(ttt.create_btn_id);
      create_button.setAttribute('onclick', 'ttt.reset()');
      create_button.innerHTML = "Reset board";
    }
  }
};
