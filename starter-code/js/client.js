function Client(clientPosY) {
  this.clientPosX = 0;
  this.clientPosY = clientPosY;
  this._renderClient();
}

Client.prototype.goRight = function() {
  if (this.clientPosX < 950) {
    this.clientPosX += 1;
    this.client.css({
      "left": "" + this.clientPosX + "px"
    });
  } else {
    this.client.addClass('client-crash');
  }
  return this.clientPosX;
};

Client.prototype.goLeft = function() {
  if (this.clientPosX > 0) {
    this.clientPosX -= 1;
    this.client.css({
      "left": "" + this.clientPosX + "px"
    });
  } else {
    this.client.addClass('hasbeer');
  }
  return this.clientPosX;
};

Client.prototype._renderClient = function() {
  this.client = $("<div>").addClass('client').css({
    "top": this.clientPosY,
    "left": this.clientPosX
  });
  $("#container-game").append(this.client);
};

Client.prototype.deleteClient = function() {
  this.client.remove();
};
