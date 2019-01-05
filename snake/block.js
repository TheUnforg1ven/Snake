class Block {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }

    // Draw square in the block position
    drawSquare(color) {
        var x = this.col * blockSize;
        var y = this.row * blockSize;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, blockSize, blockSize);
    }
    
    // Check if current block is in the same position as otherBlock
    equal(otherBlock) {
        return this.col === otherBlock.col && this.row === otherBlock.row;
    }
}