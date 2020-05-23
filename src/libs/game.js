import { blockDraw, blockMoveDown, blockStart } from './block.js'
import { TIMER_SPEED } from '../globals.js'

export function gameStart(setTimer, ctx2D, wall, currentBlock, canvas, setBlockState) {
    // blockStart(canvas, currentBlock, setBlockState)
    setTimer(setInterval(draw.bind(null, ctx2D, wall, currentBlock, canvas, setBlockState), TIMER_SPEED))
}

function draw(ctx2D, wall, currentBlock, canvas, setBlockState) {
    clearCanvas(ctx2D, canvas)
    blockDraw(ctx2D, currentBlock, canvas.tileDim, setBlockState)
    blockMoveDown(canvas, setBlockState, currentBlock)
    console.log("need to clear interval")
}

export function gameUpdate(timer, setTimer, ctx2D, wall, currentBlock, canvas, setBlockState) {
    clearInterval(timer)
    setTimer(setInterval(draw.bind(null, ctx2D, wall, currentBlock, canvas, setBlockState), TIMER_SPEED))
}

export function gamePreventUpdate(setSideMove, setSpeedChange, setRotationChange) {
    setSideMove(false)
    setSpeedChange(false)
    setRotationChange(false)
}

export function gamePause(timer) {
    clearInterval(timer)
}

export function gameResume(setTimer, ctx2D, wall, currentBlock, canvas, setBlockState) {
    setTimer(setInterval(draw.bind(null, ctx2D, wall, currentBlock, canvas, setBlockState), TIMER_SPEED))
}
// drawWall: function(blocks, position, tileDim) {
//     for (block in blocks) {
//         ctx2D.beginPath()
//         ctx2D.rect(position.x, position.y, tileDim, tileDim)
//         ctx2D.fillStyle = "grba(0, 0, 255, 0.5)"
//         ctx2D.fill()
//         ctx2D.closePath()
//     }
// },

export function clearCanvas(ctx2D, canvas) {
    if (ctx2D) {
        ctx2D.clearRect(0, 0, canvas.width, canvas.height)
    }
}


export function gameFinish(timer, ctx2D, canvas, setBlockState) {
    clearInterval(timer)
    clearCanvas(ctx2D, canvas)
    blockStart(canvas, setBlockState)
}