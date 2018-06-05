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


var desenhar_pontos = true;
var desenhar_poligonal = true;
var desenhar_curva = true;

//Função que desenha os pontos e linhas de controle
function desenharControle(){

	//Parte para desenhar os pontos
	if(desenhar_pontos){
		var i;
		for(i=0; i<pontos_controle.length; i++){
			circulo.beginPath();
			circulo.arc(pontos_controle[i][1], pontos_controle[i][2], 5, 0, 2 * Math.PI);
			circulo.fillStyle = "#ff0000";
			circulo.fill();
			circulo.stroke();
		}
	}
	//parte para desenhar as linhas
	if(desenhar_poligonal){
		var j;
		for(j=0; j<linhas_controle.length; j++){
			linha.beginPath();
			linha.moveTo(linhas_controle[j][1][0],linhas_controle[j][1][1]);
			linha.lineTo(linhas_controle[j][2][0],linhas_controle[j][2][1]);
			linha.strokeStyle = "#ff0000";
			linha.stroke();
		}
	}
	//parte para desenhar a curva de bezier
	if(desenhar_curva){
		var k;
		for(k=0; k<linha_bezier.length; k++){
			linha.beginPath();
			linha.moveTo(linha_bezier[k][1][0],linha_bezier[k][1][1]);
			linha.lineTo(linha_bezier[k][2][0],linha_bezier[k][2][1]);
			linha.strokeStyle = "#ffff00";
			linha.stroke();
		}
	}

}


function Redesenhar(){
	circulo.clearRect(0,0,canvas.width, canvas.height);
	linha_bezier.length = 0;
	ponto_bezier.length = 0;
	criarCurvaBezier(interacoes);
	desenharControle();
}