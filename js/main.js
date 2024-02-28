var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d");
var ctx2 = canvas.getContext("2d");
ctx.textAlign = "center";
ctx.font = "Arial 10px";

var keys = []
var lastkey = undefined
var hover = v(0, 0)
var tick = Date.now()
var lastTick = Date.now()
var scaleFactor = 0.5

document.addEventListener('keydown', (e)=>{
    keys[e.key.toLowerCase()]=true
    lastkey = e.key.toLowerCase()
})
document.addEventListener('keyup', (e)=>{
    keys[e.key.toLowerCase()]=false
})
window.addEventListener('mousemove', (e) => {
    hover.x = e.pageX / scaleFactor;     
    hover.y = e.pageY / scaleFactor;
    hoverVector = v(hover.x-camera.pos.x, hover.y-camera.pos.x)
})


var player = new TriangleCube(v(0, 0))

var objects = [
    new Wall(v(0*64, 6*64), v(8, 1)),
    new Wall(v(10*64, 6*64), v(8, 1)),
    new Wall(v(18*64, 0*64), v(1, 6)),
]

setInterval(render, 1000/60)

setInterval(update, 1000/240)

var camera = new Camera(v(-window.innerWidth/scaleFactor/2, -window.innerHeight/scaleFactor/2))