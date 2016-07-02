// Global Variables
var que = ['u'];
var pellets = instantiatePellets();
var snake = instantiateSnake();
var toWhite = [];


function main(gameDiff) {
    $('#start-page').hide();
    $('#game-page').show();
    var cycleDelay = gameDiff == 1 ? 1000 : gameDiff == 2 ? 500 : 300;
    buildBoard();
    setInterval(cycle, cycleDelay);


}

function cycle() {
    console.log('New cycle!');
    var direction = pullFromQue();

    /*
    Steps of the cycle
        - calculate positions
        - check for game over
        - paint board
    */
    
    moveSnake(direction);

    // check if head hit tail or went out of bounds
    for (var i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            gameOver();
        } else if ((snake[0].x < 1 || snake[0].x > 20) || (snake[0].y < 1 || snake[0].y > 20)) {
            gameOver();
        }
    }

    // paint board
    for (var i = 0; i < snake.length; i++){
        var selector = getSelector(snake[i]);
        $(selector).css('background-color', 'black');
    }
    for (var i = 0; i < pellets.length; i++) {
        var selector = getSelector(pellets[i]);
        $(selector).css('background-color', 'Green');
    }
    for (var i = 0; i < toWhite.length; i++) {
        var selector = getSelector(toWhite[i]);
        $(selector).css('background-color', 'White');
    }
    
}

//----------------------------------------------------------------
//----------------------------------------------------------------

function instantiateSnake() {
    return [
            { x: 10, y: 10 },
            { x: 10, y: 9 },
            { x: 10, y: 8 }
    ];
}

function instantiatePellets() {
    return []
}

function pullFromQue() {
    var result = que.shift();
    if (que.length == 0) que.push(result);
    return result;
}

function getSelector(block) {
    return "#block" + block.x + "-" + block.y;
}

function moveSnake(direction) {
    var oldHead = { x: snake[0].x, y: snake[0].y };
    var hitPellet = false;

    // update the position of the head
    var xChange = 0;
    var yChange = 0;
    switch(direction){
        case 'l':
            xChange = -1;
            yChange = 0;
            break;
        case 'u':
            xChange = 0;
            yChange = 1;
            break;
        case 'r':
            xChange = 1;
            yChange = 0;
            break;
        case 'd':
            xChange = 0;
            yChange = -1;
            break;
    }

    snake[0].x += xChange;
    snake[0].y += yChange;
    
    // check if head is on pellet
    for (var i = 0; i < pellets.length; i++) {
        if (pellets[i].x == snake[0].x && pellets[i].y == snake[0].y) {
            hitPellet = true;
        }
    }
    
    // move rest of snake
    if (hitPellet) {
        snake.push(snake[snake.length - 1]);
    } else {
        toWhite.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y })
    }
    for (var i = snake.length - 1; i > 1; i--) {
        snake[i] = snake[i - 1];
    }
    snake[1] = oldHead;


    console.log(snake);
}

function gameOver() {
    return
}