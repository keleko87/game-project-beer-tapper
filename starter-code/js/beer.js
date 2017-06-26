function Beer(barmanPosition) {
  // this.direction = 'W';  // From barman to client
  this.position = barmanPosition;
  this.crashed = false;
}


//
// Beer.prototype.moveBeerToClient = function(beerPosition) {
//   var beerPosition = [];
//   beerPosition[0] = barmanPosition[0];
//   beerPosition[1] = barmanPosition[1] - 1;
//   return beerPosition;
// };



Beer.prototype.isEmpty = function(){
  if(this.position[1] === 0) return true;
};
