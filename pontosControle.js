//Função que cria os pontos de controle e os guarda no array
function criarPontoControle(mouseX, mouseY){
	pontos_controle.push([circulo,mouseX,mouseY]);
	qtd_pontos_controle++;
	if(pontos_controle.length>1){
		criarLinhaControle(pontos_controle[qtd_pontos_controle-2],
					pontos_controle[qtd_pontos_controle-1]);
		
	}
}

//Função que cria as linhas para os pontos de controle
function criarLinhaControle(circulo1,circulo2){
	linhas_controle.push([linha,[circulo1[1],circulo1[2]],[circulo2[1],circulo2[2]]]);
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

