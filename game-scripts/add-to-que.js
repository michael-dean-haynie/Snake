$('html').on('keydown', function (event) {
    switch(event.keyCode) {
        case 37:
            var result = 'l';
            break;
        case 38:
            var result = 'u';
            break;
        case 39:
            var result = 'r';
            break;
        case 40:
            var result = 'd';
            break;
        default:
            var result = que[que.length - 1];
    }
    if (que[que.length - 1] != result || que.length == 0) {
        //if (que.length == 1) que.pop();
        que.push(result);
        console.log(que);
    } 
});