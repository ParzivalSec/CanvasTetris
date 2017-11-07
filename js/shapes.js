var shapeColors = ['black', 'green', 'blue', 'red', 'yellow', 'cyan', 'magenta', 'orange'];

class Shape {
	constructor(cell_offsets, shapeId) {
		this.shapeId = shapeId;
		this.cells = cell_offsets;
	}
	
	setOrigin(origin_x, origin_y) {
		this.cx = origin_x;
		this.cy = origin_y;
	}
	
	cells() {
		return this.cells;
	}
	
	id() {
		return this.shapeId;
	}
}

var shapes = [
	new Shape([[-1, 0], [0, 0], [1, 0], [2, 0]], 1), // straight line
	new Shape([[-1, 0], [0, 0], [-1, 1], [0, 1]], 2), // square
	new Shape([[-1, 0], [0, 0], [0, 1], [1, 0]], 3), // tee
	new Shape([[-1, 0], [0, 0], [1, 0], [1, 1]], 4), // L normal
	new Shape([[-1, 0], [-1, 1], [0, 0], [1, 0]], 5), // L mirrored
	new Shape([[-1, 0], [0, 0], [0, 1], [1, 1]], 6), // zig-zag normal
	new Shape([[-1, 1], [0, 1], [0, 0], [1, 0]], 7) // zig-zag mirrored
];