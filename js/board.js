class Board {
	constructor(cols, rows, width, height) {
		this.cols = cols + 2;
		this.rows = rows + 2;
		this.board_width = width;
		this.board_height = height;
		this.board = [];
	}
	
	init() {
		console.log('Board initialized ...');
		
		for (var y = 0; y < this.rows; y++) {
			this.board[y] = [];
			for (var x = 0; x < this.cols; x++) {
				if (y === 0 || y === this.rows - 1 || x === 0 || x === this.cols - 1) {
					this.board[y][x] = -1; // outer borders
				} else {
					this.board[y][x] = 0; // real board
				}
			}
		}
	}
	
	setCell(x, y, value) {
		this.board[y][x] = value;
	}
	
	cellAt(x, y) {
		return this.board[y][x];
	}
	
	clearRow(row) {
		if (row >= 0 && row < this.rows) {
			for (var x = 0; x < cols; x++) {
				this.board[row][x] = 0;
			}	
		}
	}
	
	getBlockDimensions() {
		return { w: this.board_width / this.cols, h: this.board_height / this.rows };
	}
	
	asArray() {
		return this.board;
	}
};