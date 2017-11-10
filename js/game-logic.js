var renderer = new Renderer(10, 20);
var tetris = new Game();
var tickTime = 0;
var dropTime = 0.5;
var menuHidden = true;

$('#help').click(function() {
	if (menuHidden) {
		$('#rotate').css('opacity', 0.15);
		$('#left').css('opacity', 0.15);
		$('#right').css('opacity', 0.15);
		$('#down').css('opacity', 0.15);
		menuHidden = false;
	} else {
		$('#rotate').css('opacity', 0);
		$('#left').css('opacity', 0);
		$('#right').css('opacity', 0);
		$('#down').css('opacity', 0);
		menuHidden = true;
	}
});

$(document).keydown(function(e) {
    switch(e.which) {
		case 37: // left
			tetris.left();
        break;

		case 38: // up
			tetris.rotate();
        break;

		case 39: // right
			tetris.right();
        break;

		case 40: // down
			dropTime = 0.05;
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

$(document).keyup(function(e) {
    switch(e.which) {
		case 40: // down
			dropTime = 0.5;
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

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

$('#down').on('touchstart', function(e) {
	e.preventDefault();
	dropTime = 0.05;
});

$('#down').on('touchend', function() {
	dropTime = 0.5;
});

$('#controller').on('touched', function() {
	if (!tetris.running) {
		tetris.init();
	}
})

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