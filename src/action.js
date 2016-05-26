function Action() {
  this.initialize.apply(this, arguments);
}

Action.prototype.constructor = Action;

Action.prototype.initialize = function(type) {
  this.initMembers();
  this.type = type;
  if(type === "key") {
    this.keyName = arguments[1];
    this.keyDown = arguments[2];
  }
  else if(type === "delay") {
    this.value = arguments[1];
  }
  else if(type === "keymap") {
    this.value = arguments[1];
  }
}

Action.prototype.initMembers = function() {
  this.type = "";
  this.keyName = "";
  this.keyDown = true;
  this.value = 0;
}

Action.prototype.get = function() {
  switch(this.type) {
    case "key":
      return { type: "key", name: this.keyName, down: this.keyDown };
      break;
    case "keymap":
      return { type: "keymap", value: this.value };
      break;
    case "delay":
      return { type: "delay", value: this.value };
      break;
  }
}
