// See this: http://codeincomplete.com/posts/javascript-tetris/ for better shapes (solves rotation problem)

// Better shapes for rotation
// Each rotation kind can be represented as an 16bit int (4 times 4 grid for shapes)
// To rotate we only have to switch the index to the blocks array
var i = { blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan'   };
var j = { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'   };
var l = { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' };
var o = { blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' };
var s = { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'  };
var t = { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' };
var z = { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'    };

// This function iterates every cell at the tetris board that is covered by the shape
// and call the callback cb for each cell with row/col parameters
function eachblock(type, x, y, dir, cb) {
  var bit, result, row = 0, col = 0, blocks = type.blocks[dir];
  for(bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
    if (blocks & bit) {
      cb(x + col, y + row);
    }
    if (++col === 4) {
      col = 0;
      ++row;
    }
  }
};

// Whether a piece can be placed at a position or not
function occupied(type, x, y, ox, oy, dir, oldDir, board) {
  var newCells = [];
  eachblock(type, x, y, dir, function(x, y) {
		newCells.push({ x, y });
  });
  
  var oldCells = [];
  eachblock(type, ox, oy, oldDir, function(nx, ny) {
		oldCells.push({x: nx, y: ny });
  });
  
  var diffCells = [];
  for (var i = 0; i < newCells.length; i++) {
	  var isDiff = true;
	  for (var j = 0; j < oldCells.length; j++) {
			if (oldCells[j].x === newCells[i].x && oldCells[j].y === newCells[i].y) {
				isDiff = false;
				break;
			}
	  }
	  
	  if (isDiff) {
		  diffCells.push({ x: newCells[i].x, y: newCells[i].y});
	  }
  }

  for (var c = 0; c < diffCells.length; c++) {
	  if ((diffCells[c].x < 1) || (diffCells[c].x >= 11) || 
	      (diffCells[c].y < 1) || (diffCells[c].y >= 21) || 
		  board.cellAt(diffCells[c].x, diffCells[c].y).color !== 'black') {
				return true;  
		  }
  }
  
  return false;
};

function unoccupied(type, x, y, ox, oy, dir, oldDir, board) {
  return !occupied(type, x, y, ox, oy, dir, oldDir, board);
};

var shapes = [i, j, l, o, s, t, z];