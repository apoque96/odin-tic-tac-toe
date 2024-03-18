const GameObject = (function () {
  const state = Object.freeze({
    none: "",
    x: "X",
    o: "O",
  });

  let arr = [];

  function createPlayer(name, symbol) {
    let score = 0;

    const getScore = () => score;
    const giveScore = () => score++;

    const makeMove = (index, cell) => {
      if (arr[index] === state.none) {
        arr[index] = symbol;
        symbol === state.x
          ? (cell.firstChild.src = "./images/cross.png")
          : (cell.firstChild.src = "./images/circle.png");
      } else throw new Error("cell already ocuppied");
      return checkWin(symbol);
    };

    function checkWin() {
      for (let i = 0; i < 3; i++) {
        if (
          arr[0 + i * 3] === symbol &&
          arr[1 + i * 3] === symbol &&
          arr[2 + i * 3] === symbol
        ) {
          return true;
        }
      }
      for (let i = 0; i < 3; i++) {
        if (
          arr[0 + i] === symbol &&
          arr[3 + i] === symbol &&
          arr[6 + i] === symbol
        ) {
          return true;
        }
      }

      if (arr[0] === symbol && arr[4] === symbol && arr[8] === symbol) {
        return true;
      }

      if (arr[2] === symbol && arr[4] === symbol && arr[6] === symbol) {
        return true;
      }

      return false;
    }

    return { name, symbol, getScore, giveScore, makeMove };
  }

  function startGame(name1, name2) {
    let player1 = createPlayer(name1, "X");
    let player2 = createPlayer(name2, "O");
    restart();
    return [player1, player2];
  }

  function restart() {
    arr = [];
    arr = Array(9).fill(state.none);
  }

  return { startGame, restart };
})();

const dom = (function () {
  const PLAY = document.querySelector(".play");
  const PLAYER1 = document.querySelector("#player1");
  const PLAYER2 = document.querySelector("#player2");
  const MENU = document.querySelector("#menu");
  const GAME = document.querySelector("#game");
  const CELLS = document.querySelectorAll(".cell");
  const PLAYER1DISPLAY = document.querySelector("#player1Display");
  const PLAYER2DISPLAY = document.querySelector("#player2Display");
  const RESTART = document.querySelectorAll(".restart");
  const DIALOG = document.querySelector(".dialog");

  let [player1, player2] = [];
  let currentPlayer;

  function addEvents() {
    PLAY.addEventListener("click", () => {
      if (
        PLAYER1.value.trim().length === 0 ||
        PLAYER2.value.trim().length === 0
      ) {
        alert("Both players must contain a name");
        return;
      }

      MENU.classList.toggle("hide");
      GAME.classList.toggle("hide");
      [player1, player2] = GameObject.startGame(PLAYER1.value, PLAYER2.value);
      currentPlayer = player1;
      PLAYER1DISPLAY.textContent = player1.name;
      PLAYER2DISPLAY.textContent = player2.name;
    });

    CELLS.forEach((cell) => {
      cell.addEventListener("click", () => {
        try {
          const result = currentPlayer.makeMove(cell.id, cell);
          if (result) {
            DIALOG.showModal();
            DIALOG.firstChild.textContent = currentPlayer.name;
          }
          currentPlayer === player1
            ? (currentPlayer = player2)
            : (currentPlayer = player1);
        } catch (e) {
          console.log(e);
        }
      });
    });

    RESTART.forEach((btn) => {
      btn.addEventListener("click", () => {
        player1 = null;
        player2 = null;
        GameObject.restart();
        PLAYER1.value = "";
        PLAYER2.value = "";
        CELLS.forEach((cell) => {
          cell.firstChild.src = "";
        });
        DIALOG.close();
        MENU.classList.toggle("hide");
        GAME.classList.toggle("hide");
      });
    });
  }

  return { addEvents };
})();

dom.addEvents();
