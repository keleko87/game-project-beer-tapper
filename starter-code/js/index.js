var barman = new Barman();
var client1 = new Client([0, 0]);
var board = new Board();



// Print board
function printBoard(board, p) {
  var container = $('#container-game');

  board.grid.forEach(function(arrRow, y) {
    var row = $('<div>').addClass('row').attr('index', y);
    console.log('y', y);

    for (var x = 0; x < arrRow.length; x++) {
      var column = $('<div>').attr('y', y).attr('x', x).text(arrRow[x]);
      row.append(column);
    }
    container.append(row);
  });
}


function moveClientRight(client1) {
  if (client1.isHidden()) {

    var intervalId = setInterval(function() {
      if (client1.goRight()) {

        console.log('move', client1.clientPosition[1]);
        var row = $("div[index='" + client1.clientPosition[0] + "']");
        var prev = client1.clientPosition[1] - 1;
        var current = $(row).children('div[x="' + client1.clientPosition[1] + '"]');
        current.addClass('client');
        $('div[x="' + prev + '"]').removeClass('client');
      } else {
        clearInterval(intervalId);
      }

    }, 1000);
  }
}

function moveClientLeft(client1) {
  if (!client1.isHidden()) {

    var intervalId = setInterval(function() {
      if (client1.goLeft()) {


        console.log('move', client1.clientPosition[1]);
        var row = $("div[index='" + client1.clientPosition[0] + "']");
        var prev = client1.clientPosition[1] - 1;
        var current = $(row).children('div[x="' + client1.clientPosition[1] + '"]');
        current.addClass('client');
        $('div[x="' + prev + '"]').removeClass('client');
      } else {
        clearInterval(intervalId);
      }

    }, 1000);
  }
}

var newBeer = {};

function giveNewBeer() {
  console.log('barmanpos: ', barman.position);
  newBeer = barman.giveNewBeer(barman.position);
  console.log(newBeer);

  var intervalId = setInterval(function() {
      if (newBeer.beerPosition[1] > 0) {

        newBeer.slideLeft();

        console.log('slidess', newBeer.beerPosition[1]);
        var row = $("div[index='" + newBeer.beerPosition[0] + "']");
        var prev = newBeer.beerPosition[1] + 1;
        var current = $(row).children('div[x="' + newBeer.beerPosition[1] + '"]');
        current.addClass('beer');
        $('div[x="' + prev + '"]').removeClass('beer');

      } else {
        clearInterval(intervalId);
      }
    },
    1000);
}

// function addCollision(client1, newBeer) {
//   if (newBeer.beerPosition === client1.ClientPosition) {
//     console.log(newBeer.beerPosition,'========', client1.ClientPosition);
//     client1.hasBeer = true;
//     moveClientLeft(client1);
//   }
// }


// Listener to move paddle
function moveListeners(event) {
  var keys = [38, 40, 65];

  if (keys.indexOf(event.keyCode) < 0)
    return;

  switch (event.keyCode) {
    case 38: // Up
      barman.goUp();
      console.log('key up');
      break;
    case 40: // Down
      barman.goDown();
      console.log('key down');
      break;
    case 65: // give a new beer
      console.log('give a new!!!');
      giveNewBeer();
      break;
  }
}







/*********************** HTML DOM interaction ****************************************************************/
$(document).ready(function() {

  printBoard(board);
  $(document).on('keydown', moveListeners);

  $('#start').on('click', function() {
    moveClientRight(client1);
  });


});
