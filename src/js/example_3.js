// JavaScript example 3: Conway's 'Game of Life'

class GameOfLife {
  #height = 25;
  #width = 25;
  #autoSimOn = false;
  #classNames = {
    container: "gameoflife-container",
    description: "gameoflife-description",
    board: "gameoflife-board",
    advanceBtn: "gameoflife-adv-btn",
    autoBtn: "gameoflife-auto-btn",
    autoTimer: "gameoflife-auto-timer"
  };
  #elements = {
    container: null,
    board: null,
    advanceBtn: null,
    autoBtn: null,
    autoTimer: null
  };
  #gameState = {};

  constructor() {
    this.#elements.container = document.querySelector(`.${this.#classNames.container}`);
    if (!(document.querySelector(`.${this.#classNames.board}`)) && this.#elements.container) {
      this.#createBoard();
    } else { this.#elements.container = null; }
  }

  #getAdjacent(x_index, y_index, x_index_max, y_index_max) {
    if (x_index_max != 0 && y_index_max != 0) {
      const adjacent = [];
      const x = [x_index];
      const y = [y_index];
      if (x_index > 0){
        x.push(x_index - 1);
      }
      if (x_index < x_index_max){
        x.push(x_index + 1);
      }
      if (y_index > 0){
        y.push(y_index - 1);
      }
      if (y_index < y_index_max){
        y.push(y_index + 1);
      }
  
      for (const x_coord of x){
        for (const y_coord of y){
          if (x_coord != x_index || y_coord != y_index){
            adjacent.push(`${x_coord}_${y_coord}`);
          }
        }
      }
  
      return adjacent;
    }
  }

  #getAdjacentLiving (adjacent) {
    let adjacent_living = 0;
    for (const cell_id of adjacent){
      if (this.#gameState[cell_id]){
        adjacent_living++;
      }
    }
    return adjacent_living;
  }

  #isAlive (currently_alive, adjacent_living) {
    if (currently_alive){ return (adjacent_living > 1 && adjacent_living < 4); }
    else { return adjacent_living == 3; }
  }

  #advance() {
    const cellsToChange = [];
    for (const cell in this.#gameState){
      const cell_coords = cell.split('_');
      if (this.#gameState[cell] != this.#isAlive(this.#gameState[cell], this.#getAdjacentLiving(this.#getAdjacent(parseInt(cell_coords[0]), parseInt(cell_coords[1]), this.#height - 1, this.#width - 1)))){
        cellsToChange.push(cell);
      }
    }
    for (const cell of cellsToChange){
      this.#gameState[cell] = !(this.#gameState[cell]);
      const cell_el = document.getElementById(cell);
      if (cell_el.className == "alive"){
        cell_el.className = "dead";
      } else {
        cell_el.className = "alive";
      }
    }
  }

  #flip(cell_id) {
    this.#gameState[cell_id] = !(this.#gameState[cell_id]);
    const cell = document.getElementById(cell_id);
    if (cell.className == "alive"){
      cell.className = "dead";
    } else {
      cell.className = "alive";
    }
  }
  
  #handleCellClick(e) {
    this.#flip(e.target.id);
  }

  #autoSimulation() {
    // if (!this.#elements.autoTimer) { return; }
    this.#autoSimOn = !this.#autoSimOn;
    if (this.#autoSimOn) {
      this.#elements.autoTimer = setInterval(() => this.#advance(), 1500);
    } else {
      clearInterval(this.#elements.autoTimer);
    }
  }

  #createBoard() {
    const board = document.createElement("table");
    this.#elements.board = board;
    board.className = this.#classNames.board;

    for (let i = 0; i < this.#height; ++i) {
      let row = document.createElement("tr");
      for (let j = 0; j < this.#width; ++j) {
        let cell = document.createElement("td");
        cell.id = `${i}_${j}`;
        cell.className = "dead";
        row.appendChild(cell);
        cell.addEventListener("click", (e) => this.#handleCellClick(e));
        this.#gameState[`${i}_${j}`] = 0;
      }
      board.appendChild(row);
    }

    const description = document.createElement("p");
    description.innerText = "Click on the board to flip cells. Click the 'Advance' button to simulate a turn/cycle. Keep clicking to see how your setup turns out.";

    this.#elements.container.appendChild(description);
    this.#elements.container.appendChild(board);

    const advanceBtn = document.createElement("button");
    this.#elements.advanceBtn = advanceBtn;
    advanceBtn.innerText = "Advance";
    advanceBtn.addEventListener("click", () => this.#advance());

    this.#elements.container.appendChild(advanceBtn);

    const autoBtn = document.createElement("button");
    this.#elements.autoBtn = autoBtn;
    autoBtn.className = this.#classNames.autoBtn;
    autoBtn.innerText = "Start/stop automatic simulation";
    autoBtn.addEventListener("click", () => this.#autoSimulation());

    this.#elements.container.appendChild(autoBtn);
  }
}

new GameOfLife();
