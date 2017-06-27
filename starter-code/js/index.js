var board = new Board();
var barman = new Barman();
var client1 = new Client([0, 0], 1000);
// var client2 = new Client([1, 0], 1000);
// var client3 = new Client([2, 0], 800);
// var client4 = new Client([3, 0], 1600);

// Print board
function printBoard(board, p) {
  var container = $('#container-game');

  board.grid.forEach(function(arrRow, y) {
    var row = $('<div>').addClass('row').attr('index', y);

    for (var x = 0; x < arrRow.length; x++) {
      var column = $('<div>').attr('y', y).attr('x', x);
      if (x === 0) {
        column.addClass('hidden');
      }
      if (y === 0 && x === 9) {
        column.addClass('barman');
        // column.text(arrRow[x]);
        row.append(column);
      } else {
        // column.text(arrRow[x]);
        row.append(column);
      }
    }
    container.append(row);
  });
}



var intervalIdClientRight;

function moveClientRight(client1) {
  if (client1.isHidden()) {

    intervalIdClientRight = setInterval(function() {
      if (client1.goRight()) {
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

      var row = $("div[index='" + client1.clientPosition[0] + "']");
      var prev = client1.clientPosition[1] + 1;
      var current = $(row).children('div[x="' + client1.clientPosition[1] + '"]');
      current.addClass('client');
      $('div[x="' + prev + '"]').removeClass('client');
    } else {
      alert('Congratulations!! Give that man a new!');
      location.reload();
      clearInterval(intervalId);
    }

  }, client1.speed / 4);
}



/******************** BARMAN ********************************/


var intervalIdNewBeer;

function giveNewBeer(client1) {
  var newBeer = {};
  newBeer = barman.giveNewBeer();

  intervalIdNewBeer = setInterval(function() {



      var collision = addCollision(client1, newBeer);

      if (!client1.hasBeer) {
        if (newBeer.beerPosition[1] > 1) {

          newBeer.slideLeft();
          var row = $("div[index='" + newBeer.beerPosition[0] + "']");

          var prev = newBeer.beerPosition[1] + 1;
          var current = $(row).children('div[x="' + newBeer.beerPosition[1] + '"]');
          current.addClass('beer');
          $('div[x="' + prev + '"]').removeClass('beer');

        } else if (newBeer.beerPosition[1] == 1) {
          deleteBeer(newBeer);
          clearInterval(intervalIdNewBeer);
          alert('Beer crashed!!!');
          location.reload();
          return;
        }

      } else {
        console.log('else giveNewBeer0');
        moveClientLeft(client1);
        deleteBeer(newBeer);
        clearInterval(intervalIdNewBeer);

      }
    },
    500);
}

function barmanGoUp() {
  barman.goUp();
  var prev = barman.position[0] - 1;
  $('.row').each(function(index, elem) {
    $('div[index="' + index + '"]').children().removeClass('barman');
  });
  var current = $('div[index="' + barman.position[0] + '"]').children().last().addClass('barman');
}

function barmanGoDown() {
  barman.goDown();
  var prev = barman.position[0] + 1;
  $('.row').each(function(index, elem) {
    $('div[index="' + index + '"]').children().removeClass('barman');
  });
  var current = $('div[index="' + barman.position[0] + '"]').children().last().addClass('barman');
}


/**********************   BEER **************************************************/

function deleteBeer(newBeer) {
  console.log(' BEER POSITION', newBeer.beerPosition[1]);
  var row = $("div[index='" + newBeer.beerPosition[0] + "']");
  var current = $(row).children('div[x="' + newBeer.beerPosition[1] + '"]');
  current.removeClass('beer');
}

function addCollision(client1, newBeer) {
  var interAddColision = setInterval(function() {
    if (newBeer && client1) {
      if ((newBeer.beerPosition[0] === client1.clientPosition[0]) && (newBeer.beerPosition[1] === client1.clientPosition[1])) {
        client1.hasBeer = true;
        return client1.hasBeer;
      } else {
        return false;
      }
    }
  }, 10);

}

function beerCrashed(newBeer) {
  if (newBeer.crashed) {
    alert('Barman losts!!');
  }
}




// Listener to move paddle
function moveListeners(event) {
  var keys = [38, 40, 65];

  if (keys.indexOf(event.keyCode) < 0)
    return;

  switch (event.keyCode) {
    case 38: // Up
      barmanGoUp();
      break;
    case 40: // Down
      barmanGoDown();
      break;
    case 65: // give a new beer
      giveNewBeer(client1);
      break;
  }
}

function initClient(client) {
  setTimeout(function() {
    moveClientRight(client);
  }, client.speed);
}

/*********************** HTML DOM interaction ****************************************************************/
$(document).ready(function() {

  printBoard(board);

  $('#start').on('click', function() {
    $(this).attr('disabled', 'disabled').addClass('disabled');
    $(document).on('keydown', moveListeners);
    initClient(client1);
    // initClient(client2);
  });

});
