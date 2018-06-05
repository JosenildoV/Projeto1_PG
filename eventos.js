 
function modificarInteracoes(){
	interacoes = document.getElementById('interacoes').value;
	Redesenhar();
}

function modificarVisualizacaoCurva(){
	desenhar_curva = !desenhar_curva;
	Redesenhar();
}

function modificarVisualizacaoPoligonal(){
	desenhar_poligonal = !desenhar_poligonal; 
	Redesenhar();
}

function modificarVisualizacaoPontos(){
	desenhar_pontos = !desenhar_pontos;
	Redesenhar();
}

 
 
//Evento de click no canvas para a criação de um ponto de controle
canvas.addEventListener('click', function(e){
	if(!moveu){
		//circulo.clearRect(0,0,canvas.width, canvas.height);
		criarPontoControle(e.offsetX, e.offsetY);
		//desenharControle();
		Redesenhar();
	}else{
		moveu = false;
	}
});

//Evento de click com o botão direito do mouse no canvas para excluir um ponto de controle
canvas.addEventListener('contextmenu', function(e){

	excluirPontoControle(e.offsetX, e.offsetY);
	Redesenhar();
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
		moverPontoControle(e.offsetX, e.offsetY);
		moveu = true;
		Redesenhar();
	}
	
});

//Evento de soltar o botão esqerdo do mouse
canvas.addEventListener('mouseup', function(e){
	apertando = false;
});
