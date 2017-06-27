function Barman() {
  this.name = 'BM';
  this.position = [0, 9];
  // this.direction = 'S';
  this.beers = 0;
  this.score = 0;
  this.lost = false;
}

Barman.prototype.goUp = function() {
  if (this.position[0] > 0) {
    this.position[0] -= 1;
  }
  return this.position;
};

Barman.prototype.goDown = function() {
  if (this.position[0] < 3) {
    this.position[0] += 1;
  }
  return this.position;
};

Barman.prototype.giveNewBeer = function() {  // setInterval();
  var newBeer = new Beer();
  newBeer.beerPosition[0] = this.position[0];
  newBeer.beerPosition[1] = 9;
  this.beers +=1;
  return newBeer;  // From right to left
};

Barman.prototype.takeEmptyBeer = function(positionbeer) {
  positionBarman[1] += 1;
};

Barman.prototype.lost = function() {
  this.lost = true;
  alert('Barman losts!!');
};
