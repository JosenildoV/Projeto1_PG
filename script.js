var curvasControle = [];

var curvaSelecionada=0;

var apertando = false;
var moveu = false;
var indiceClick; //variável para dizer o indice do ponto de controle que o mouse está tocando

function CriarCurva(){
	
	let curvaControle = new Object();
	curvaControle.pontos = [];
	curvaControle.poligonais = [];
	curvaControle.poligonais_bezier = [];
	curvaControle.pontos_bezier = [];
	curvaControle.interacoes = 100;
	curvaControle.desenharPontos = true;
	curvaControle.desenharPoligonais = true;
	curvaControle.desenharCurva = true;
	return curvaControle;
}


function criarPontoControle(mouseX, mouseY){
	curvasControle[curvaSelecionada].pontos.push([mouseX,mouseY]);

	if(curvasControle[curvaSelecionada].pontos.length>1){
		curvasControle[curvaSelecionada].poligonais.push([curvasControle[curvaSelecionada].pontos[curvasControle[curvaSelecionada].pontos.length-2],curvasControle[curvaSelecionada].pontos[curvasControle[curvaSelecionada].pontos.length-1]]);
	}
	
}

function excluirLinhaControle(pontoX,pontoY){
	let i;
	for(i=curvasControle[curvaSelecionada].poligonais.length-1; i>=0;i--){
		if(i==curvasControle[curvaSelecionada].poligonais.length-1 && (pontoX == curvasControle[curvaSelecionada].poligonais[i][1][0] && pontoY == curvasControle[curvaSelecionada].poligonais[i][1][1])){
			curvasControle[curvaSelecionada].poligonais.splice(i,1);
		}else if(pontoX == curvasControle[curvaSelecionada].poligonais[i][0][0] && pontoY == curvasControle[curvaSelecionada].poligonais[i][0][1]){
			if(i>0){
				curvasControle[curvaSelecionada].poligonais[i-1][1]=curvasControle[curvaSelecionada].poligonais[i][1];
			}
			curvasControle[curvaSelecionada].poligonais.splice(i,1);
		}
	}
}


function excluirPontoControle(mouseX, mouseY){
	let i;	
	for(i=curvasControle[curvaSelecionada].pontos.length-1; i>=0; i--){
		if(mouseX<(curvasControle[curvaSelecionada].pontos[i][0]+5) && mouseX>(curvasControle[curvaSelecionada].pontos[i][0]-5)){
			if(mouseY<(curvasControle[curvaSelecionada].pontos[i][1]+5) && mouseY>(curvasControle[curvaSelecionada].pontos[i][1]-5)){
				excluirLinhaControle(curvasControle[curvaSelecionada].pontos[i][0],curvasControle[curvaSelecionada].pontos[i][1]);
				curvasControle[curvaSelecionada].pontos.splice(i,1);
			}
		}
	}
}

function estaNumPonto(mouseX, mouseY){
	let i;
	for(i=curvasControle[curvaSelecionada].pontos.length-1; i>=0; i--){
		if(mouseX<(curvasControle[curvaSelecionada].pontos[i][0]+5) && mouseX>(curvasControle[curvaSelecionada].pontos[i][0]-5)){
			if(mouseY<(curvasControle[curvaSelecionada].pontos[i][1]+5) && mouseY>(curvasControle[curvaSelecionada].pontos[i][1]-5)){
				indiceClick = i;
				return true;
			}
		}
	}
	return false;
}

function moverPontoControle(mouseX, mouseY){	

	curvasControle[curvaSelecionada].pontos[indiceClick][0] = mouseX;
	curvasControle[curvaSelecionada].pontos[indiceClick][1] = mouseY;

	if(indiceClick == curvasControle[curvaSelecionada].pontos.length-1){
		curvasControle[curvaSelecionada].poligonais[indiceClick-1][1][0] = mouseX;
		curvasControle[curvaSelecionada].poligonais[indiceClick-1][1][1] = mouseY;
	}else if(indiceClick == 0){
		curvasControle[curvaSelecionada].poligonais[indiceClick][0][0] = mouseX;
		curvasControle[curvaSelecionada].poligonais[indiceClick][0][1] = mouseY;
	}else{
		curvasControle[curvaSelecionada].poligonais[indiceClick-1][1][0] = mouseX;
		curvasControle[curvaSelecionada].poligonais[indiceClick-1][1][1] = mouseY;
		curvasControle[curvaSelecionada].poligonais[indiceClick][0][0] = mouseX;
		curvasControle[curvaSelecionada].poligonais[indiceClick][0][1] = mouseY;
	}
	
}
