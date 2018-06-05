var linhas_controle = [];//Array que guarda as linhas que ligam os pontos de controle
var pontos_controle = [];//Array que guarda os pontos de controle que são criados
var qtd_pontos_controle=0;

var apertando = false;	//boolean que diz se o mouse esta apertando num ponto de controle
var moveu = false;	//boolean que diz se o mouse se moveu quando apertou o botão esquerdo
var indice;		//inteiro que diz o indice do ponto de controle que se está clicando

var linha_bezier = [];
var ponto_bezier = [];

var interacoes = 100;


