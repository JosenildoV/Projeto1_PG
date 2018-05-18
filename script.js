var canvas = document.getElementById('meuCanvas');

var circulo = canvas.getContext('2d');
var linha = canvas.getContext('2d');
var circulos = [];
var i=0;

function criarPonto(circuloX, circuloY){
	circulo.beginPath();
	circulo.arc(circuloX, circuloY, 5, 0, 2 * Math.PI);
	circulo.fillStyle = "#000000";
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
	linha.stroke();
}

canvas.addEventListener('click', function(e){
	criarPonto(e.offsetX, e.offsetY);
});
