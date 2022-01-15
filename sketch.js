var situação = "presa", estado = "lançar", tempo = 0;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine, world;

var helicóptero, helicóptero1, helicóptero2;
var caminhãoS, caminhãoB, caminhão;
var pacoteS, pacoteB, pacote1;
var soloS, soloB, solo;
var alvo1S, avlo2S, alvo3S, alvo1B, alvo2B, alvo3B;
var play, playImg;

function preload(){

	helicóptero1 = loadImage("Imagens/Helicóptero/helicóptero1.png");
	helicóptero2 = loadImage("Imagens/Helicóptero/helicóptero2.png");
	caminhão = loadImage("Imagens/Caminhão/caminhão.png");
	pacote1 = loadImage("Imagens/Pacotes/pacote1.png");
	solo = loadImage("Imagens/Cenário/solo.JPG");
	playImg = loadImage("Imagens/Cenário/play.png");
}

function setup(){

	createCanvas(windowWidth, windowHeight-4);

	engine = Engine.create();
	world = engine.world;
	
	//solo
		//sprite
		soloS = createSprite(width/2, height-29, width, 70);
		soloS.shapeColor = "#6ebf49";
		//corpo
		soloB = Bodies.rectangle(width/2, height-29, width, 70 , {isStatic:true});
		World.add(world, soloB);

	//play
		play = createSprite(width/2, height/2);
		play.addImage(playImg);
		play.visible = false;
		play.scale = 0.3;

	//pacote
		//propriedades
		var opçõesP = {
			'restitution': 0.7,
			'friction': 1,
			isStatic:true
		}

		//sprite
		pacoteS = createSprite(width-width+150, height-height+140, 50, 50);
		pacoteS.addImage(pacote1);
		pacoteS.scale = 0.2;

		//corpo
		pacoteB = Bodies.circle(width-width+150, height-height+140 , 15, opçõesP);
		World.add(world, pacoteB);

	//caminhão
		//sprite
		caminhãoS = createSprite(width/2, height-120);
		caminhãoS.addImage(caminhão);
		caminhãoS.scale = 0.7;

		//corpo
		caminhãoB = Bodies.rectangle(width/2, height-120, 150, 50);
		World.add(world, caminhãoB);

	//helicóptero
	helicóptero = createSprite(width-width+150, height-height+100);
	helicóptero.addImage(helicóptero1);
	helicóptero.scale = 0.5;

	Engine.run(engine);
}

function draw(){

	rectMode(CENTER);
	background("lightBlue");

	if(situação == "presa"){

		textSize(20);
		fill("blue");
		text("Mova o helicóptero com 'A' ou 'D'.", width-width+20, height-110);
		text("Aperte ESPAÇO para lançar.", width-width+20, height-80);
	}

	if(estado == "lançar"){

		noCursor();
		pacoteS.x = pacoteB.position.x; 
		pacoteS.y = pacoteB.position.y;
	}
	
	fim();
	área();
	soltar();
	dirigir();
	movimento();
	drawSprites();
}

function movimento(){

	if(keyDown("a")){

		if(situação == "presa" && helicóptero.x > width-width+70){
			Matter.Body.translate(pacoteB, {x:-15, y:0});
		}

		helicóptero.x -= 15;
		helicóptero.addImage(helicóptero2);
	}
	if(keyDown("d")){

		if(situação == "presa" && helicóptero.x < width-70){
			Matter.Body.translate(pacoteB, {x:15, y:0});
		}

		helicóptero.x += 15;
		helicóptero.addImage(helicóptero1);
	}
}

function área(){

	if(helicóptero.x >= width-70){
		helicóptero.x = width-70;
	}

	if(helicóptero.x <= width-width+70){
		helicóptero.x = width-width+70;
	}
}

function soltar(){
	 
	if(keyDown("space")){

		if(pacoteS.x >= width/2-80 && pacoteS.x <= width/2+10){
			situação = "solta";
			Matter.Body.setStatic(pacoteB, false);
		}else{

			fill("#f00540");
			textSize(40);
			text("POSIÇÃO INVÁLIDA!", width-width+20, height-height+50);
		}
	}

	if(situação == "solta" && tempo < 100){
		tempo++;
	}

	if(tempo > 70){
		cursor();
		estado = "dirigir";
		play.visible = true;
	}
}

function dirigir(){

	if(mouseIsOver(play)){
		play.scale = 0.35;
	}else{
		play.scale = 0.30;
	}

	if(mousePressedOver(play) && situação == "solta"){

		play.destroy();
		caminhãoS.velocityX = 10;
		pacoteS.velocityX = 10;
	}
}

function fim(){

	if(caminhãoS.x > width+130){

		pacoteS.velocityX = 0;
		caminhãoS.velocityX = 0;

		fill("#00aa93");
		textSize(50);
		text("PARABÉNS!", width/2-110, height/2);
	}
}