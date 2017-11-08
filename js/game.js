class Game {
	constructor() {
		this.board = new Board(10, 20);
		this.lastFrameTime = 0;
		this.spawnX = 6;
		this.spawnY = 2;
		this.shapeX = 0;
		this.shapeY = 0;
		this.currentShape = null;
	}
	
	init() {
		this.board.init();
		
		var currentBoard = this.board.asArray();
		// Initially draw the whole board once, later only update rectangles
		for (var y = 0; y < currentBoard.length; y++) {
			var row = currentBoard[y];
			for (var x = 0; x < row.length; x++) {
				var cellValue = currentBoard[y][x];
				if (cellValue.val === -1) {
					renderer.drawCell(x, y, 'grey', 'black');
				} else if (cellValue.val === 0) {
					renderer.drawCell(x, y, 'black', 'black');
				}
			}
		}
	}
	
	spawnShape() {
		var s = Math.floor(Math.random() * (shapes.length - 1 + 1) + 0);
		this.currentShape = shapes[s];
		for (var i = 0; i < 4; i++) {
			this.board.setCell(
				this.spawnX + this.currentShape.cells[i][0], 
				this.spawnY + this.currentShape.cells[i][1], 
				{ val: this.currentShape.id(), dirty: true }
			);
		}
		this.shapeX = this.spawnX;
		this.shapeY = this.spawnY;
	}
	
	canMove(x_offset, y_offset) {
		var diffCells = [];
		var isDiff = true;
		for (var i = 0; i < 4; i++) {
			isDiff = true;
			var newX = this.shapeX + x_offset + this.currentShape.cells[i][0];
			var newY = this.shapeY + y_offset + this.currentShape.cells[i][1];
			
			for (var j = 0; j < 4; j++) {
				var oldX = this.shapeX + this.currentShape.cells[j][0];
				var oldY = this.shapeY + this.currentShape.cells[j][1];
				
				if (oldX === newX && oldY === newY) {
					isDiff = false;
					break;
				}
			}
			
			if (isDiff) {
				var cell = this.board.cellAt(newX, newY);
				diffCells.push(cell);	
			}
		}
		
		for (var c = 0; c < diffCells.length; c++) {
			if(diffCells[c].val !== 0) {
				return false;
			}
		}
			
		return true;
	}
	
	moveShape(x_offset, y_offset) {
		// Clear out the invalid rectangles (the ones of the current shape)
		for (var i = 0; i < 4; i++) {
			this.board.setCell(
				this.shapeX + this.currentShape.cells[i][0], 
				this.shapeY + this.currentShape.cells[i][1],
				{ val: 0, dirty: true }
			);
		}
		// Move the shape down one line
		this.shapeX += x_offset;
		this.shapeY += y_offset;
		// Draw the cells of the new shape position
		for (var i = 0; i < 4; i++) {
			this.board.setCell(
				this.shapeX + this.currentShape.cells[i][0],  
				this.shapeY + this.currentShape.cells[i][1],
				{ val: this.currentShape.id(), dirty: true }
			);
		}
	}
	
	left() {
		if (this.canMove(-1, 0)) {
			this.moveShape(-1, 0);
			this.draw(renderer);
		}
	}
	
	right() {
		if (this.canMove(1, 0)) {
			this.moveShape(1, 0);
			this.draw(renderer);
		}
	}
	
	tick(dt) {
		if (!this.currentShape) {
			this.spawnShape();
		} else {
			if (this.canMove(0, 1)) {
				this.moveShape(0, 1);
			} else {
				// TODO: Check for rows to clear or end game if we exceed space
				this.currentShape = null;
			}
		}
	}
	
	draw(renderer) {
		var currentBoard = this.board.asArray();
		// Initially draw the whole board once, later only update rectangles
		for (var y = 0; y < currentBoard.length; y++) {
			var row = currentBoard[y];
			for (var x = 0; x < row.length; x++) {
				var cellValue = currentBoard[y][x];
				// Only redraw dirty cells
				if (cellValue.val !== -1 && cellValue.dirty) {
					renderer.drawCell(x, y, shapeColors[cellValue.val], 'black');
					this.board.setCell(x, y, { val: cellValue.val, dirty: false });
				}
			}
		}
	}
	
	getBoard() {
		return this.board.asArray();
	}
}