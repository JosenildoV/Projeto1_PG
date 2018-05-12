var canvas = document.getElementById('meuCanvas');

var circulo = canvas.getContext('2d');
circulo.beginPath();
circulo.arc(100, 100, 10, 0, 2 * Math.PI);
circulo.fillStyle = "#000000";
circulo.fill();
circulo.stroke();
