class GamePlayer {
    constructor(pos=v(0,0), scale=v(64,64)) {
        this.pos = pos
        this.scale = scale
    }
}

class TriangleCube extends GamePlayer {
    constructor(pos=v(0,0)) {
        super(pos, v(64, 64))
        this.vel = v(0, 0)
        this.speed = 1
        this.accel = v(0, 0.005)
        this.onGround = false
        this.charge = 0
        this.small = false
        this.doubleJumps = 1
    }
    render() {
        ctx.fillStyle="#0ff"
        ctx.fillRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y)
        ctx.font = "60px Arial";
        ctx.fillText(this.charge, this.pos.x, this.pos.y)
    }
    update() {
        if(keys["shift"]==true) { this.charge += getDeltaTime()/1000/(this.charge*9+1) 
            particleHandler.burstParticles(this.getMiddle(), 120, 100, {
                angleRange:360,
                angle:0,
                duration:16,
                speed:60,
                colour: "#00ffff"

            })
        }
        else { this.charge += -getDeltaTime()*32/1000 }
        this.charge = Math.max(this.charge, 0)

        
        
        this.speed = 1*Math.sqrt(this.charge+1)

        if(keys["d"]&&!keys["a"]) {this.vel.x = this.speed}
        else if(keys["a"]&&!keys["d"]) {this.vel.x = -this.speed}
        else {this.vel.x = 0}
        if(this.onGround) {
            if(keys["w"]) {this.vel.y = -this.speed*1.5 }
            else {this.vel.y = 0}
        }
        if(keys["s"]) {keys["s"]=false; this.small = !this.small}
        if(this.small) this.scale = v(32)
        else this.scale = v(64)

        this.accel.y = 0.005/Math.sqrt(this.charge+1)
        if(this.onGround == true) this.accel.y = 0

        this.objectSnap = (d, obj) => {
            if(d==="up") {this.pos.y = obj.pos.y - this.scale.y - 0.01; this.onGround = true}
            else if(d==="down") {this.pos.y = obj.pos.y + obj.scale.y + 0.01;}
            else if(d==="right") {this.pos.x = obj.pos.x - this.scale.x - 0.01}
            else if(d==="left") {this.pos.x = obj.pos.x + obj.scale.x + 0.01}
        }

        let groundCollision = false
        let xMove = true
        let yMove = true
        
        objects.forEach((obj)=>{
            if(obj.pos.x<this.getMiddle().x&&this.getMiddle().x<obj.pos.x+obj.scale.x) {
                if(overlap({pos:v(this.pos.x, this.pos.y+this.vel.y), scale:this.scale}, obj)) {
                    if(this.getMiddle().y<obj.getMiddle().y) this.objectSnap("up", obj)
                    if(this.getMiddle().y>obj.getMiddle().y) this.objectSnap("down", obj)
                }
            }
            if(overlap({pos:v(this.pos.x+this.vel.x, this.pos.y), scale:this.scale}, obj)) {
                if(this.getMiddle().x>obj.getMiddle().x) this.objectSnap("left", obj)
                if(this.getMiddle().x<obj.getMiddle().x) this.objectSnap("right", obj)
            }
            if(overlap({pos:v(this.pos.x, this.pos.y+4), scale:this.scale}, obj)) {
                groundCollision = true
            }
        })
        if(groundCollision == false) {
            this.onGround = false
        }

        if(xMove) this.pos.x += this.vel.x * getDeltaTime()
        if(yMove) this.pos.y += this.vel.y * getDeltaTime()

        let movementModifier = 1
        if(this.small) movementModifier = 1.7

        this.vel.x += this.accel.x * getDeltaTime() / movementModifier
        this.vel.y += this.accel.y * getDeltaTime() / movementModifier
        
    }
    getMiddle() {
        return v(this.pos.x+this.scale.x/2, this.pos.y+this.scale.y/2)
    }
}