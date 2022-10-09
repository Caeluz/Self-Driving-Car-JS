class Car
{
    constructor(x,y,width,height)
    {
        // Store as attributes, so it remembers where and how big it is.
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;

        // Sensors for the car
        this.sensor=new Sensor(this);
        // Implementing the controls
        this.controls=new Controls();
    }

    update(roadBorders)
    {
        this.#move();
        this.sensor.update(roadBorders);
    }

    #move()
    {
        // Controlling the car's acceleration
        if(this.controls.forward)
        {
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse)
        {
            this.speed-=this.acceleration;
        }

        // Capping the speed
        if(this.speed>this.maxSpeed)
        {
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2)
        {
            // (-) means  the car is going backwards
            this.speed=-this.maxSpeed/2;
        }

        // For car's friction
        if(this.speed>0)
        {
            this.speed-=this.friction;
        }
        if(this.speed<0)
        {
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction)
        {
            this.speed=0;
        }

        if(this.speed!=0)
        {
            // For the reverse to go the right way.
            const flip=this.speed>0?1:-1
            //Controlling car's left and right.
            if(this.controls.left)
            {
                this.angle+=0.03*flip;
            }
            if(this.controls.right)
            {
                this.angle-=0.03*flip;
            }
        }
        // Rotating 
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    // For drawing a rectangle
    draw(ctx)
    {
        // for rotation
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();
        
        // To avoid infinite translate()
        ctx.restore();

        // The car will draw its own sensor.
        this.sensor.draw(ctx);
    }
}