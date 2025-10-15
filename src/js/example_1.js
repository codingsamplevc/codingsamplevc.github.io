// JavaScript example 1: TicTacToe

class TicTacToe {
  #gameOver = false;
  #turn = 0;
  #players = ['O','X'];
  #classNames = {
    container: "tictactoe-container",
    button: "tictactoe-btn",
    table: "tictactoe-board",
    status: "tictactoe-status",
  };
  #elements = {
    container: null,
    button: null,
    table: null,
    status: null,
  };

  constructor(container, button) {
    this.#elements.container = container;
    this.#elements.button = button;
    this.#elements.button.addEventListener("click", () => this.#setupBoard());
  }

  #setupBoard() {
    if (this.#elements.container) {
      if (this.#elements.table) {
        this.#reset();
        return;
      }
      const table = document.createElement("table");
      table.classList.add(this.#classNames.table);
      this.#elements.table = table;
      this.#elements.container.appendChild(table);
      
      const status = document.createElement("p");
      status.classList.add(this.#classNames.status);
      this.#elements.status = status;
      this.#elements.container.appendChild(status);

      for (let i = 0; i < 3; ++i){
        const row = this.#create_tableRow();
        table.appendChild(row);
      }
    }
  }

  #create_tableRow() {
    const row = document.createElement("tr");
    for (let i = 0; i < 3; ++i){
      row.appendChild(this.#create_tableCell());
    }
    return row;
  }

  #create_tableCell() {
    const cell = document.createElement("td");
    cell.innerHTML = ' ';
    cell.addEventListener("click", (ev) => {
      if (this.#isClickable(ev.currentTarget)) {
        ev.currentTarget.innerHTML = `${this.#players[this.#turn]}`;
        if (this.#isGameWon()) {
          this.#elements.status.innerHTML = `Player ${this.#players[this.#turn]} won!`;
          this.#gameOver = true;
          return;
        }
        this.#clearStatus();
        this.#turn = this.#turn ? 0 : 1;
      }
    });
    return cell;
  }

  #isClickable(element) {
    if (this.#gameOver) { return false; }
    if (!(element.innerHTML === ' ')) {
      this.#elements.status.innerHTML = "Square already taken.";
      return false;
    }
    return true;
  }

  #isGameWon() {
    if (!this.#elements.table) { return; }
    const rows = this.#elements.table.children;
    if (!rows) { return; }
    
    let diagonalUpperleft = 0;
    let diagonalUpperRight = 0;
    for (let i = 0; i < 3; ++i) {
      if (rows.item(i).children.item(i).innerHTML === `${this.#players[this.#turn]}`) {
        diagonalUpperleft++;
      }
      if (rows.item(i).children.item(2 - i).innerHTML === `${this.#players[this.#turn]}`) {
        diagonalUpperRight++;
      }
    }
    if (diagonalUpperleft === 3 || diagonalUpperRight === 3) { return true; }
    
    let rowCount = 0;
    let columnCount = 0;
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        if (rows.item(i).children.item(j).innerHTML === `${this.#players[this.#turn]}`) { rowCount++; }
        if (rows.item(j).children.item(i).innerHTML === `${this.#players[this.#turn]}`) { columnCount++; }
        if (rowCount === 3 || columnCount === 3) { return true; }

      }
      rowCount = 0;
      columnCount = 0;
    }
    return false;
  }

  #reset() {
    const board = this.#elements.table.children;

    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        board.item(i).children.item(j).innerHTML = ' ';
      }
    }

    this.#gameOver = false;
    this.#turn = 0;

    this.#clearStatus();
  }

  #clearStatus() {
    this.#elements.status.innerHTML = "";
  }
}

function PlayTicTacToe() {
  const container = document.querySelector(".tictactoe-container");
  const button = document.querySelector(".tictactoe-btn");

  new TicTacToe(container, button);
}

PlayTicTacToe();

