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
  if (this.position[0] < 4) {
    this.position[0] += 1;
  }
  return this.position;
};

Barman.prototype.giveNewBeer = function() {  // setInterval();
  var newBeer = new Beer();
  newBeer.beerPosition[0] = this.position[0];
  newBeer.beerPosition[1] = 9;
  return newBeer;  // From right to left
};



Barman.prototype.takeEmptyBeer = function(positionbeer) {
  positionBarman[1] += 1;
};
