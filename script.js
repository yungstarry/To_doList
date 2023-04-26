function Player(sign) {
  this.sign = sign;

  const getSign = () => {
    return sign;
  };
  return { getSign };
}

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setField = (index, sign) => {
    if (index > board.length) return;
    board[index] = sign;
  };
  const getField = (index) => {
    if (index > board.length) return;
    return board[index];
  };
  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };
  return { setField, getField, reset };
})();

const displayController = (() => {
  const messageElements = document.getElementById("message");
  const RestartBtn = document.getElementById("restart-button");
  const fieldElement = document.querySelectorAll(".square");

  fieldElement.forEach((field)=>
  field.addEventListener("click", (e) => {
    if (gameController.getIsOver() || e.target.textContent !== "") return;
    gameController.playRound(parseInt(e.target.dataset.index));
    updateGameboard();
  })
  );

  RestartBtn.addEventListener("click", (e) => {
    gameBoard.reset();
    gameController.reset();
    updateGameboard();
    setMessegeElement("Player X's turn");
  });

  const updateGameboard = () => {
    for (let i = 0; i < fieldElement.length; i++) {
      fieldElement[i].textContent = gameBoard.getField(i);
    }
  };

  const setResultMessage = (winner) => {
    if (winner === "Draw") {
      setMessegeElement("it's a draw!");
    } else {
      setMessegeElement(`Player ${winner} has won!`);
    }
  };
  const setMessegeElement = (message) => {
    messageElements.textContent = message;
  };
  return { setResultMessage, setMessegeElement };
})();

const gameController =(() => {
  const playerX = Player('X');
  const playerO = Player('O');
  let round = 1;
  let isOver = false;


  const playRound=(fieldIndex)=>{
    gameBoard.setField(fieldIndex, getCurrentPlayer());
    if (checkWinner(fieldIndex)){
      displayController.setResultMessage(getCurrentPlayer());
      isOver = true;
      return;
    }
    if (round===9){
      displayController.setResultMessage('Draw');
      isOver= true;
      return;
    }
    round++;
    displayController.setMessegeElement(
      `Player ${getCurrentPlayer()}'s turn`
    )
  };
  const getCurrentPlayer = () => {
    return round % 2 === 1? playerX.getSign(): playerO.getSign();
  }

  const checkWinner = (fieldIndex) => {
    const winning_combinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top left to bottom right
      [2, 4, 6], // Diagonal from top right to bottom left
    ];

    return winning_combinations
      .filter((combination) => combination.includes(fieldIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getField(index) === getCurrentPlayer()
        )
      );
  };

  const getIsOver = () => {
    return isOver;
  };

  const reset = () => {
    round = 1;
    isOver = false;
  };

  return { playRound, getIsOver, reset };
})();





