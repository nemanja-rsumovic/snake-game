const snakeColor = "lime";
const appleColor = "red";
const x = 20;
const size = 25;

//board
var rows = x;
var cols = x;
var square = size;
var board;
var context;
var resetButton;

var score = 0;
var gameOver = 0;

//snake-start + head
var snakeX;
var snakeY;
[snakeX,snakeY] = randomPosition();

var snakeBody = [];     //array of x & y

//movement-velocity

var velX = 0;
var velY = 0;

//apple-start
var appleX;
var appleY;
[appleX,appleY] = randomPosition();


window.onload = function(){
        

        board = document.getElementById("board");
        board.height = rows * square;
        board.width = cols *square;
        context = board.getContext("2d");
        resetButton = document.getElementById("reset");

        //movement
        document.addEventListener("keyup",changdeDirection);

        //reset
        resetButton.addEventListener("click",resetGame);

        setInterval(update,1000/10); //reframe at 100ms
        
        }


function update(){
    //game over
    if(gameOver == 1){
        document.getElementById("alertGameOver").innerHTML = "Game over";
        return;
    }

    //board
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height); //od gl do dd

    //apple-start
    context.fillStyle = appleColor;
    context.fillRect(appleX,appleY,square,square);


    //overlap
    if(snakeX == appleX && snakeY == appleY){
        snakeBody.push([appleX,appleY]);
        [appleX,appleY] = randomPosition();     //new apple
        document.getElementById("score").innerText = ++score;
    }

    //snakeBody-movement
    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){                   //if there are body parts
        snakeBody[0] = [snakeX,snakeY];     //"neck" takes head position
    }                                       //now we "move/make" new head

    //snakeHead
    context.fillStyle = snakeColor;
    //snakeHead-update position
    snakeX += velX*square;
    snakeY += velY*square;
    context.fillRect(snakeX,snakeY,square,square);
    //snakeBody-draw
    for(let i=0; i< snakeBody.length; i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],square,square);
    }

    //game over-borders
    if(snakeX < 0 || snakeX > cols*square-1 || snakeY < 0 || snakeY > rows*square-1){
        gameOver = 1;                             //stop updating the canvas
    }

    //game over-collision
    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
           gameOver = 1;                         //stop updating the canvas
        }
    }

}

function randomPosition(){
    const positionX = Math.floor(Math.random() * cols) * square;
    const positionY = Math.floor(Math.random() * rows) * square;

    return [positionX,positionY]
}

function changdeDirection(ev){
    if (ev.code == "ArrowUp" && velY != 1){     //it cannot go up if it's already going down
        velX = 0;
        velY = -1;
    } else if (ev.code == "ArrowDown" && velY != -1){
        velX = 0;
        velY = +1;
    } else if (ev.code == "ArrowLeft" && velX != 1){
        velX = -1;
        velY = 0;
    } else if (ev.code == "ArrowRight" && velX != -1){
        velX = +1;
        velY = 0;
    }
}

function resetGame(){
    location.reload();
}