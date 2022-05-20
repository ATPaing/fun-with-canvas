const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
let particleArray = []
let randomColor = 0
let alphaValue = 0.7
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
    x : null,
    y : null,
    radius: Math.random() * 10
}

class Particle{
    constructor(x,y){
        this.x = x
        this.y = y
        this.baseX = this.x
        this.baseY = this.y
        this.size = (Math.random() * 13) + 7
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = `hsl(${randomColor} 100% 70% / ${alphaValue})`
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }
    update(){
        this.x += (this.speedX) / 0.5
        this.y += (this.speedY) / 0.5
    }
}
window.addEventListener('click',(e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    for(let i = 0; i < 5;i++){
        particleArray.push(new Particle(mouse.x,mouse.y))
        mouse.x += 5
        mouse.y += 5
    }
})
function particleHandler(){
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].draw()
        particleArray[i].update()
        randomColor += 10
        for(let j = i; j < particleArray.length; j++){
            const dx = particleArray[i].x - particleArray[j].x
            const dy = particleArray[i].y - particleArray[j].y
            const distance = Math.sqrt(dx*dx + dy*dy) 
            if(distance < 60){
                ctx.beginPath()
                ctx.strokeStyle = particleArray[i].color
                ctx.lineCap = 'round';
                ctx.lineWidth = particleArray[i].size
                ctx.moveTo(particleArray[i].x,particleArray[i].y)
                ctx.lineTo(particleArray[j].x,particleArray[j].y)
                ctx.stroke()
                ctx.closePath()
            }
        }
    }
}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    particleHandler()
    requestAnimationFrame(animate)
}
animate()

