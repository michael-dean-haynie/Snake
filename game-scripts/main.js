// Global Variables
var que = ['u'];
var board = instantiateBoard();


function main(gameDiff) {
    $('#start-page').hide();
    $('#game-page').show();
    var cycleDelay = gameDiff == 1 ? 1000 : gameDiff == 2 ? 500 : 300;
    buildBoard();
    setInterval(cycle, cycleDelay);


}

function cycle() {
    console.log('New cycle!');
    direction = pullFromQue();
    /*
    Steps of the cycle
    - Iterate through blocks and while doing that..
        - calculate positions
        - check for game over
        - paint board
    */
    for (var i = 0; i < board.length; i++) {
        block = board[i];
        paintBlock(block);
    }

}

//----------------------------------------------------------------
//----------------------------------------------------------------
function instantiateBoard() {
    var board = [];

    // Add all default blocks to the board 
    for (var row = 1; row <= 20; row++) {
        for (var col = 1; col <= 20; col++) {
            block = {
                id: "block" + col + "-" + row,
                x: col,
                y: row,
                snakeHead: col == 10 && row == 10 ? true : false,
                snakeBody: false,
                pellet: false
            }
            board.push(block);
        }
    }
    return board;
}

function paintBlock(block) {
    var color = block.pellet ? 'Green' : block.snakeBody ? "Black" : block.snakeHead ? "Red" : "White";
    $('#' + block.id).css('background-color', color);
}

function pullFromQue() {
    var result = que.shift();
    if (que.length == 0) que.push(result);
    return result;
}
