const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getColumn = (index) => {
  switch (true) {
    case index >= 0 && index <= 2:
      return 0;
    case index > 2 && index <= 5:
      return 1;
    case index > 5 && index <= 8:
      return 2;
    default:
      return null;
  }
};

const playComputer = ({ board, validateMove }) => {
  // flatten the board
  const flat = board.reduce((data, value) => [...data, ...value], []);

  // set playable indexes
  const playables = [...Array(flat.length).keys()];

  // set the last playable index (exclusive)
  let endingIndex = flat.length;

  // remove unplayable indexes from consideration
  // 1. start at the end of the flattened board
  // 2. move unplayable indexes to the end of the playables array
  // 3. update the value of the last playable index
  for (let i = flat.length - 1; i >= 0; i--) {
    if (typeof flat[i] === "string") {
      playables.push(playables.splice(i, 1)[0]);
      endingIndex--;
    }
  }

  // get a random playable index
  const randomIndex = getRandomNumber(0, endingIndex);
  const index = playables[randomIndex];

  // get the playable cell on the board
  const col = getColumn(index);
  const row = index % 3;
  const cell = [col, row];

  // play the move
  validateMove(board[col][row], cell);
};

export default playComputer;
