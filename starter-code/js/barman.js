function Barman() {
  this.name = 'BM';
  this.position = [0, 10];
  // this.direction = 'S';
  // this.BeerPosition = ;
  this.score = 0;
}

Barman.prototype.goUp = function() {
  if (this.position[0] > 0) {
    this.position[0] -= 1;
  }
  return this.position;
};

Barman.prototype.goDown = function() {
  if (this.position[0] < 10) {
    this.position[0] += 1;
  }
  return this.position;
};

// Barman.prototype.giveNewBeer = function() {  // setInterval();
//   var newBeer = new Beer();
//   newBeer.position
//   return this.position[1] - 1;  // From right to left
//
// };

Beer.prototype.takeEmptyBeer = function(positionbeer) {
  positionBarman[1] += 1;
};
