// To set the canvas height
const canvas=document.getElementById("myCanvas");

canvas.width=200;

// returns a drawing context on the canvas
const ctx = canvas.getContext("2d");
const car=new Car(100,100,30,50);


animate();

function animate()
{
    car.update();
    canvas.height=window.innerHeight;
    car.draw(ctx);
    // Calls the animate method many time again and again, and gives
    // the illusion that we want
    requestAnimationFrame(animate);
}