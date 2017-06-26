var board = new Board();
var barman = new Barman();
var client1 = new Client([0, 0]);

// Print board
function printBoard(board, p) {
  var container = $('#container-game');

  board.grid.forEach(function(arrRow, y) {
    var row = $('<div>').addClass('row').attr('index', y);

    for (var x = 0; x < arrRow.length; x++) {
      var column = $('<div>').attr('y', y).attr('x', x).text(arrRow[x]);
      row.append(column);
    }
    container.append(row);
  });
}

var intervalIdClientRight;

function moveClientRight(client1) {
  if (client1.isHidden()) {

    intervalIdClientRight = setInterval(function() {
      if (client1.goRight()) {

        console.log('moveRIGHT', client1.clientPosition[1]);
        var row = $("div[index='" + client1.clientPosition[0] + "']");
        var prev = client1.clientPosition[1] - 1;
        var current = $(row).children('div[x="' + client1.clientPosition[1] + '"]');
        current.addClass('client');
        $('div[x="' + prev + '"]').removeClass('client');
      } else {
        clearInterval(intervalIdClientRight);
      }

    }, client1.timeDrink);
  }
}

function moveClientLeft(client1) {
  // if (!client1.isHidden()) {

  var intervalId = setInterval(function() {
    if (client1.goLeft()) {
      clearInterval(intervalIdNewBeer);
      clearInterval(intervalIdClientRight);

      console.log('moveLEFTTTT', client1.clientPosition[1]);
      var row = $("div[index='" + client1.clientPosition[0] + "']");
      var prev = client1.clientPosition[1] + 1;
      var current = $(row).children('div[x="' + client1.clientPosition[1] + '"]');
      current.addClass('client');
      $('div[x="' + prev + '"]').removeClass('client');
    } else {
      clearInterval(intervalId);
    }

  }, client1.speed);
}

var newBeer = {};
var intervalIdNewBeer;

function giveNewBeer(client1) {
  newBeer = barman.giveNewBeer(barman.position);

  intervalIdNewBeer = setInterval(function() {

      var collision = addCollision(client1, newBeer);
      console.log('hasBeer',collision,'-------',client1.hasBeer);

      if (!client1.hasBeer) {
        if (newBeer.beerPosition[1] > 0) {

          newBeer.slideLeft();
          console.log('slidess', newBeer.beerPosition[1]);
          var row = $("div[index='" + newBeer.beerPosition[0] + "']");

          var prev = newBeer.beerPosition[1] + 1;
          var current = $(row).children('div[x="' + newBeer.beerPosition[1] + '"]');
          current.addClass('beer');
          $('div[x="' + prev + '"]').removeClass('beer');
        } else {
          return;
        }

      } else {
        console.log('else giveNewBeer0');
        moveClientLeft(client1);
        clearInterval(intervalIdNewBeer);

      }
    },
    1000);
}

// function deleteBeer(client1,newBeer){
//
// }

function addCollision(client1, newBeer) {
  var interAddColision = setInterval(function() {
    if (newBeer && client1) {
      if (newBeer.beerPosition[0] === client1.clientPosition[0] && newBeer.beerPosition[1] === client1.clientPosition[1]) {
        console.log(newBeer.beerPosition, '=====', client1.clientPosition);
        client1.hasBeer = true;
        return client1.hasBeer;
      }else{
        return false;
      }
    }
  }, 400);


}


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
      giveNewBeer(client1);
      break;
  }
}







/*********************** HTML DOM interaction ****************************************************************/
$(document).ready(function() {

  printBoard(board);
  $(document).on('keydown', moveListeners);

  $('#start').on('click', function() {

    setTimeout(function() {
      moveClientRight(client1);
    }, client1.speed);
  });


});
