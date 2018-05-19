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

//Função que cria as linhas para os pontos de controle
function criarLinhaControle(circulo1,circulo2){
	linha.beginPath();
	linha.moveTo(circulo1[1],circulo1[2]);
	linha.lineTo(circulo2[1],circulo2[2]);
	linha.strokeStyle = "#ff0000";
	linhas_controle.push([linha,[circulo1[1],circulo1[2]],[circulo2[1],circulo2[2]]]);
	linha.stroke();
}

//Função que exclui uma linha que está ligada a um ponto de controle
function excluirLinhaControle(pontoX,pontoY){
	var i;
	for(i=linhas_controle.length-1; i>=0;i--){
		if(i==linhas_controle.length-1 && (pontoX == linhas_controle[i][2][0] &&
						pontoY == linhas_controle[i][2][1])){
			linhas_controle.splice(i,1);
		}else if(pontoX == linhas_controle[i][1][0] && pontoY == linhas_controle[i][1][1]){
			if(i>0){
				linhas_controle[i-1][2]=linhas_controle[i][2];
			}
			linhas_controle.splice(i,1);
		}
	}
}

//Função que exclui um ponto de controle do array
function excluirPontoControle(mouseX, mouseY){
	var i;	
	for(i=pontos_controle.length-1; i>=0; i--){
		if(mouseX<(pontos_controle[i][1]+5) && mouseX>(pontos_controle[i][1]-5)){
			if(mouseY<(pontos_controle[i][2]+5) && mouseY>(pontos_controle[i][2]-5)){
				excluirLinhaControle(pontos_controle[i][1],pontos_controle[i][2]);
				pontos_controle.splice(i,1);
				qtd_pontos_controle--;
			}
		}
	}
	desenharControle();
}

//Função que desenha os pontos e linhas de controle
function desenharControle(){

	//Parte para desenhar os pontos
	var i;
	for(i=0; i<pontos_controle.length; i++){
		circulo.beginPath();
		circulo.arc(pontos_controle[i][1], pontos_controle[i][2], 5, 0, 2 * Math.PI);
		circulo.fillStyle = "#ff0000";
		circulo.fill();
		circulo.stroke();
	}

	//parte para desenhar as linhas
	var j;
	for(j=0; j<linhas_controle.length; j++){
		linha.beginPath();
		linha.moveTo(linhas_controle[j][1][0],linhas_controle[j][1][1]);
		linha.lineTo(linhas_controle[j][2][0],linhas_controle[j][2][1]);
		linha.strokeStyle = "#ff0000";
		linha.stroke();
	}

}

//Evento de click no canvas para a criação de um ponto de controle
canvas.addEventListener('click', function(e){
	criarPontoControle(e.offsetX, e.offsetY);
});

//Evento de click com o botão direito do mouse no canvas para excluir um ponto de controle
canvas.addEventListener('contextmenu', function(e){
	circulo.clearRect(0,0,canvas.width, canvas.height);
	excluirPontoControle(e.offsetX, e.offsetY);
});
