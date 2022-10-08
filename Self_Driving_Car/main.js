// To set the canvas height
const canvas=document.getElementById("myCanvas");

canvas.width=200;

// returns a drawing context on the canvas
const ctx = canvas.getContext("2d");
const road=new Road(canvas.width/2,canvas.width*0.9);
const car=new Car(road.getLaneCenter(1),100,30,50);

animate();

function animate() {
  car.update();

  canvas.height = window.innerHeight;

  // To give the illusion of following the car
  ctx.save();
  ctx.translate(0, -car.y+canvas.height*0.7);
  
  road.draw(ctx);
  car.draw(ctx);

  ctx.restore();
  // Calls the animate method many time again and again, and gives
  // the illusion that we want
  requestAnimationFrame(animate);
}