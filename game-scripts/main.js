// Global Variables
var que = ['u'];
var pellets = instantiatePellets();
var snake = instantiateSnake();
var toWhite = [];
var gameIsOver = false;
var lastDirection = '';
var difficulty = '';


function main(gameDiff) {
    difficulty = gameDiff;
    $('#start-page').hide();
    $('#game-page').show();
    var cycleDelay = gameDiff == 1 ? 300 : gameDiff == 2 ? 100 : 50;
    buildBoard();
    startCountdown(cycle, cycleDelay);
}

function cycle() {
    if (gameIsOver) return;
    updateScore();
    var direction = pullFromQue();

    /*
    Steps of the cycle
        - calculate positions
        - check to add pellets
        - check for game over
        - paint board
    */
    
    moveSnake(direction);

    // check if head hit tail or went out of bounds
    for (var i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            if (!gameIsOver) gameOver();
            return;
        } else if ((snake[0].x < 1 || snake[0].x > 20) || (snake[0].y < 1 || snake[0].y > 20)) {
            if (!gameIsOver) gameOver();
            return;
        }
    }

    checkForPellets();

    // paint board
    for (var i = 0; i < snake.length; i++){
        var selector = getSelector(snake[i]);
        $(selector).css('background-color', 'black');
    }
    for (var i = 0; i < pellets.length; i++) {
        var selector = getSelector(pellets[i]);
        $(selector).css('background-color', 'Green');
    }
    while(toWhite.length > 0) {
        var selector = getSelector(toWhite.shift());
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
    var result = que.length > 0 ? que.shift() : lastDirection;
    lastDirection = result;
    return result;
}

function getSelector(block) {
    return "#block" + block.x + "-" + block.y;
}

function moveSnake(direction) {
    var oldHead = { x: snake[0].x, y: snake[0].y };
    var hitPellet = false;
    var pelletID = '';

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
            pelletID = i;
            }
        }
    
    // move rest of snake
    if (hitPellet) {
        snake.push(snake[snake.length - 1]);
        pellets.splice(pelletID, 1);
    } else {
        toWhite.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y })
    }
    for (var i = snake.length - 1; i > 1; i--) {
        snake[i] = snake[i - 1];
    }
    snake[1] = oldHead;
}

function gameOver() {
    gameIsOver = true;
    $('#game-page').hide();
    var html = "<a href='PlaySnake.html?d="+difficulty+"'><button id='play-again'>Play Again?</button></a>";
    $('#game-over-page').append(html);
    $('#play-again').focus();
}

function checkForPellets(){
    if (pellets.length < 5) {
        do {
            var openBlock = true;
            var x = Math.floor(Math.random() * 20) + 1;
            var y = Math.floor(Math.random() * 20) + 1;

            // check for another pellet
            for (var i = 0; i < pellets.length; i++) {
                if (pellets[i].x == x.x && pellets[i].y == y) {
                    openBlock = false;
                }
            }

            // check for part of snake
            for (var i = 0; i < snake.length; i++) {
                if (snake[i].x == x.x && snake[i].y == y) {
                    openBlock = false;
                }
            }
        } while (!openBlock);
        
        pellets.push({ x: x, y: y });
   }
}

function startCountdown(cycle, cycleDelay) {
    var div = $('#countdown');
    setTimeout(function () {
        div.empty()
        div.append('<p>' + 3 + '</p>');
    }, 1);
    setTimeout(function () {
        div.empty()
        div.append('<p>' + 2 + '</p>');
    }, 1000);
    setTimeout(function () {
        div.empty()
        div.append('<p>' + 1 + '</p>');
    }, 2000);
    setTimeout(function () {
        div.empty()
        div.append("<p>Score: <span id='score'> + 3 + '</span></p>");
        setInterval(cycle, cycleDelay);
    }, 3000);
}

function updateScore() {
    var span = $('#score');
    var text = " " + snake.length;
    span.empty()
    span.append(text);
}
