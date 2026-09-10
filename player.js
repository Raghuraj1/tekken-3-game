class Player {
    constructor(x, y, name, controls, spriteFolder) {
        this.x = x;
        this.y = y;
        this.width = 230;
        this.height = 400;
        this.name = name;
        this.vx = 0;
        this.vy = 0;
        this.speed = 4;
        this.jumpForce = -13;
        this.gravity = 0.6;
        this.isGrounded = false;
        this.controls = controls;
        
        
        this.sprites = {
            idle: new Image(),
            walk: new Image(),
            jump: new Image(),
            crawl: new Image(),
            punch: new Image(),
            kick: new Image()
        };

        
        this.sprites.idle.src = `${spriteFolder}/idle.png`;
        this.sprites.walk.src = `${spriteFolder}/idle.png`;
        this.sprites.jump.src = `${spriteFolder}/jump.png`;
        this.sprites.crawl.src = `${spriteFolder}/crawl.png`;
        this.sprites.punch.src = `${spriteFolder}/punch.png`;
        this.sprites.kick.src = `${spriteFolder}/kick.png`;

        this.currentImg = this.sprites.idle;
        this.actionTimer = 0; 
    }
    

    handleInput(keys) {
        if (this.actionTimer > 0) {
            this.actionTimer--;
            return;
        }
        
        this.width = 230;
        this.height = 400;
        this.vx = 0;
        this.currentImg = this.sprites.idle; 
        let oldHeight = this.height;

        if (keys[this.controls.punch]) {
            this.currentImg = this.sprites.punch;
            this.actionTimer = 15; 
            this.width = 300;
            return;
        }

        if (keys[this.controls.kick]) {
            this.currentImg = this.sprites.kick;
            this.actionTimer = 15;
            this.width = 300; 
            return;
        }

        
        // if (keys[this.controls.crawl] && this.isGrounded) {
        //     this.currentImg = this.sprites.crawl;
        //     this.height = 200;  
        //     this.y += 500;            
        //     return;
        // } else {
        //     this.height = 400; 
        // }

        if (keys[this.controls.left]) {
            this.vx = -this.speed;
            this.currentImg = this.sprites.walk;
        }
        if (keys[this.controls.right]) {
            this.vx = this.speed;
            this.currentImg = this.sprites.walk;
        }

        if (keys[this.controls.jump] && this.isGrounded) {
            this.vy = this.jumpForce;
            this.isGrounded = false;
        }

        if (!this.isGrounded) {
            this.currentImg = this.sprites.jump;
            
        }
    }

    update(canvasHeight) {
        this.vy += this.gravity;
        this.y += this.vy;
        this.x += this.vx;

        const floor = canvasHeight - 480;
        if (this.y >= floor) {
            this.y = floor;
            this.vy = 0;
            this.isGrounded = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.beginPath();
        ctx.ellipse(this.x + this.width / 2, this.y + this.height, 35, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.drawImage(this.currentImg, this.x, this.y, this.width, this.height);
        ctx.textAlign = "center";
        ctx.fillStyle = "#ff0000";
        ctx.font = "bold 14px Arial";
        ctx.fillText(this.name, this.x, this.y - 10);
    }
}