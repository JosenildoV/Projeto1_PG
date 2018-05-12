var canvas = document.getElementById('meuCanvas');

var circulo = canvas.getContext('2d');

var circulos = [];
var i=0;

function criarPonto(circuloX, circuloY){
	circulo.beginPath();
	circulo.arc(circuloX, circuloY, 5, 0, 2 * Math.PI);
	circulo.fillStyle = "#000000";
	circulo.fill();
	circulo.stroke();
	circulos.push(circulo);
	i=i+1;
}

canvas.addEventListener('click', function(e){
	criarPonto(e.offsetX, e.offsetY);
});
