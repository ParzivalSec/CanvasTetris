var cols = 10, rows = 20;
var board = [];
var currentShape;
var shapes = [
	[{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], // straight line
	[{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }], // square
	[{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }], // tee
	[{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }], // L normal
	[{ x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }], // L mirrored
	[{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }], // zig-zag normal
	[{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }] // zig-zag mirrored
];

function spawnShape() {
	var nextShape = shapes[Math.floor(Math.random() * shapes.length)];
	currentShape = nextShape;
}

function init() {
	for (var y = 0; y < rows; y++) {
		board[y] = [];
		for (var x = 0; x < cols; x++) {
			board[y][x] = 0;
		}
	}
}

init();
spawnShape();