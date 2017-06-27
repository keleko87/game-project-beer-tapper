function Beer() {
  // this.direction = 'W';  // From barman to beer
  this.beerPosition = [];
  this.crashed = false;
  this.full = false;
  this.id = 0;
}

Beer.prototype.slideRight = function() {
  return this.beerPosition[1] += 1;
};

Beer.prototype.slideLeft = function() {
  return this.beerPosition[1] -= 1;
};

Beer.prototype.isEmpty = function() {
  if (this.position[1] === 0) return true;
};

Beer.prototype.crash = function() {
  if (this.beerPosition[1] === 1) {
    console.log('Crashed');
    this.crashed = true;
  }
};
