import { BLOCK_DELTA_SPEED, blockType, BLOCK_DELTA_ROTATION, BLOCK_INITIAL_ROTATION, WALL_TILES_WIDTH, WALL_TILES_HEIGHT, blockInitialSpeed } from '../globals.js'

export function Block() {

    this.speed = 0
    this.type = { name: "", fillStyle: "" }
    this.rotationAngle = 0
    this.rotationPoint = { x: 0, Y: 0 }
    this.tiles = []

    this.init = canvas => {
        let blockType = this.getType()
        let blockProps = this.getTiles(canvas, blockType)
        this.speed = blockInitialSpeed.level1
        this.rotationAngle = BLOCK_INITIAL_ROTATION
        this.type = blockType
        this.tiles = blockProps.tiles
        this.rotationPoint = blockProps.rotationPoint
    }

    this.reset = (canvas, gameLevel) => {
        let blockType = this.getType()
        let blockProps = this.getTiles(canvas, blockType)
        this.speed = this.getInitialSpeed(gameLevel)
        this.type = blockType
        this.tiles = blockProps.tiles
        this.rotationPoint = blockProps.rotationPoint
        this.rotationAngle = BLOCK_INITIAL_ROTATION
    }

    this.draw = (ctx2D, tileDim) => {
        try {
            ctx2D.fillStyle = this.type.fillStyle
            ctx2D.beginPath()
            this.tiles.forEach(tile => {
                ctx2D.rect(tile.x, tile.y, tileDim, tileDim)
            })
            ctx2D.fill()
        }
        catch (e) {
            console.error(e.message)
        }
    }

    this.moveDown = () => {
        this.tiles.forEach(tile => {
            tile.y += this.speed
        })
        this.rotationPoint.y += this.speed
    }

    this.moveLeft = (canvas, wall) => {
        let canBlockMove = this.checkMoveLeft(canvas, wall)
        // If block can move move left
        if (canBlockMove) {
            this.tiles.forEach(tile => {
                tile.x -= canvas.tileDim
            })
            this.rotationPoint.x -= canvas.tileDim
        }
    }

    this.moveRight = (canvas, wall) => {
        let canBlockMove = this.checkMoveRight(canvas, wall)
        // If block can move move right
        if (canBlockMove) {
            this.tiles.forEach(tile => {
                tile.x += canvas.tileDim
            })
            this.rotationPoint.x += canvas.tileDim
        }
    }

    this.checkMoveLeft = (canvas, wall) => {
        let blockCanMove = true
        let keepLooping = true
        // Check if there is a tile that can't move
        try {
            this.tiles.forEach(tile => {
                if (keepLooping) {
                    let tileRow = Math.floor(tile.y / canvas.tileDim)
                    let tileCol = Math.floor(tile.x / canvas.tileDim)
                    if (tileCol > 0) {
                        loop1:
                        for (let row = 0; row < WALL_TILES_HEIGHT; row++) {
                            for (let col = 0; col < WALL_TILES_WIDTH; col++) {
                                if (Object.keys(wall.tiles[row][col]).length === 2) {
                                    // If blockTileCol is bigger than wallTileCol + 1 there is no need to check with that wallTile
                                    if (tileCol === col + 1 && tileRow >= row - 1 && tileRow <= row + 1) {
                                        blockCanMove = false
                                        keepLooping = false
                                        break loop1
                                    }
                                }
                            }
                        }
                    }
                    else {
                        blockCanMove = false
                        keepLooping = false
                    }
                }
            })
        }
        catch (e) {
            console.error(e.message)
        }
        return blockCanMove
    }

    this.checkMoveRight = (canvas, wall) => {
        let blockCanMove = true
        let keepLooping = true
        // Check if there is a tile that can't move
        try {
            this.tiles.forEach(currentTile => {
                if (keepLooping) {
                    let tileRow = Math.floor(currentTile.y / canvas.tileDim)
                    let tileCol = Math.floor(currentTile.x / canvas.tileDim)
                    if (tileCol < WALL_TILES_WIDTH - 1) {
                        loop1:
                        for (let row = 0; row < WALL_TILES_HEIGHT; row++) {
                            for (let col = 0; col < WALL_TILES_WIDTH; col++) {
                                if (Object.keys(wall.tiles[row][col]).length === 2) {
                                    // If blockTileCol is bigger than wallTileCol + 1 there is no need to check with that wallTile
                                    if (tileCol === col - 1 && tileRow >= row - 1 && tileRow <= row + 1) {
                                        blockCanMove = false
                                        keepLooping = false
                                        break loop1
                                    }
                                }
                            }
                        }
                    }
                    else {
                        blockCanMove = false
                        keepLooping = false
                    }
                }
            })
        }
        catch (e) {
            console.error(e.message)
        }
        return blockCanMove
    }

    this.newSpeed = () => {
        this.speed += BLOCK_DELTA_SPEED
    }

    this.rotate = (canvas, wall) => {
        if (this.type.name !== "O") {
            let checkSpace = this.needToCheckSpace()
            let canRotate = true
            if (checkSpace) {
                // check available space
                // if there is no available space set canRotate = false
                canRotate = this.checkAvailableSpace(canvas.tileDim, wall)
            }
            if (canRotate) {
                // rotate tiles
                this.setNewRotationAngle()
                this.rotateTiles(canvas.tileDim)
                this.adjustTiles(canvas.tileDim)
            }
        }
    }

    this.checkAvailableSpace = (tileDim, wall) => {

        let isThereEnoughSpace = false
        try {
            // To get the block cols and rows
            let blockDims = this.getRowsAndCols(tileDim)
            // Loop in the wall only on needed rows using future width and height
            // The rows array is sorted to get the max value first
            let startRow = blockDims.rows[0] > 0 ? (blockDims.rows[0] + 1) : 0
            // The row in the loop (not included)
            let endRow = (startRow - blockDims.rows.length) < 0 ? - 1 : (startRow - blockDims.rows.length)
            // The cols array is sorted to get the smallest value first
            let startCol = blockDims.cols[0]
            // The number of cols to be checked is equal to the future height (rows.length)
            // numCols is the loop range needed. It varies depending on the col value
            let numCols = blockDims.rows.length
            let endCol = (startCol + numCols) > WALL_TILES_WIDTH ? WALL_TILES_WIDTH : (startCol + numCols)
            let emptyCols = 0
            for (let col = startCol; col < endCol; col++) {
                let emptyRows = 0
                for (let row = startRow; row > endRow; row--) {
                    if (Object.keys(wall.tiles[row][col]).length === 2) {
                        emptyRows = 0
                    }
                    else {
                        emptyRows++
                    }
                }
                // cols.length is the future width
                if (emptyRows === blockDims.rows.length) {
                    emptyCols++
                    // If the number of empty cols is >= than the future width the block can rotate
                    if (emptyCols === blockDims.rows.length) {
                        isThereEnoughSpace = true
                        break
                    }
                }
                else {
                    emptyCols = 0
                }
            }
        }
        catch (e) {
            console.error(e.message)
        }
        return isThereEnoughSpace
    }

    this.getRowsAndCols = (tileDim) => {
        try {
            let tilesRows = []
            let tilesCols = []
            this.tiles.forEach(tile => {
                let row = Math.floor(tile.y / tileDim) < 0 ? 0 : Math.floor(tile.y / tileDim)
                let col = Math.floor(tile.x / tileDim)
                tilesRows.push(row)
                tilesCols.push(col)
            })
            // Descending
            tilesRows.sort((a, b) => b - a)
            // Ascending
            tilesCols.sort((a, b) => a - b)
            let finalRows = [...new Set(tilesRows)]
            let finalCols = [...new Set(tilesCols)]
            return { rows: finalRows, cols: finalCols }
        }
        catch (e) {
            console.error(e.message)
        }
    }

    this.needToCheckSpace = () => {
        // If the current angle is 90 or 270 there is no need to check for available space
        if (this.rotationAngle === 90 || this.rotationAngle === 270) {
            return false
        }
        else {
            return true
        }
    }

    this.rotateTiles = () => {
        // Rotate the points around the rotation point
        try {
            let angle = (Math.PI / 180) * BLOCK_DELTA_ROTATION
            this.tiles.forEach(tile => {
                // Make a copy to avoid using changed tile.x in tile.y new value
                let currentTile = Object.assign({}, tile)
                // Rotate tile.x around rotationPoint
                tile.x = Math.round(Math.cos(angle) * (currentTile.x - this.rotationPoint.x) - Math.sin(angle) * (currentTile.y - this.rotationPoint.y) + this.rotationPoint.x)
                // Rotate tile.y around rotationPoint
                tile.y = Math.sin(angle) * (currentTile.x - this.rotationPoint.x) + Math.cos(angle) * (currentTile.y - this.rotationPoint.y) + this.rotationPoint.y
            })
        }
        catch (e) {
            console.error(e.message)
        }
    }

    this.adjustTiles = tileDim => {
        this.correctTilesPosition(tileDim)
        this.correctRotationPoint(tileDim)
    }

    this.correctTilesPosition = tileDim => {
        // Correct rotated points of L, J, Z, S blocks
        if (this.type.name !== "I" && this.type.name !== "O") {
            this.tiles.forEach(tile => {
                switch (this.rotationAngle) {
                    case 0:
                        tile.x -= tileDim
                        tile.y += tileDim
                        break
                    case 90:
                        tile.x -= tileDim
                        break
                    case 180:
                        tile.y -= tileDim * 2
                        break
                    case 270:
                        tile.x += tileDim * 2
                        tile.y += tileDim
                        break
                    default:
                        console.error("Unknown block rotation angle...")
                        break
                }
            })
        }
        // Correct rotated points of I block
        else if (this.type.name === "I") {
            this.tiles.forEach(tile => {
                switch (this.rotationAngle) {
                    case 0:
                        tile.x -= tileDim * 3
                        break
                    case 90:
                        break
                    case 180:
                        tile.y -= tileDim * 3
                        break
                    case 270:
                        tile.x += tileDim * 3
                        tile.y += tileDim * 3
                        break
                    default:
                        console.error("Unknown block rotation angle...")
                        break
                }
            })
        }
    }

    this.correctRotationPoint = tileDim => {
        let newRotationPoint = {}
        let centralPoint = this.tiles[3]
        // If the block is T or Z the rotation point is updated differently
        if (this.type.name === "T" || this.type.name === "Z") {
            switch (this.rotationAngle) {
                case 0:
                    newRotationPoint = { x: centralPoint.x, y: centralPoint.y + tileDim }
                    break
                case 90:
                    newRotationPoint = { x: centralPoint.x - tileDim, y: centralPoint.y }
                    break
                case 180:
                    newRotationPoint = { x: centralPoint.x, y: centralPoint.y - tileDim }
                    break
                case 270:
                    newRotationPoint = { x: centralPoint.x + tileDim, y: centralPoint.y }
                    break
                default:
                    console.error("Unknown rotation angle for rotation point...")
                    break
            }
        }
        // All other blocks have the central point equalt to point 4
        else {
            newRotationPoint = { x: centralPoint.x, y: centralPoint.y }
        }
        this.rotationPoint = newRotationPoint
    }

    this.setNewRotationAngle = () => {
        if (this.rotationAngle >= 270) {
            this.rotationAngle = 0
        }
        else {
            this.rotationAngle += BLOCK_DELTA_ROTATION
        }
    }

    this.getInitialSpeed = (gameLevel) => {
        switch (gameLevel) {
            case 1:
                return blockInitialSpeed.level1
            case 2:
                return blockInitialSpeed.level2
            case 3:
                return blockInitialSpeed.level3
            case 4:
                return blockInitialSpeed.level4
            case 5:
                return blockInitialSpeed.level5
            case 6:
                return blockInitialSpeed.level6
            case 7:
                return blockInitialSpeed.level7
            default:
                console.error("Unknown game level...")
                return blockInitialSpeed.level1
        }
    }

    this.getTiles = (canvas, type) => {
        let block = {}
        switch (type.name) {
            case blockType.I.name:
                block = this.getI(canvas)
                return block
            case blockType.S.name:
                block = this.getS(canvas)
                return block
            case blockType.Z.name:
                block = this.getZ(canvas)
                return block
            case blockType.T.name:
                block = this.getT(canvas)
                return block
            case blockType.L.name:
                block = this.getL(canvas)
                return block
            case blockType.J.name:
                block = this.getJ(canvas)
                return block
            case blockType.O.name:
                block = this.getO(canvas)
                return block
            default:
                console.error("Unknown block name...")
                break
        }
    }

    this.getI = canvas => {
        let leftMostX = canvas.width / 2
        let block = { tiles: [], rotationPoint: {} }
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 4 })
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 3 })
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim })
        let centralPoint = block.tiles[3]
        block.rotationPoint = { x: centralPoint.x, y: centralPoint.y }
        return block
    }
    this.getS = canvas => {
        let leftMostX = canvas.width / 2 - canvas.tileDim
        let block = { tiles: [], rotationPoint: {} }
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 3 })
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
        block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
        block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim })
        let centralPoint = block.tiles[3]
        block.rotationPoint = { x: centralPoint.x, y: centralPoint.y }
        return block
    }
    this.getZ = canvas => {
        let leftMostX = canvas.width / 2 - canvas.tileDim
        let block = { tiles: [], rotationPoint: {} }
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim })
        block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 3 })
        block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
        let centralPoint = block.tiles[3]
        block.rotationPoint = { x: centralPoint.x, y: centralPoint.y + canvas.tileDim }
        return block
    }
    this.getT = canvas => {
        let leftMostX = canvas.width / 2 - canvas.tileDim
        let block = { tiles: [], rotationPoint: {} }
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 3 })
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim })
        block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
        let centralPoint = block.tiles[3]
        block.rotationPoint = { x: centralPoint.x, y: centralPoint.y + canvas.tileDim }
        return block
    }
    this.getL = canvas => {
        let leftMostX = canvas.width / 2 - canvas.tileDim
        let block = { tiles: [], rotationPoint: {} }
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 3 })
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim })
        block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim })
        let centralPoint = block.tiles[3]
        block.rotationPoint = { x: centralPoint.x, y: centralPoint.y }
        return block
    }
    this.getJ = canvas => {
        let leftMostX = canvas.width / 2 - canvas.tileDim
        let block = { tiles: [], rotationPoint: {} }
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim })
        block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 3 })
        block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
        block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim })
        let centralPoint = block.tiles[3]
        block.rotationPoint = { x: centralPoint.x, y: centralPoint.y }
        return block
    }
    this.getO = canvas => {
        let leftMostX = canvas.width / 2 - canvas.tileDim
        let block = { tiles: [], rotationPoint: {} }
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim * 2 })
        block.tiles.push({ x: leftMostX, y: - canvas.tileDim })
        block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim * 2 })
        block.tiles.push({ x: leftMostX + canvas.tileDim, y: - canvas.tileDim })
        let centralPoint = block.tiles[3]
        block.rotationPoint = { x: centralPoint.x, y: centralPoint.y }
        return block
    }

    // Return the block number used to define the block type
    this.getNumber = () => {
        const min = 1, max = 7
        let blockNum = Math.round(Math.random() * (max - min)) + min
        return blockNum
    }

    this.getType = () => {

        let type = {}
        let blockNumber = this.getNumber()

        // Return the blockType that is going to be used as a css class to define the block layout
        switch (blockNumber) {
            case 1:
                type = blockType.I
                return type
            case 2:
                type = blockType.S
                return type
            case 3:
                type = blockType.Z
                return type
            case 4:
                type = blockType.T
                return type
            case 5:
                type = blockType.L
                return type
            case 6:
                type = blockType.J
                return type
            case 7:
                type = blockType.O
                return type
            default:
                console.error("Unknown block number: " + blockNumber)
                return type
        }
    } 

}