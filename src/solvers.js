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
  var emptyboard = new Board({n: n});
  var solution = null; 
  
  
  var traverse = function(depth, board) {
    if (board.hasAnyRooksConflicts()) { return; }
    
    if (solution !== null) { return; }
    
    if (depth === n) {
      solution = board.rows();
      return;
    }
    
    var colIndex = 0;
    while (colIndex < n && solution === null) {
      var matrix = [];
      for (var i = 0; i < n; i++) {
        matrix.push(board.get(i).slice());
      }
      var subBoard = new Board(matrix);
      subBoard.togglePiece(depth, colIndex);
      traverse(depth + 1, subBoard);
      colIndex++;
    }
  
    // for (var i = 0; i < n; i++) { 
    //   var matrix = [];
    //   for (var j = 0; j < n; j++) {
    //     matrix.push(board.get(j).slice());
    //   }
    //   var subBoard = new Board(matrix);
    //   subBoard.togglePiece(depth, i);
    //   traverse(depth + 1, subBoard);
    // }
  };
  
  traverse(0, emptyboard);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var emptyboard = new Board({n: n});
  var solutionCount = 0; 
  
  var traverse = function(depth, board) {
    if (board.hasAnyRooksConflicts()) { return; }
    
    if (depth === n) {
      solutionCount++;
      return;
    }
  
    for (var i = 0; i < n; i++) { 
      var matrix = [];
      for (var j = 0; j < n; j++) {
        matrix.push(board.get(j).slice());
      }
      var subBoard = new Board(matrix);
      subBoard.togglePiece(depth, i);
      traverse(depth + 1, subBoard);
    }
  };
  
  traverse(0, emptyboard);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var emptyboard = new Board({n: n});
  var solution = null; 
  
  
  var traverse = function(depth, board) {
    if (board.hasAnyQueensConflicts()) { return; }
    
    if (solution !== null) { return; }
    
    if (depth === n) {
      solution = board.rows();
      return;
    }
    
    var colIndex = 0;
    while (colIndex < n && solution === null) {
      var matrix = [];
      for (var i = 0; i < n; i++) {
        matrix.push(board.get(i).slice());
      }
      var subBoard = new Board(matrix);
      subBoard.togglePiece(depth, colIndex);
      traverse(depth + 1, subBoard);
      colIndex++;
    }
  };
  
  traverse(0, emptyboard);
  
  if (n === 2 || n === 3) {
    solution = emptyboard.rows();
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var emptyboard = new Board({n: n});
  var solutionCount = 0; 
  
  var traverse = function(depth, board) {
    if (board.hasAnyQueensConflicts()) { return; }
    
    if (depth === n) {
      solutionCount++;
      return;
    }
  
    for (var i = 0; i < n; i++) { 
      var matrix = [];
      for (var j = 0; j < n; j++) {
        matrix.push(board.get(j).slice());
      }
      var subBoard = new Board(matrix);
      subBoard.togglePiece(depth, i);
      traverse(depth + 1, subBoard);
    }
  };
  
  traverse(0, emptyboard);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
