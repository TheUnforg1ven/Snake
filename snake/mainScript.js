// Initialize canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// get canvas width and height
var width = canvas.width;
var height = canvas.height;

// Count height and width in blocks
var blockSize = 20;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

var score = 0;

// Paint border
var drawBorder = () => {
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};

// Draw score in the top left angle
var drawScore = () => {
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, blockSize, blockSize);
};

// Stop gameLoop and show final message for user
var gameOver = () => {
    gameLoop(false);
    ctx.clearRect(0, 0, width, height);
    ctx.font = "40px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText("Score: " + score, width / 2, height / 2.5);
    ctx.fillText("End of the game", width / 2, height / 2);
    ctx.fillText("Click any button to try again", width / 2, height / 1.5);

    document.addEventListener("keydown", () => {
        location.reload();
    });

    document.addEventListener("click", () => {
        location.reload();
    });
};

// Create 'Snake' and 'Apple' objects
var snake = new Snake();
var apple = new Apple();

// animation time in the beggining
var animationTime = 100;

// Main 'game loop', which represents the game
var gameLoop = (isWorking) => {
    if(isWorking == false)
        return;

    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
    setTimeout(gameLoop, animationTime);
};

// start loop
gameLoop(true);

// Create needed values from keybord buttons codes
var directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};

// Create keydown event
$("body").keydown( (event) => {
    var newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});