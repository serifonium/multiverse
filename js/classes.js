class Wall {
    constructor(pos=v(0, 0), scale=v(1, 1)) {
        this.pos = pos
        this.scale = v(scale.x*64, scale.y*64)
    }
    render() {
        ctx.fillStyle="#fff"
        ctx.fillRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y)
    }
    getMiddle() {
        return v(this.pos.x+this.scale.x/2, this.pos.y+this.scale.y/2)
    }
}

class Camera {
    constructor(pos=v(0)) {
        this.pos = pos
    }
}

class TestDummy {
    constructor(pos) {
        this.pos = pos
        this.scale = v(64)
    }
}