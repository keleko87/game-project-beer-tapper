function Client(clientPosY) {
  this.clientPosX = 0;
  this.clientPosY = clientPosY;
  this.id = clientPosY;
}

Client.prototype.goRight = function() {
  if (this.clientPosX < 950) {
    this.clientPosX += 1;
    var client = $('#' + this.id).css({
      "left": ""+this.clientPosX+"px"
    });
  }
  return this.clientPosX;
};

Client.prototype.goLeft = function() {
  if (this.clientPosX > 0) {
    this.clientPosX -= 1;
    var client = $('#' + this.clientPosY).css({
      "left": ""+this.clientPosX+"px"
    });
  }
  return this.clientPosX;
};

Client.prototype.renderClient = function() {
  $("#container-game").append("<div id='" + this.id + "' class='client'></div>");
  $('#' + this.clientPosY).css({
    "top": this.clientPosY,
    "left": this.clientPosX
  });

};
