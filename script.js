
function resizeCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
}

function resizeToFit() {
    var width = parseFloat(window.getComputedStyle(canvas).width);
    var height = parseFloat(window.getComputedStyle(canvas).height);
    resizeCanvas(width, height);
}

var canvas = document.getElementById('meuCanvas');

var circulo = canvas.getContext('2d');
var linha = canvas.getContext('2d');

resizeToFit();

var circulos = [];
var i=0;

function criarPonto(circuloX, circuloY){
	circulo.beginPath();
	circulo.arc(circuloX, circuloY, 5, 0, 2 * Math.PI);
	circulo.fillStyle = "#ff0000";
	circulo.fill();
	circulo.stroke();
	circulos.push([circulo,circuloX,circuloY]);
	i=i+1;
	if(circulos.length>1){
		criarLinha(circulos[i-2],circulos[i-1]);
	}
}

function criarLinha(circulo1,circulo2){
	linha.beginPath();
	linha.moveTo(circulo1[1],circulo1[2]);
	linha.lineTo(circulo2[1],circulo2[2]);
	linha.strokeStyle = "#ff0000";
	linha.stroke();
}

canvas.addEventListener('click', function(e){
	criarPonto(e.offsetX, e.offsetY);
});
