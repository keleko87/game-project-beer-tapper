function Beer(barmanPosition) {
  // this.direction = 'W';  // From barman to beer
  this.beerPosition = barmanPosition;
  this.crashed = false;
  this.full = false;
}



Beer.prototype.slideRight = function() {
  return this.beerPosition[1] += 1;
};

Beer.prototype.slideLeft = function() {
  return this.beerPosition[1] -= 1;
};

Beer.prototype.isEmpty = function(){
  if(this.position[1] === 0) return true;
};
