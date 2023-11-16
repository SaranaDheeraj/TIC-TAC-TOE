let currentPlayer = 'X';
let color = 'red';

const cells = document.querySelectorAll('.col-4');
const turn = document.querySelector('.turn');
const body = document.body;
const resultMessage = document.querySelector('.result-message');
const resetButton = document.querySelector('.reset-button');
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];

turn.style.color = 'red';

function checkWinner() {
  return winningCombinations.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
  });
}

function updateBodyColor(winner) {
  body.style.backgroundColor = winner === 'X' ? '#ff6b6b' : '#74c0fc';
}

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  body.style.backgroundColor = ''; 
  resultMessage.textContent = '';
}

function isBoardFull() {
  return Array.from(cells).every(box => box.textContent !== '');
}

cells.forEach((box) => {
  box.addEventListener('click', () => {
    if (box.textContent === '') {
      box.textContent = currentPlayer;
      box.style.color = color;
      color = color === 'red' ? 'blue' : 'red';
      turn.style.color = color;
      if (checkWinner()) {
        updateBodyColor(currentPlayer);
        resultMessage.textContent = `${currentPlayer} wins!`;
        resetButton.style.display = 'block';
      } else if (isBoardFull()) {
        resultMessage.textContent = 'It\'s a draw!';
        resetButton.style.display = 'block';
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turn.textContent = currentPlayer;
      }
    }
  });
});

resetButton.addEventListener('click', () => {
  resetGame();
  resultMessage.textContent = ''; 
  resetButton.style.display = 'none'; 
  turn.style.color='red';
  color='red';
});
