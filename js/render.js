function render() {
    function translate() {
        ctx.translate(-camera.pos.x, -camera.pos.y);
    }
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    //camera.pos.x = player.pos.x-window.innerWidth/2+player.scale.x/2
    //camera.pos.y = player.pos.y-window.innerHeight/2+player.scale.y/2

    ctx.fillStyle="#000"
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    ctx.scale(scaleFactor, scaleFactor);

    translate()
    
    player.render()
    objects.forEach((obj)=>{
        if(obj.render) obj.render()
    })

    particleHandler.renderParticles()

    ctx.setTransform(1, 0, 0, 1, 0, 0);
}