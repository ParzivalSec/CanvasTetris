var renderer = new Renderer(10, 20);
var tetris = new Game();
var tickTime = 0;
var dropTime = 0.5;

// Controller related action handlers
$('#rotate').click(function() {
	tetris.rotate();
});

$('#left').click(function() {
	tetris.left();
});

$('#right').click(function() {
	tetris.right();
});

$('#down').on('touchstart', function() {
	dropTime = 0.05;
});

$('#down').on('touchend', function() {
	dropTime = 0.5;
});

$(document).ready(function() {
	tetris.init();
	
	tetris.lastFrameTime = performance.now();
    // console.log(tetris.lastFrameTime)
    window.requestAnimationFrame(Loop);
});

function Loop(timeStamp) {
	var dt = (timeStamp - tetris.lastFrameTime) / 1000;
   
	if (tickTime >= dropTime) {
	    tetris.tick(dt);
		tetris.draw(renderer);
		tickTime = 0;		
	}
	
	tickTime += dt;
    tetris.lastFrameTime = timeStamp;
    window.requestAnimationFrame(Loop);
}