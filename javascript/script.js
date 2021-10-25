const dino = document.querySelector('div.dino')
const background = document.querySelector('div.background')
const endGame = document.querySelector('div.end-game')
let position = 0
let isJumping = false
let isGameOver = false

function handleKeyup(event){
    if (event.which === 32 || event.which === 38) {
        if (!isJumping && !isGameOver){
            jump()
        }
    }
}

function jump() {
    isJumping = true

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval)

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval)
                    isJumping = false
                } else {
                    // Descendo
                    position -= 20
                    dino.style.bottom = position + 'px'
                }
            }, 25)

        } else {
            // Subindo
            position += 20
            dino.style.bottom = position + 'px'
        }
    }, 20)

}

function getRandomTime() {
    return (Math.random() * (0.9 - 0.1) + 0.1) * 6000
  }

function createCactus(){
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randomTime = getRandomTime()

    if (!isGameOver) {
        cactus.classList.add('cactus')
        cactus.style.left = 1000 + 'px'
        background.appendChild(cactus)
    }

    let leftInterval = setInterval(() => {
        if (cactusPosition < 30) {
            clearInterval(leftInterval)
            background.removeChild(cactus)
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftInterval)
            isGameOver = true
            endGame.style.display = 'flex'
            background.style.animation = 'none'
        } else {
            if (!isGameOver) {
                cactusPosition -= 10
                cactus.style.left = cactusPosition + 'px'
            }
        }
    }, 25)

    if (!isGameOver) {
        setTimeout(createCactus, randomTime)
        console.log('gerou mais um cacto!')
    }
}

createCactus()
// keyup para ativar a função quando a tecla subir, então não funciona se segurar a tecla
document.addEventListener('keyup', handleKeyup)