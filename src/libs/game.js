import { start as blockStart, draw as blockDraw } from './block.js'
import { TIMER_SPEED } from '../globals.js'
import { setBlockState } from '../actions/blockActions.js'

export function start(setTimer, ctx2D, wall, currentBlock, canvas, tileDim) {
    blockStart(canvas, setBlockState)
    setTimer(setInterval(draw.bind(null, ctx2D, wall, currentBlock, canvas, tileDim), TIMER_SPEED))
}

export function draw(ctx2D, wall, currentBlock, canvas, tileDim) {
    clearCanvas(ctx2D, canvas.width, canvas.height)
    blockDraw(ctx2D, currentBlock, tileDim)
    // block.moveDown(canvas.height, setPosition, position, tileDim, speed, setNewBlock)
    console.log("need to clear interval")
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

export function update() {

}


export function finish(timer, ctx2D, canvas) {
    clearInterval(timer)
    clearCanvas(ctx2D, canvas)
}