import { blockLoop, blockStart } from './block.js'
import { wallStart, wallLoop } from './wall.js'
import { TIMER_SPEED } from '../globals.js'

export function gameStart(setTimer, ctx2D, canvas, wall, setWall, block, setBlock, setGameUpdate, gameLevel) {
    setTimer(setInterval(gameLoop.bind(null, ctx2D, canvas, wall, setWall, block, setBlock, setGameUpdate, gameLevel), TIMER_SPEED))
}

// export function gameUpdate(timer, setTimer, ctx2D, canvas, wall, setWall, block, setBlock) {
//     clearInterval(timer)
//     setTimer(setInterval(gameLoop.bind(null, ctx2D, canvas, wall, setWall, block, setBlock), TIMER_SPEED))
// }

export function gamePause(timer) {
    clearInterval(timer)
}

export function gameFinish(timer, ctx2D, canvas, block, setBlock, setWall, gameLevel) {
    clearInterval(timer)
    clearCanvas(ctx2D, canvas)
    blockStart(canvas, block, setBlock, gameLevel)
    wallStart(setWall)
}

function gameLoop(ctx2D, canvas, wall, setWall, currentBlock, setBlock, setGameUpdate, gameLevel) {
    if (ctx2D) {
        clearCanvas(ctx2D, canvas)
        blockLoop(ctx2D, canvas, wall, setWall, currentBlock, setBlock, setGameUpdate, gameLevel)
        wallLoop(ctx2D, wall, canvas.tileDim)
    }
    console.log("need to clear interval")
}

export function clearCanvas(ctx2D, canvas) {
    if (ctx2D) {
        ctx2D.clearRect(0, 0, canvas.width, canvas.height)
    }
}