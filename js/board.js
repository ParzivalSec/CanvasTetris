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
					this.board[y][x] = { color: 'grey', dirty: false }; // outer borders
				} else {
					this.board[y][x] = { color: 'black', dirty: false }; // real board
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
	
	isRowFull(row) {
		var full = false;
		
		if (row >= 0 && row < this.rows) {
			full = true;
			for (var x = 1; x < this.cols - 1; x++) {
				if (this.board[row][x].color === 'black') {
					full = false;
				}
			}			
		}

		return full;
	}
	
	clearRow(row) {
		if (row >= 0 && row < this.rows) {
			for (var x = 1; x < this.cols - 1; x++) {
				this.board[row][x] = { color: 'black', dirty: true };
			}	
		}
		
		for (var y = this.rows - 2; y >= 1; y--) {
			for (var x = 1; x < this.cols - 1; x++) {				
				if (this.board[y][x].color === 'black' && this.board[y - 1][x].color === 'black')
				{
					// Do nothing
				}
				else if (this.board[y][x].color === 'black' && this.board[y - 1][x].color !== 'black')
				{
					this.board[y][x] = { color: this.board[y - 1][x].color, dirty: true };
				}
				else {
					this.board[y][x] = { color: this.board[y - 1][x].color, dirty: true };
				}
			}
		}
	}
	
	asArray() {
		return this.board;
	}
};