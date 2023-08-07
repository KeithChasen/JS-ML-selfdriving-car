class Car {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.controls = new Controls();
    }

    update() {

        // user presses the Y controls
        if (this.controls.forward) {
            this.speed+=this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed-=this.acceleration;
        }

        // check if forward or reverse speed is in range
        if(this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if(this.speed < -this.maxSpeed/2) {
            this.speed = -this.maxSpeed/2;
        }

        // use friction
        if(this.speed > 0) {
            this.speed -= this.friction;
        }

        if(this.speed < 0) {
            this.speed += this.friction;
        }

        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }


        if (this.speed != 0) {
            // user presses the X controls
            if (this.controls.left) {
                this.angle += 0.03;
            }

            if (this.controls.right) {
                this.angle -= 0.03;
            }
        }
        

        // change CAR's position by speed value and angle
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    draw(ctx) {
        // rotation
        ctx.save();
        //translate to the point where rotation should be centered at
        ctx.translate(this.x, this.y);
        //rotate context by minus angle
        ctx.rotate(-this.angle);


        ctx.beginPath();

        //removed x and y because we're translating to that point
        ctx.rect(
            - this.width / 2,
            - this.height / 2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();
    }
}