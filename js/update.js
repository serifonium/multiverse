function update() {
    tick = Date.now()

    player.update()
    objects.forEach((obj)=>{
        if(obj.update) obj.update()
    })
    particleHandler.updateParticles(getDeltaTime()/(1000/60))
    lastTick = Date.now()
}


function getDeltaTime() {
    return (tick - lastTick)
}