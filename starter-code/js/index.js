var barman = new Barman();
var client = new Client();
var beer = new Beer();
var board = new Board();



// Print board
function printBoard(board,p) {
  var container = $('#container-game');

  board.grid.forEach(function(arrRow, y) {
    var row = $('<div>').addClass('row');
    console.log('y',y);

    for (var x = 0; x < arrRow.length; x++) {
      var column = $('<div>').attr('x', x).attr('y', y).text(arrRow[x]);
      row.append(column);
    }
    container.append(row);
  });
}




// function printBoard() {
//   // Print grid in browser
//   var printGrid = document.getElementById("container-game");
//
//   for (var h = 0; h < grid.length; h++) {
//
//     if (h % cols === 0) { // If i is divisible by number of columns, finished the row and include line jump
//       printGrid.innerHTML += '<br><br>';
//     }
//
//     // print obstacles
//     if (grid[h][2] === 'Obstacle' && grid[h][2] !== 'Goal') {
//       printGrid.innerHTML += '&nbsp;<span id=' + i + ' style="color:blue">[-X-]</span>&nbsp;&nbsp;';
//     } else {
//       // printGrid.innerHTML += '&nbsp;<span id=' + h+ '>[' + grid[h][0] + ',' + grid[h][1] + ']</span>&nbsp;&nbsp;';
//       printGrid.innerHTML += '&nbsp;<span id="">Empty</span>&nbsp;&nbsp;';
//     }
//   }
// }


$(document).ready(function() {

  printBoard(board);

  $('#start').on('click', function() {
    // ball.move(1); // Init direction is 1;
  });



  // Listener to move paddle
  function moveListeners(event) {
    var keys = [38, 40];
    var pixels;
    var paddle = $('#paddle-1');

    if (keys.indexOf(event.keyCode) < 0)
      return;

    switch (event.keyCode) {

      case 38:
        pixels = maxTop();
        var newPos = paddle.css('top', pixels + 'px').position();
        console.log(newPos);
        break;

      case 40:
        pixels = maxBottom();
        newPos = paddle.css('top', pixels + 'px').position();
        console.log(newPos);
        break;
    }
  }

  $(document).on('keydown', moveListeners);

});

function initPositionBall() {

}

function activatePaddle2() {}

function renderGame() {}

function renderScore() {}

function renderBall() {}

function renderPaddle() {}
