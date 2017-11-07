var canvas = $('#board')[0];
var renderCtx = canvas.getContext('2d');

function drawBlock(x, y, width, height, fillColor, strokeColor) {
	renderCtx.fillStyle = fillColor;
	renderCtx.strokeStyle = strokeColor;
	renderCtx.fillRect(x * width, y * height, width, height);
	renderCtx.strokeRect(x * width, y * height, width, height);
}

function clearBlock(x, y, width, height) {
	renderCtx.fillStyle = 'white';
	renderCtx.strokeStyle = 'white';
	renderCtx.fillRect(x * width, y * height, width, height);
	renderCtx.strokeRect(x * width, y * height, width, height);
}
