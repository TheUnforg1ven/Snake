class Snake {
    constructor() {
        this.segments = [
            new Block(7, 5),
            new Block(6, 5),
            new Block(5, 5)
        ];
        this.direction = "right";
        this.nextDirection = "right";
    }

    // Draw square for every snake part
    draw() {
        var colorArray = ["Green", "Purple", "Black", "MediumBlue", "Magenta"];
        if (score >= 0 && score <= 2) {
            for (var i = 0; i < this.segments.length; i++) {
                this.segments[i].drawSquare(colorArray[0]);
            }
        }
        else if (score > 2 && score <= 5) {
            for (var i = 0; i < this.segments.length; i++) {
                this.segments[i].drawSquare(colorArray[1]);
            }
        }
        else if (score > 5 && score <= 10) {
            for (var i = 0; i < this.segments.length; i++) {
                this.segments[i].drawSquare(colorArray[2]);
            }
        }
        else if (score > 10 && score <= 20) {
            for (var i = 0; i < this.segments.length; i++) {
                this.segments[i].drawSquare(colorArray[3]);
            }
        }
        else if (score > 20) {
            for (var i = 0; i < this.segments.length; i++) {
                this.segments[i].drawSquare(colorArray[4]);
            }
        }
    }

    // Create new head 
    // Add it to the snake begining
    // It moves snake in the needed way
    move() {
        var head = this.segments[0];
        var newHead;
        this.direction = this.nextDirection;
        if (this.direction === "right") {
            newHead = new Block(head.col + 1, head.row);
        }
        else if (this.direction === "down") {
            newHead = new Block(head.col, head.row + 1);
        }
        else if (this.direction === "left") {
            newHead = new Block(head.col - 1, head.row);
        }
        else if (this.direction === "up") {
            newHead = new Block(head.col, head.row - 1);
        }
        if (this.checkCollision(newHead)) {
            gameOver();
            return;
        }

        this.segments.unshift(newHead);
        
        if (newHead.equal(apple.position)) {
            score++;
            animationTime -= 5;
            apple.move();
        }
        else {
            this.segments.pop();
        }
    }

    // Check snake collision with a wall or itself
    checkCollision(head) {
        var leftCollision = (head.col === 0);
        var topCollision = (head.row === 0);
        var rightCollision = (head.col === widthInBlocks - 1);
        var bottomCollision = (head.row === heightInBlocks - 1);
        var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
        var selfCollision = false;

        for (var i = 0; i < this.segments.length; i++) {
            if (head.equal(this.segments[i])) {
                selfCollision = true;
            }
        }

        return wallCollision || selfCollision;
    }

    // Set new direction for snake according to the pressed button
    setDirection(newDirection) {
        if (this.direction === "up" && newDirection === "down") {
            return;
        }
        else if (this.direction === "right" && newDirection === "left") {
            return;
        }
        else if (this.direction === "down" && newDirection === "up") {
            return;
        }
        else if (this.direction === "left" && newDirection === "right") {
            return;
        }
        this.nextDirection = newDirection;
    }
}