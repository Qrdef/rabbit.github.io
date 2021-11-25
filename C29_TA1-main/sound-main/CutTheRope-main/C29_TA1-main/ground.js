class Ground
{
constructor(a,b,c,d)
{
let options={
isStatic:true

}
this.x=a
this.y=b
this.w=c
this.h=d
this.body=Bodies.rectangle(a,b,c,d,options)
World.add(world,this.body)
}

display()
{
let pos=this.body.position
push();
translate(pos.x,pos.y)
rectMode(CENTER)
noStroke()
fill(148,127,146)
rect(0,0,this.w,this.h)
pop();

}



}