function Client(clientPosition, speed, waitBeer) {
  this.name = 'CL';
  this.clientPosition = clientPosition;
  this.speed = speed; // Miliseconds
  this.waitBeer = waitBeer;
  this.hasBeer = false;
  this.hidden = true;
}

Client.prototype.goRight = function() {
  if (this.clientPosition[1] < 9) {
    this.clientPosition[1] += 1;
    this.hidden = false;
  } else {
    console.log('Barman losts!!!! Clients is in the final clientPosition ');
    return false;
  }
  return this.clientPosition;
};

Client.prototype.goLeft = function() {
  if (this.clientPosition[1] > 0) {
    this.clientPosition[1] -= 1;
    this.hidden = false;

  } else {
    this.hidden = true;
    return false;
  }
  return this.clientPosition;
};

Client.prototype.isHidden = function() {
  if (this.clientPosition[1] === 0) {
    this.hidden = true;
    return true;
  } else {
    this.hidden = false;
    return false;
  }
};

// Client.prototype.hasBeer = function() {
//   this.hasBeer = true;
//   return this.hasBeer;
// };

Client.prototype.moveToBarman = function() {
  if (!this.hasBeer()) {
    this.goRigth();
  } else {
    this.goLeft();
  }
};
