class Car {
    constructor(x,y,width,height,controlType, maxSpeed=3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;
        this.angle = 0;
        this.damaged = false;

        if (controlType!='DUMMY') {
            this.sensor = new Sensor(this);
        }
        
        this.controls = new Controls(controlType);
    }

    #move() {

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

            const flip = this.speed > 0 ? 1 : -1;

            // user presses the X controls
            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }

            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }
        

        // change CAR's position by speed value and angle
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    update(roadBorders, traffic) {
        if (!this.damaged) {
            this.#move();
            this.polygon = this.#createPoligon();
            this.damaged = this.#assessDamage(roadBorders, traffic);
        }
        
        if(this.sensor) {
            this.sensor.update(roadBorders, traffic);
        }
    }

    #assessDamage(roadBorders, traffic) {
        for (let i=0; i<roadBorders.length; i++) {
            if (polysIntersect(this.polygon, roadBorders[i])) {
                return true;
            }
        }
        for (let i=0; i<traffic.length; i++) {
            if (polysIntersect(this.polygon, traffic[i].polygon)) {
                return true;
            }
        }
        return false;
    }

    #createPoligon() {
        const points=[];
        // square root of w and h (hypotenuse) c2 = w2 + h2
        const rad = Math.hypot(this.width, this.height) / 2;
        // angle by w and h - arc tangent of w and h
        const alpha = Math.atan2(this.width, this.height);

        // TOP RIGHT
        points.push({
            // consider (angle) of the car and alpha angle of the vertex
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad,
        });

        // TOP LEFT
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad,
        });

        // BOTTOM RIGHT
        points.push({
            // consider (angle) of the car and alpha angle of the vertex
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
        });

        // BOTTOM LEFT
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
        });

        return points;
    }


    draw(ctx, color) {
        if (this.damaged) {
            ctx.fillStyle="gray";
        } else {
            ctx.fillStyle=color;
        }

        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i=1; i<this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();

        if (this.sensor) {
            this.sensor.draw(ctx);
        }
        
    }
}