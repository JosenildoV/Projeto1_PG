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

var apertando = false;	//boolean que diz se o mouse esta apertando num ponto de controle
var moveu = false;	//boolean que diz se o mouse se moveu quando apertou o botão esquerdo
var indice;		//inteiro que diz o indice do ponto de controle que se está clicando

var linha_poligonal = [];
var ponto_poligonal = [];

var linha_bezier = [];
var ponto_bezier = [];

//Função que cria os pontos de controle e os guarda no array
function criarPontoControle(mouseX, mouseY){
	pontos_controle.push([circulo,mouseX,mouseY]);
	qtd_pontos_controle++;
	if(pontos_controle.length>1){
		criarLinhaControle(pontos_controle[qtd_pontos_controle-2],
					pontos_controle[qtd_pontos_controle-1]);
		//linha_bezier.length = 0;
		//ponto_bezier.length = 0;
		curvaBezier(5);
	}
}

//Função que cria as linhas para os pontos de controle
function criarLinhaControle(circulo1,circulo2){
	linhas_controle.push([linha,[circulo1[1],circulo1[2]],[circulo2[1],circulo2[2]]]);
	//pontoPoligonal(linhas_controle[linhas_controle.length-1][1],linhas_controle[linhas_controle.length-1][2],0.5, 1,linhas_controle.length);
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
	
	//parte para desenhar a curva de bezier
	var k;
	for(k=0; k<linha_poligonal.length; k++){
		linha.beginPath();
		linha.moveTo(linha_poligonal[k][1][0],linha_poligonal[k][1][1]);
		linha.lineTo(linha_poligonal[k][2][0],linha_poligonal[k][2][1]);
		linha.strokeStyle = "#ffff00";
		linha.stroke();
	}

}

//Função que move o ponto, e linha, de acordo com o mouse
function moverPontoControle(mouseX, mouseY){	

	pontos_controle[indice][1] = mouseX;
	pontos_controle[indice][2] = mouseY;

	if(indice == pontos_controle.length-1){
		linhas_controle[indice-1][2][0] = mouseX;
		linhas_controle[indice-1][2][1] = mouseY;
	}else if(indice == 0){
		linhas_controle[indice][1][0] = mouseX;
		linhas_controle[indice][1][1] = mouseY;
	}else{
		linhas_controle[indice-1][2][0] = mouseX;
		linhas_controle[indice-1][2][1] = mouseY;
		linhas_controle[indice][1][0] = mouseX;
		linhas_controle[indice][1][1] = mouseY;
	}
	
	desenharControle();
}

//Função que verifica se o mouse está clicando em um ponto de controle
function estaNumPonto(mouseX, mouseY){
	var i;
	
	for(i=pontos_controle.length-1; i>=0; i--){
		if(mouseX<(pontos_controle[i][1]+5) && mouseX>(pontos_controle[i][1]-5)){
			if(mouseY<(pontos_controle[i][2]+5) && mouseY>(pontos_controle[i][2]-5)){
				indice = i;
				return true;
			}
		}
	}
	return false;
}

function linhaPoligonal(a,b,t,nivel){
	linha.beginPath();
	linha.moveTo(a[0],a[1]);
	linha.lineTo(b[0],b[1]);
	linha.strokeStyle = "#ffff00";
	linha.stroke();
	linha_poligonal.push([linha,a,b,nivel]);
	
	var i;
	var contador=0;
	for(i=0; i<=linha_poligonal.length-1;i++){
		if(linha_poligonal[i][3]==nivel){
			contador++;
		}
	}
	
	pontoPoligonal(linha_poligonal[linha_poligonal.length-1][1],linha_poligonal[linha_poligonal.length-1][2],t,nivel+1,contador);
	
}

function pontoPoligonal(a,b,t,nivel,contador){
	var x = ((b[0]-a[0])*t)+a[0];
	var y = ((b[1]-a[1])*t)+a[1];
	circulo.beginPath();
	circulo.arc(x, y, 5, 0, 2 * Math.PI);
	circulo.fillStyle = "#ffff00";
	circulo.fill();
	circulo.stroke();
	ponto_poligonal.push([circulo,x,y,t,nivel,contador]);
	
	i=0;
	var cont=0;
	var ponto1;
	var ponto2;
	for(i=ponto_poligonal.length-1;i>=0;i--){
		if(ponto_poligonal[i][4]==nivel){
			if(cont==0){
				ponto2=ponto_poligonal[i];
				cont++;
			}else if(cont==1){
				ponto1=ponto_poligonal[i];
				cont++;
			}
			
		}
	}
	
	if(ponto_poligonal[ponto_poligonal.length-1][5]>1 && nivel< linhas_controle.length){
		linhaPoligonal([ponto1[1],ponto1[2]],
						[ponto2[1],ponto2[2]],t,nivel);
	}
}

function curvaBezier(t){
	var i;
	var j;
	for(i =1;i<t;i++){
		for(j=0;j<linhas_controle.length;j++){
			pontoPoligonal(linhas_controle[j][1],linhas_controle[j][2],(i/t), 1,j+1);
		}
	}
}

/*
function linhaCurvaBezier(inicio,fim){
	linha_bezier.push([linha,[inicio[0],inicio[1]],[fim[0],fim[1]]]);
}

function pontoCurvaBezier(x,y){
	ponto_bezier.push([x, y]);
	if(ponto_bezier.length>1){
		linhaCurvaBezier([ponto_bezier[ponto_bezier.length-2][0],ponto_bezier[ponto_bezier.length-2][1]],[x,y]);
	}
}

function pontoBezier(r,i,t){
	var coord = [];
	if(r==0){
		coord = [pontos_controle[i][1],pontos_controle[i][2]];
	}else{
		var a = pontoBezier(r-1,i,t);
		var b = pontoBezier(r-1,i+1,t);
		coord = [((a[0]*(1-t))+(b[0]*t)),((a[1]*(1-t))+(b[1]*t))];
	}
	return coord;
}

function criarCurvaBezier(numero){
	var t;
	for(t=0; t<=numero;t++){
		var coordenadas = pontoBezier(pontos_controle.length-1,0,(t/numero))
		pontoCurvaBezier(coordenadas[0],coordenadas[1]);
	}
}*/

//Evento de click no canvas para a criação de um ponto de controle
canvas.addEventListener('click', function(e){
	if(!moveu){
		circulo.clearRect(0,0,canvas.width, canvas.height);
		criarPontoControle(e.offsetX, e.offsetY);
		desenharControle();
	}else{
		moveu = false;
	}
});

//Evento de click com o botão direito do mouse no canvas para excluir um ponto de controle
canvas.addEventListener('contextmenu', function(e){

	circulo.clearRect(0,0,canvas.width, canvas.height);
	excluirPontoControle(e.offsetX, e.offsetY);
});

//Evento de apertar o botão esquerdo do mouse, verifica se está apertando em um ponto de controle
canvas.addEventListener('mousedown', function(e){

	if(estaNumPonto(e.offsetX, e.offsetY)){
		apertando = true;
	}
});

//Evento de mover o mouse, verifica se o mouse esta sendo clicado, se sim move o ponto de controle
canvas.addEventListener('mousemove', function(e){

	if(apertando){
		circulo.clearRect(0,0,canvas.width, canvas.height);
		moverPontoControle(e.offsetX, e.offsetY);
		moveu = true;
	}
});

//Evento de soltar o botão esqerdo do mouse
canvas.addEventListener('mouseup', function(e){
	apertando = false;
});
