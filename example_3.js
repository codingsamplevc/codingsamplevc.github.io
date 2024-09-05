
// JavaScript example 3: Conway's 'Game of Life'

const GoL = {
  interval_id: null,
  auto_btn_id: "auto_sim",
  game_state: {},
  height: 25,
  width: 25,
  get_Adjacent: function (x_idx, y_idx, x_idx_max, y_idx_max){
    if (x_idx_max != 0 && y_idx_max != 0){
      const adjacent = [];
      const x = [x_idx];
      const y = [y_idx];
      if (x_idx > 0){
        x.push(x_idx - 1);
      }
      if (x_idx < x_idx_max){
        x.push(x_idx + 1);
      }
      if (y_idx > 0){
        y.push(y_idx - 1);
      }
      if (y_idx < y_idx_max){
        y.push(y_idx + 1);
      }
  
      for (const x_coord of x){
        for (const y_coord of y){
          if (x_coord != x_idx || y_coord != y_idx){
            adjacent.push(`${x_coord}_${y_coord}`);
          }
        }
      }
  
      return adjacent;
    }
  },
  get_AdjacentLiving: function (adjacent){
    let adjacent_living = 0;
    for (const cell_id of adjacent){
      if (GoL.game_state[cell_id]){
        adjacent_living++;
      }
    }
    return adjacent_living;
  },
  isAlive: function (currently_alive, adjacent_living){
    if (currently_alive){ return (adjacent_living > 1 && adjacent_living < 4); }
    else { return adjacent_living == 3; }
  },
  advance: function (){
    const cellsToChange = [];
    for (const cell in GoL.game_state){
      const cell_coords = cell.split('_');
      if (GoL.game_state[cell] != GoL.isAlive(GoL.game_state[cell], GoL.get_AdjacentLiving(GoL.get_Adjacent(parseInt(cell_coords[0]), parseInt(cell_coords[1]), GoL.height - 1, GoL.width - 1)))){
        cellsToChange.push(cell);
      }
    }
    for (const cell of cellsToChange){
      GoL.game_state[cell] = !(GoL.game_state[cell]);
      const cell_el = document.getElementById(cell);
      if (cell_el.className == 'alive'){
        cell_el.className = 'dead';
      } else {
        cell_el.className = 'alive';
      }
    }
  },
  flip: function (cell_id){
    GoL.game_state[cell_id] = !(GoL.game_state[cell_id]);
    const cell = document.getElementById(cell_id);
    if (cell.className == "alive"){
      cell.className = "dead";
    } else {
      cell.className = "alive";
    }
  },
  handleCellClick: function (e){
    GoL.flip(e.target.id);
  },
  stopAutoSimulation: function (){
    clearInterval(GoL.interval_id);
    GoL.interval_id = null;
    const auto_btn = document.getElementById(GoL.auto_btn_id);
    auto_btn.setAttribute("onclick", "GoL.startAutoSimulation()");
  },
  startAutoSimulation: function (){
    if (!GoL.interval_id){
      GoL.interval_id = setInterval(GoL.advance, 2000);
      const auto_btn = document.getElementById(GoL.auto_btn_id);
      auto_btn.setAttribute("onclick", "GoL.stopAutoSimulation()");
    }
  },
  createBoard: function createBoard(container_id){
    if (document.getElementById("gol_board")){ return; }
    
    const board = document.createElement("table");
    board.id = "gol_board";
    
    for (let i = 0; i < GoL.height; i++){
      let row = document.createElement("tr");
      for (let j = 0; j < GoL.width; j++){
        let cell = document.createElement("td");
        cell.id = `${i}_${j}`;
        cell.className = "dead";
        row.appendChild(cell);
        cell.addEventListener("click", GoL.handleCellClick);
        GoL.game_state[`${i}_${j}`] = 0;
      }
      board.appendChild(row);
    }
  
    const gol_desc = document.createElement("p");
    gol_desc.innerHTML = "Click on the board to flip cells. Click the 'Advance' button to simulate a turn/cycle. Keep clicking to see how your setup turns out.";
    const container = document.getElementById(container_id);
    container.appendChild(gol_desc);
    container.appendChild(board);
  
    const advance_btn = document.createElement("button");
    advance_btn.innerHTML = "Advance";
    advance_btn.addEventListener("click", GoL.advance);
    container.appendChild(advance_btn);

    const auto_simulation_btn = document.createElement("button");
    auto_simulation_btn.id = GoL.auto_btn_id;
    auto_simulation_btn.innerHTML = "Start/stop automatic simulation";
    auto_simulation_btn.setAttribute("onclick", "GoL.startAutoSimulation()");
    container.appendChild(auto_simulation_btn);
  }
};

// const game_state = {};
// const height = 25;
// const width = 25;

// function getAdjacent(x_idx, y_idx, x_idx_max, y_idx_max){
//   if (x_idx_max != 0 && y_idx_max != 0){
//     const adjacent = [];
//     const x = [x_idx];
//     const y = [y_idx];
//     if (x_idx > 0){
//       x.push(x_idx - 1);
//     }
//     if (x_idx < x_idx_max){
//       x.push(x_idx + 1);
//     }
//     if (y_idx > 0){
//       y.push(y_idx - 1);
//     }
//     if (y_idx < y_idx_max){
//       y.push(y_idx + 1);
//     }

//     for (const x_coord of x){
//       for (const y_coord of y){
//         if (x_coord != x_idx || y_coord != y_idx){
//           adjacent.push(`${x_coord}_${y_coord}`);
//         }
//       }
//     }

//     return adjacent;
//   }
// }

// function checkAdjacent(adjacent){
//   let adjacent_living = 0;
//   for (const cell_id of adjacent){
//     if (game_state[cell_id]){
//       adjacent_living++;
//     }
//   }
//   return adjacent_living;
// }

// function isAlive(currently_alive, adjacent_number){
//   if (currently_alive){ return (adjacent_number > 1 && adjacent_number < 4); }
//   else { return adjacent_number == 3; }
// }

// function advanceGOL(){
//   const cellsToChange = [];
//   for (const cell in game_state){
//     const cell_coords = cell.split('_');
//     if (game_state[cell] != isAlive(game_state[cell], checkAdjacent(getAdjacent(parseInt(cell_coords[0]), parseInt(cell_coords[1]), height - 1, width - 1)))){
//       cellsToChange.push(cell);
//     }
//   }
//   for (const cell of cellsToChange){
//     game_state[cell] = !(game_state[cell]);
//     const cell_el = document.getElementById(cell);
//     if (cell_el.className == 'alive'){
//       cell_el.className = 'dead';
//     } else {
//       cell_el.className = 'alive';
//     }
//   }
// }

// function changeCell(cell_id){
//   game_state[cell_id] = !(game_state[cell_id]);
//   const cell = document.getElementById(cell_id);
//   if (cell.className == "alive"){
//     cell.className = "dead";
//   } else {
//     cell.className = "alive";
//   }
// }

// function handleCellClick(e){
//   console.log("clicked " + e.target.id);
//   changeCell(e.target.id);
// }

// function createBoard(el_id){
//   if (document.getElementById("gol_board")){ return; }
  
//   const board = document.createElement("table");
//   board.id = "gol_board";
  
//   for (let i = 0; i < height; i++){
//     let row = document.createElement("tr");
//     for (let j = 0; j < width; j++){
//       let cell = document.createElement("td");
//       cell.id = `${i}_${j}`;
//       cell.className = "dead";
//       row.appendChild(cell);
//       cell.addEventListener("click", handleCellClick);
//       game_state[`${i}_${j}`] = 0;
//     }
//     board.appendChild(row);
//   }

//   const gol_desc = document.createElement("p");
//   gol_desc.innerHTML = "Click on the board to flip cells. Click the 'Advance' button to simulate a turn/cycle. Keep clicking to see how your setup turns out.";
//   const container = document.getElementById(el_id);
//   container.appendChild(gol_desc);
//   container.appendChild(board);

//   const advance_btn = document.createElement("button");
//   advance_btn.innerHTML = "Advance";
//   advance_btn.addEventListener("click", advanceGOL);
//   container.appendChild(advance_btn);
// }
