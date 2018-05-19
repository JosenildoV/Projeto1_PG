//função para mudanças no tamanho do canvas
function resizeCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
}

//função para definir o canvas no tamanho da tela no navegador
function resizeToFit() {
    var width = parseFloat(window.getComputedStyle(canvas).width);
    var height = parseFloat(window.getComputedStyle(canvas).height);
    resizeCanvas(width, height);
}

var canvas = document.getElementById('meuCanvas');

var circulo = canvas.getContext('2d');
var linha = canvas.getContext('2d');

resizeToFit();

var linhas_controle = [];//Array que guarda as linhas que ligam os pontos de controle
var pontos_controle = [];//Array que guarda os pontos de controle que são criados
var qtd_pontos_controle=0;

//Função que cria os pontos de controle e os guarda no array
function criarPontoControle(mouseX, mouseY){
	circulo.beginPath();
	circulo.arc(mouseX, mouseY, 5, 0, 2 * Math.PI);
	circulo.fillStyle = "#ff0000";
	circulo.fill();
	circulo.stroke();
	pontos_controle.push([circulo,mouseX,mouseY]);
	qtd_pontos_controle++;
	if(pontos_controle.length>1){
		criarLinhaControle(pontos_controle[qtd_pontos_controle-2],
					pontos_controle[qtd_pontos_controle-1]);
	}
}

//Função que cria as linhas dara os pontos de controle
function criarLinhaControle(circulo1,circulo2){
	linha.beginPath();
	linha.moveTo(circulo1[1],circulo1[2]);
	linha.lineTo(circulo2[1],circulo2[2]);
	linha.strokeStyle = "#ff0000";
	linhas_controle.push([linha,[circulo1[1],circulo1[2]],[circulo2[1],circulo2[2]]]);
	linha.stroke();
}

//Evento de click no canvas para a criação de um ponto de controle
canvas.addEventListener('click', function(e){
	criarPontoControle(e.offsetX, e.offsetY);
});
