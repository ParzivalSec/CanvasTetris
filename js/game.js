class Game {
	constructor() {
		this.board = new Board(10, 20);
		this.lastFrameTime = 0;
		this.spawnX = 6;
		this.spawnY = 1;
		this.shape = { x: 0, y: 0, type: null, rotationIndex: 0 };
		this.running = false;
	}
	
	init() {
		this.running = true;
		this.board.init();
		
		var currentBoard = this.board.asArray();
		// Initially draw the whole board once, later only update rectangles
		for (var y = 0; y < currentBoard.length; y++) {
			var row = currentBoard[y];
			for (var x = 0; x < row.length; x++) {
				var cell = currentBoard[y][x];
				renderer.drawCell(x, y, cell.color, 'black');
			}
		}
	}
	
	lose() {
		this.running = false;
	}
	
	spawnShape() {
		var s = Math.floor(Math.random() * (shapes.length - 1 + 1) + 0);
		this.shape.type = shapes[s];
		console.log(this.shape);
		this.shape.rotationIndex = 0;
		this.shape.x = this.spawnX;
		this.shape.y = this.spawnY;
		
		// Assign this to self variable to capture it in the scope of the callback function
		var self = this;
		eachblock(this.shape.type, 
			this.shape.x, 
			this.shape.y, 
			this.shape.rotationIndex,
			function(x, y) {
				self.board.setCell(x, y, { color: self.shape.type.color, dirty: true });
			}
		);
		
		var ox = this.shape.x, oy = this.shape.y;
		if (occupied(this.shape.type, this.shape.x, this.shape.y + 1, ox, oy, 0, 0, this.board)) {
			var self = this;
			eachblock(this.shape.type, 
				this.shape.x, 
				this.shape.y, 
				this.shape.rotationIndex,
				function(x, y) {
					self.board.setCell(x, y, { color: 'white', dirty: true });
				}
			);
			// If we cannot spawn anymore we hva elost the game
			this.lose();
		}
	}
	
	moveShape(x_offset, y_offset) {
		// Clear out the invalid rectangles (the ones of the current shape)
		var self = this;
		eachblock(this.shape.type, 
			this.shape.x, 
			this.shape.y, 
			this.shape.rotationIndex,
			function(x, y) {
				self.board.setCell(x, y, { color: 'black', dirty: true });
			}
		);
		// Move the shape down one line
		this.shape.x += x_offset;
		this.shape.y += y_offset;
		// Draw the cells of the new shape position
		eachblock(this.shape.type, 
			this.shape.x, 
			this.shape.y, 
			this.shape.rotationIndex,
			function(x, y) {
				self.board.setCell(x, y, { color: self.shape.type.color, dirty: true });
			}
		);
	}
	
	rotateShape(oldDir) {
		// Clear out the invalid rectangles (the ones of the current shape)
		var self = this;
		eachblock(this.shape.type, 
			this.shape.x, 
			this.shape.y, 
			oldDir,
			function(x, y) {
				self.board.setCell(x, y, { color: 'black', dirty: true });
			}
		);
		
		// Draw the cells of the new shape position
		eachblock(this.shape.type, 
			this.shape.x, 
			this.shape.y, 
			this.shape.rotationIndex,
			function(x, y) {
				self.board.setCell(x, y, { color: self.shape.type.color, dirty: true });
			}
		);
	}
	
	left() {
		var ox = this.shape.x, oy = this.shape.y;
		var dir = this.shape.rotationIndex;
		if (unoccupied(this.shape.type, this.shape.x - 1, this.shape.y, ox, oy, dir, dir, this.board)) {
			this.moveShape(-1, 0);
			this.draw(renderer);
		}
	}
	
	right() {
		var ox = this.shape.x, oy = this.shape.y;
		var dir = this.shape.rotationIndex;
		if (unoccupied(this.shape.type, this.shape.x + 1, this.shape.y, ox, oy, dir, dir, this.board)) {
			this.moveShape(1, 0);
			this.draw(renderer);
		}
	}
	
	rotate() {
		var ox = this.shape.x, oy = this.shape.y;
		var oldDir = this.shape.rotationIndex;
		var newDir = this.shape.rotationIndex + 1 > 3 ? 0 : this.shape.rotationIndex + 1;
		if (unoccupied(this.shape.type, this.shape.x, this.shape.y, ox, oy, newDir, oldDir, this.board)) {
			var oldDir = this.shape.rotationIndex;
			this.shape.rotationIndex = newDir;
			this.rotateShape(oldDir);
			this.draw(renderer);
		}
	}
	
	checkRows() {
		var self = this;
		eachblock(this.shape.type, 
			this.shape.x, 
			this.shape.y, 
			this.shape.rotationIndex,
			function(x, y) {
				if (self.board.isRowFull(y)) {
					self.board.clearRow(y);
					self.draw(renderer);
				}
			}
		);
	}
	
	tick(dt) {
		if (this.running) {
			if (!this.shape.type) {
				this.spawnShape();
			} else {
				var ox = this.shape.x, oy = this.shape.y;
				var dir = this.shape.rotationIndex;
				if (unoccupied(this.shape.type, this.shape.x, this.shape.y + 1, ox, oy, dir, dir, this.board)) {
					this.moveShape(0, 1);
				} else {
					// TODO: Check for rows to clear or end game if we exceed space
					this.checkRows();
					this.shape.type = null;
				}
			}
		}
	}
	
	draw(renderer) {
		var currentBoard = this.board.asArray();
		// Initially draw the whole board once, later only update rectangles
		for (var y = 0; y < currentBoard.length; y++) {
			var row = currentBoard[y];
			for (var x = 0; x < row.length; x++) {
				var cell = currentBoard[y][x];
				// Only redraw dirty cells
				if (cell.color != 'grey' && cell.dirty) {
					renderer.drawCell(x, y, cell.color, 'black');
					this.board.setCell(x, y, { color: cell.color, dirty: false });
				}
			}
		}
	}
	
	getBoard() {
		return this.board.asArray();
	}
}