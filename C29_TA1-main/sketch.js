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
var rope;
var fruit_con;
var bg_img,fruit_img,rabbit_img
var bunny,button

function preload() {
  bg_img=loadImage("background.png")
  fruit_img=loadImage("melon.png")
  rabbit_img=loadImage("Rabbit-01.png")
  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat=loadAnimation("Rabbit-01.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","Rabbit-01.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","Rabbit-01.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","Rabbit-01.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","Rabbit-01.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png","blink_1.png","blink_2.png","blink_3.png")
  sad=loadAnimation("sad_2.png","sad_3.png","sad_2.png","sad_3.png","sad_2.png","sad_3.png","sad_2.png","sad_3.png","sad_2.png","sad_3.png","sad_2.png","sad_3.png","sad_2.png","sad_3.png","sad_2.png","sad_3.png")
  blink.playing=true
  eat.playing=true
  eat.looping=false
  sad.playing=true
  sad.looping=false
 
}
function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
  blink.frameDelay=10
  eat.frameDelay=10
  sad.frameDelay=10
  bunny=createSprite(230,620,100,100)
  //bunny.addImage(rabbit_img)
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("crying",sad)
  bunny.changeAnimation("blinking")
  bunny.scale=0.2
  button=createImg("cut_btn.png")
  button.position(220,30)
  button.size(50,50)
  button.mouseClicked(drop)
  ground=new Ground(200,690,600,20)
  rope=new Rope(6,{x:245,y:30})
  var fruit_options={
density:0.001
  }
  fruit=Bodies.circle(300,300,15,fruit_options)
  Matter.Composite.add(rope.body,fruit)
  //Matter.Composite.add(name of composite,body to add)
  fruit_con=new Link(rope,fruit)
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
  image(bg_img,width/2,height/2,500,700)
  
  Engine.update(engine);
   ground.display();
   rope.show();
   if(fruit!=null)
   {
    image(fruit_img,fruit.position.x,fruit.position.y,60,60)

   }
   if(collide(fruit,ground.body)==true)
   {
   bunny.changeAnimation("crying")

   }
   if(collide(fruit,bunny)==true)
   {
   bunny.changeAnimation("eating")
   
   }
   
   drawSprites()
}
function drop() {
  rope.break()
  fruit_con.detach()
  fruit_con=null

}

function collide(body,sprite) {
  if(body!=null)
  {
var d=dist(body.position.x,body.position.y,
  sprite.position.x,sprite.position.y)
  //distance <=10 fro collision
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

