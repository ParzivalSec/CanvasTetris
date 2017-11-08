class Board {
	constructor(cols, rows) {
		this.cols = cols + 2;
		this.rows = rows + 2;
		this.board = [];
	}
	
	init() {
		console.log('Board initialized ...');
		
		for (var y = 0; y < this.rows; y++) {
			this.board[y] = [];
			for (var x = 0; x < this.cols; x++) {
				if (y === 0 || y === this.rows - 1 || x === 0 || x === this.cols - 1) {
					this.board[y][x] = { val: -1, dirty: false }; // outer borders
				} else {
					this.board[y][x] = { val: 0, dirty: false }; // real board
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
				this.board[row][x] = { val: 0, dirty: true };
			}	
		}
	}
	
	asArray() {
		return this.board;
	}
};