var board = new Board(10, 20, 300, 600);

$(document).ready(function() {
	board.init();
	
	var currentBoard = board.asArray();
	var blockDimensions = board.getBlockDimensions();
	
	var currentShape = shapes[0];
	for (var i = 0; i < 4; i++) {
		board.setCell(5 + currentShape.cells[i][0] + 1, 0 + currentShape.cells[i][1] + 1, currentShape.id());
	}
	
	for (var y = 0; y < currentBoard.length; y++) {
		var row = currentBoard[y];
		for (var x = 0; x < row.length; x++) {
			var cellValue = currentBoard[y][x];
			if (cellValue === -1) {
				drawBlock(x, y, blockDimensions.w, blockDimensions.h, 'grey', 'black');
			} else if (cellValue === 0) {
				drawBlock(x, y, blockDimensions.w, blockDimensions.h, 'black', 'black');
			} else {
				drawBlock(x, y, blockDimensions.w, blockDimensions.h, shapeColors[cellValue], 'black');
			}
		}
	}
});