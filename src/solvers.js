/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution; 
  var traverse = function(depth, rowIndex, colIndex ) {
    if (board.hasAnyRooksConflicts()) { 
      board.togglePiece(rowIndex, colIndex);
      return; 
    }
    
    if (depth === n) {
      solution = board.rows();
      return;
    }
    
    var i = 0;
    while ( i < n && !solution) {
      board.togglePiece(depth, i);
      traverse(depth + 1, depth, i);
      i++;
    }
  
    if (depth !== 0 && !solution) { 
      board.togglePiece(rowIndex, colIndex); 
      return;
    }
  };
  
  traverse(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0; 
  
  var traverse = function(depth, rowIndex, colIndex) {
    if (board.hasColConflictAt(colIndex)) { 
      board.togglePiece(rowIndex, colIndex);
      return;
    }
    
    if (depth === n) {
      solutionCount++;
      board.togglePiece(rowIndex, colIndex);
      return;
    }
  
    for (var i = 0; i < n; i++) { 
      board.togglePiece(depth, i);
      traverse(depth + 1, depth, i);
    }
    
    if (depth !== 0) { 
      board.togglePiece(rowIndex, colIndex); 
      return;
    }
  };
  
  traverse(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution;  
  
  var traverse = function(depth, rowIndex, colIndex) {
    if (board.hasAnyQueensConflicts()) { 
      board.togglePiece(rowIndex, colIndex);
      return; 
    }
    
    if (depth === n && !solution) {
      solution = board.rows();
      return;
    }
     
    var i = 0;
    while (i < n && !solution) {
      board.togglePiece(depth, i);
      traverse(depth + 1, depth, i);
      i++;
    }
    
    if (depth !== 0 && !solution) { 
      board.togglePiece(rowIndex, colIndex); 
      return;
    }
  };
  
  if (n === 2 || n === 3) {
    solution = board.rows();
  } else {
    traverse(0);
  }
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) { return 1; }
  
  var board = new Board({n: n});
  var solutionCount = 0; 
  
  var traverse = function(depth, rowIndex, colIndex) {
    rowIndex = rowIndex || 0;
    colIndex = colIndex || 0;
    if (board.hasAnyQueenConflictsOn(rowIndex, colIndex)) { 
      board.togglePiece(rowIndex, colIndex);
      return; 
    }
    
    if (depth === n) {
      solutionCount++;
      board.togglePiece(rowIndex, colIndex);
      return;
    }
  
    for (var i = 0; i < n; i++) { 
      board.togglePiece(depth, i);
      traverse(depth + 1, depth, i);
    }
    
    if (depth !== 0) { 
      board.togglePiece(rowIndex, colIndex); 
      return;
    }
  };
  
  traverse(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
