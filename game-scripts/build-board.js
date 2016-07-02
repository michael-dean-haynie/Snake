function buildBoard() {

    // create elements
    var rowCount = 20;
    var colCount = rowCount;

    var rowHTML = "<div class='game-board-row'></div>";
    var colHTML = ''; // will be dynamic
    for (var row = rowCount; row > 0; row--) {
        $("#game-board").append(rowHTML);

        for (var col = 1; col <= colCount; col++) {
            var rowElement = $('#game-board .game-board-row:last-child');
            var id = "block" + col + "-" + row;
            rowElement.append("<div id='"+ id +"' class='game-board-block'></div>");
        }
    }

    // size/format elements
    var blockLength = 35;
    $('.game-board-row').height(blockLength + 4); // added space for margin
    $('.game-board-block').width(blockLength);
    $('.game-board-block').height(blockLength);



}