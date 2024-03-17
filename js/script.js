const GameObject = (function () {
  const state = Object.freeze({
    none: "",
    x: "X",
    o: "O",
  });

  let arr = Array(9).fill(state.none);

  function createPlayer(name, symbol) {
    let score = 0;

    const getScore = () => score;
    const giveScore = () => score++;

    const makeMove = (index) => {
      if (arr[index] === state.none) {
        arr[index] = symbol;
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

  let player1;
  let player2;

  function startGame(name1, name2) {
    player1 = createPlayer(name1, "X");
    player2 = createPlayer(name2, "O");
    //From here and on is just for testing that it works in the console
    let result = false;
    for (let i = 0; i < 9; i++) {
      const choise = i % 2 === 0 ? prompt("player1") : prompt("player2");
      try {
        result =
          i % 2 === 0 ? player1.makeMove(choise) : player2.makeMove(choise);
      } catch (e) {
        alert(e);
        i--;
      }
      if (result) {
        i % 2 === 0 ? alert("player1 wins") : alert("player2 wins");
        break;
      }
    }
    if (!result) alert("Tie!!!");
  }

  return { startGame };
})();

GameObject.startGame("a", "b");
