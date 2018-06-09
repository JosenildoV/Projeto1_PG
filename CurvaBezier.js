 
function linhaCurvaBezier(inicio,fim){
	curvasControle[curvaSelecionada].poligonais_bezier.push([[inicio[0],inicio[1]],[fim[0],fim[1]]]);
}

function pontoCurvaBezier(x,y){
	curvasControle[curvaSelecionada].pontos_bezier.push([x, y]);
	if(curvasControle[curvaSelecionada].pontos_bezier.length>1){
		linhaCurvaBezier([curvasControle[curvaSelecionada].pontos_bezier[curvasControle[curvaSelecionada].pontos_bezier.length-2][0],curvasControle[curvaSelecionada].pontos_bezier[curvasControle[curvaSelecionada].pontos_bezier.length-2][1]],[x,y]);
	}
}

function criarCurvaBezier(numero){
	curvasControle[curvaSelecionada].poligonais_bezier.length = 0;
	curvasControle[curvaSelecionada].pontos_bezier.length = 0;
	if(curvasControle[curvaSelecionada].pontos.length>1){
		let t;
		for(t=0; t<=numero;t++){
			
			var coordenadas = pontoCurva(curvasControle[curvaSelecionada].pontos,t/numero);
			pontoCurvaBezier(coordenadas[0],coordenadas[1]);
			coordenadas.length=0;
			
		}
	}
}

function pontoCurva(pontosNivel,t){
	
	if(pontosNivel.length==0){
		return [];
	}else if(pontosNivel.length==1){
		return pontosNivel[0];
	}else{
		var NivelSup = [];
	
		let i;
		for(i = 0; i<pontosNivel.length-1;i++){
			let XSup = pontosNivel[i][0]+(t*(pontosNivel[i+1][0]-pontosNivel[i][0]));
			let YSup = pontosNivel[i][1]+(t*(pontosNivel[i+1][1]-pontosNivel[i][1]));
			NivelSup.push([XSup,YSup]);
		}
	
		return pontoCurva(NivelSup,t);
	}
}
