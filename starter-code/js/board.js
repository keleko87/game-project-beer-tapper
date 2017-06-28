var barman = new Barman();
var client1 = new Client(0);
var client2 = new Client(100);

var beer1 = new Beer(100);

function Board() {}

// Listener to move Barman
function moveListeners(event) {
  var keys = [38, 40, 65];

  if (keys.indexOf(event.keyCode) < 0)
    return;

  switch (event.keyCode) {
    case 38: // Up
      barman.goUp();
      break;
    case 40: // Down
      barman.goDown();
      break;
    case 65: // give a new beer
      giveNewBeer(barman);
      break;
  }
}


function giveNewBeer(barman) {
  var newBeer = barman.giveBeer();
  renderNewBeer(newBeer);
  return newBeer;
}

function renderNewBeer(newBeer) {
  newBeer.renderBeer();
  var intervalBeer = setInterval(function() {
    newBeer.slideLeft();
  }, 10);

}

$(document).ready(function() {
  $('#start').on('click', function() {
    $(this).attr('disabled', 'disabled').addClass('disabled');
    $(document).on('keydown', moveListeners);

    // RenderClients
    client1.renderClient();
    client2.renderClient();
    var intervalGame = setInterval(function() {
      console.log('interval');
      client1.goRight();
      client2.goRight();

    }, 10);

  });
});
