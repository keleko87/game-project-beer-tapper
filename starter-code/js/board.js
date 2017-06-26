function Board() {
  this.barman = 'BM';
  this.client = 'CL';
  this.grid = [
    ['CL', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'BM'],
    ['CL', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['CL', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['CL', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ];
}


//
// Board.prototype.crashBeer = function() {
//   if ((this.BeerPosition[1] === 0) && !this.isEmpty()) {
//     this.crashed = true;
//   }
//   if ((this.BeerPosition[1] == this.board.length - 1) && this.isEmpty()) {
//     this.crashed = true;
//   }
// };
