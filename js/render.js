class Renderer {
	constructor(cols, rows) {
		var canvas = $('#board');
		// Setup a mobile fullscreen canvas
		canvas[0].width = window.innerWidth;
		canvas[0].height = window.innerHeight;
		
		this.width = canvas.width();
		this.height = canvas.height();

		
		this.renderCtx = canvas[0].getContext('2d');
		this.cell_width = this.width / (cols + 2);
		this.cell_height = this.height / (rows + 2);
	}
	
	drawCell(x, y, fillColor, strokeColor) {
		this.renderCtx.fillStyle = fillColor;
		this.renderCtx.strokeStyle = strokeColor;
		this.renderCtx.fillRect(x * this.cell_width, y * this.cell_height, this.cell_width, this.cell_height);
		this.renderCtx.strokeRect(x * this.cell_width, y * this.cell_height, this.cell_width, this.cell_height);
	}
	
	clearCell(x, y, fillColor, strokeColor) {
		this.renderCtx.fillStyle = fillColor;
		this.renderCtx.strokeStyle = strokeColor;
		this.renderCtx.fillRect(x * this.cell_width, y * this.cell_height, this.cell_width, this.cell_height);
		this.renderCtx.strokeRect(x * this.cell_width, y * this.cell_height, this.cell_width, this.cell_height);
	}
}