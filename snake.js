
//Board
const blockSize = 25;
const rows = 20;
const cols = 20;
let board;
let context; 

//Snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

//Food block
let foodX;
let foodY;

let gameOver = false;

//Make snake move
let velocityX = 0;
let velocityY = 0;

//snake body 
let snakeBody = [];

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");   //Used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    update();
    setInterval(update, 1000/10);   //Every 100 miliseconds the page updates
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])      //Ensures the food moves to a different location on the canvas when the snake eats it
        placeFood();
    }

    for (let i = snakeBody.length -1; i > 0; i--) {     //Ensures the body moves with the head and is attatched
        snakeBody[i] = snakeBody[i-1];
    }
    
    if (snakeBody.length) {                         //------^
        snakeBody[0] = [snakeX, snakeY];
    }
    
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;      //Determines how fast the snake will move
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0 ; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //Game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver  = true
        alert("You Died");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            alert("You Died");
        }
    }
}

function changeDirection(e) {       //Determines how the snake will move depending on key press
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = +1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = +1;
        velocityY = 0;
    }
}

function placeFood() {            //Ensures that the placement of food when eaten is randomised
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}