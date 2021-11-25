const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var blink,eat,sad
var fruit;
var rope,rope2,rope3;
var fruit_con,fruit_con2,fruit_con3;
var bg_img,fruit_img,rabbit_img
var bunny,button,button2,button3
var AirSound,eatingSound,CuttingTroughFoliageSound,SadSound,RopecutSound,Sound1Sound
var blower;
var bgSound
var muteButton
var canW,canH
function preload() {
  bg_img=loadImage("background.png")
  fruit_img=loadImage("melon.png")
  rabbit_img=loadImage("Rabbit-01.png")
  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat=loadAnimation("Rabbit-01.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","Rabbit-01.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","Rabbit-01.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","Rabbit-01.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","Rabbit-01.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png")
AirSound=loadSound("air.wav")
eatingSound=loadSound("eating_sound.mp3")
SadSound=loadSound("sad.wav")
//CuttingTroughFoliageSound=loadSound("CTF.mp3")
RopecutSound=loadSound("rope_cut.mp3")
bgSound=loadSound("sound1.mp3")

  sad=loadAnimation("sad_2.png","sad_3.png","sad_2.png","sad_3.png","sad_2.png","sad_3.png","sad_2.png","sad_3.png","sad_2.png","sad_3.png","sad_2.png","sad_3.png","sad_2.png","sad_3.png","sad_2.png","sad_3.png")
  blink.playing=true
  eat.playing=true
  eat.looping=false
  sad.playing=true
  sad.looping=false
 
}
function setup() 
{
  var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile)
{
canW=displayWidth
canH=displayHeight
createCanvas(displayWidth+80,displayHeight)

}
else{
  canW=windowWidth
  canH=windowHeight
  createCanvas(windowWidth,windowHeight)

}
  //createCanvas(500,700);
 
  engine = Engine.create();
  world = engine.world;
  blink.frameDelay=10
  eat.frameDelay=10
  sad.frameDelay=10
  //bgSound.play()
  bgSound.setVolume(0.5)
  bunny=createSprite(170,canH-80,100,100)
  //bunny.addImage(rabbit_img)
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("crying",sad)
  bunny.changeAnimation("blinking")
  bunny.scale=0.2



  button=createImg("cut_btn.png")
  button.position(20,30)
  button.size(50,50)
  button.mouseClicked(drop)




  button2=createImg("cut_btn.png")
  button2.position(330,35)
  button2.size(50,50)
  button2.mouseClicked(drop2)



  button3=createImg("cut_btn.png")
  button3.position(360,200)
  button3.size(50,50)
  button3.mouseClicked(drop3)



  blower=createImg("balloon.png")
  blower.position(10,250)
  blower.size(150,100)
  blower.mouseClicked(airBlow)
  muteButton=createImg("mute.png")
  muteButton.position(450,20)
  muteButton.size(50,50)
  muteButton.mouseClicked(mute)
  ground=new Ground(200,canH,600,20)



  rope=new Rope(8,{x:40,y:30})
  rope2=new Rope(7,{x:370,y:40})
  rope3=new Rope(4,{x:400,y:225})

  var fruit_options={
density:0.001
  }
  fruit=Bodies.circle(300,300,15,fruit_options)
  Matter.Composite.add(rope.body,fruit)
  //Matter.Composite.add(name of composite,body to add)
  fruit_con=new Link(rope,fruit)
  fruit_con2=new Link(rope2,fruit)
  fruit_con3=new Link(rope3,fruit)
  //Composites = consists of multiple bodies within it
  //When we want multiple bodies to have the same properties such as shape size we use composites
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER)
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight)
  
  Engine.update(engine);
   ground.display();
  
   rope.show();
   rope2.show();
   rope3.show();
   if(fruit!=null)
   {
    image(fruit_img,fruit.position.x,fruit.position.y,60,60)

   }
   if(fruit!=null && fruit.position.y>=650)
   {
   bunny.changeAnimation("crying")
   bgSound.stop()
   SadSound.play()
   fruit=null
   }
   if(collide(fruit,bunny)==true)
   {
   bunny.changeAnimation("eating")
   eatingSound.play()
   }
   
   drawSprites()
}
function drop() {
  rope.break()
  fruit_con.detach()
  fruit_con=null
  RopecutSound.play()
}


function drop2() {
  rope2.break()
  fruit_con2.detach()
  fruit_con2=null
  RopecutSound.play()
}

function drop3() {
  rope3.break()
  fruit_con3.detach()
  fruit_con3=null
  RopecutSound.play()
}


function collide(body,sprite) {
  if(body!=null)
  {
var d=dist(body.position.x,body.position.y,
  sprite.position.x,sprite.position.y)
  //distance <=80 fro collision
  if(d<=80)
  {
  World.remove(engine.world,fruit)
  fruit=null
  return true
  }
  else
  {
  return false
  

  }
  
  }
}
function airBlow()
{
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
AirSound.play()
}
function mute()
{
if(bgSound.isPlaying())
{
bgSound.stop()
}

else{
bgSound.play()

}



}
