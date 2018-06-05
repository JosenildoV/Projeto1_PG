 
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
}