const getBorderStyling = (col, row) => {
  return {
    cell1: col === 0 && row === 0,
    cell2: col === 0 && row === 1,
    cell3: col === 0 && row === 2,
    cell4: col === 1 && row === 0,
    cell5: col === 1 && row === 1,
    cell6: col === 1 && row === 2,
    cell7: col === 2 && row === 0,
    cell8: col === 2 && row === 1,
    cell9: col === 2 && row === 2,
  };
};

export default getBorderStyling;
