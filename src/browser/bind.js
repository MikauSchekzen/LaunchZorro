function Bind() {
  this.initialize.apply(this, arguments);
}

Bind.prototype.constructor = Bind;

Bind.prototype.initialize = function(keymap) {
  this.initMembers();
  this._keymap = keymap;
}

Bind.prototype.initMembers = function() {
  this._keymap = null;
  this.origin = "";
  this.sequence = { down: new Sequence(this), up: new Sequence(this) };
  this._rapidfire = 0;
  this._rapidfireId = 0;
  this._toggle = false;
  this._isExtended = false;
  this.toggleActive = false;
  this.held = false;
  this.hwid = "any";
  this.elem = null;
}

Bind.prototype.keymap = function() {
  return this._keymap;
}

Bind.prototype.profile = function() {
  return this.keymap().profile();
}

Bind.prototype.core = function() {
  return this.profile().core();
}

Bind.prototype.fireSequence = function(sequence) {
  if(sequence === this.sequence.up && this.sequence.down.running()) this.sequence.down.cancel();
  else if(sequence === this.sequence.down && this.sequence.up.running()) this.sequence.up.cancel();
  sequence.start();
}

Bind.prototype.press = function() {
  if(!this.held) {
    this.held = true;

    if(!this._toggle || (this._toggle && !this.toggleActive)) {
      if(this._toggle) this.toggleActive = true;
      this.sequence.down.onEnd.addOnce(this.sequenceDownEndFunction, this);
      this.fireSequence(this.sequence.down);
    }
    else if(this._toggle && this.toggleActive) {
      if(this._toggle) this.toggleActive = false;
      this.sequence.up.onEnd.addOnce(this.sequenceUpEndFunction, this);
      this.fireSequence(this.sequence.up);
    }
  }
}

Bind.prototype.release = function() {
  this.held = false;

  if(!this._toggle) {
    this.sequence.up.onEnd.addOnce(this.sequenceUpEndFunction, this);
    this.fireSequence(this.sequence.up);
  }
}

Bind.prototype.sequenceDownEndFunction = function() {
  // Rapidfire
  if(this._rapidfire > 0 && this.held) {
    this._rapidfireId = window.setTimeout(function() {
      this.sequence.up.onEnd.addOnce(this.sequenceUpEndFunction, this);
      this.fireSequence(this.sequence.up);
    }.bind(this), this._rapidfire);
  }
}

Bind.prototype.sequenceUpEndFunction = function() {
  // Rapidfire
  if(this._rapidfire > 0 && this.held) {
    this._rapidfireId = window.setTimeout(function() {
      this.sequence.down.onEnd.addOnce(this.sequenceDownEndFunction, this);
      this.fireSequence(this.sequence.down);
    }.bind(this), this._rapidfire);
  }

  if(this._rapidfireId && !this.held) {
    window.clearInterval(this._rapidfireId);
    this._rapidfireId = null;
  }
}

Bind.prototype.applySource = function(src) {
  var jra = false;
  if(src.jra) jra = true;

  var doAlt = false;
  var doShift = false;
  var doCtrl = false;
  if(src.alt) {
    if((typeof src.alt === "string" && src.alt === "1") ||
    (typeof src.alt === "number" && src.alt === 1) ||
    (typeof src.alt === "boolean" && src.alt === true)) {
      this.sequence.down.addAction(new Action("key", "lalt", true));
      doAlt = true;
    }
  }
  if(src.ctrl) {
    if((typeof src.ctrl === "string" && src.ctrl === "1") ||
    (typeof src.ctrl === "number" && src.ctrl === 1) ||
    (typeof src.ctrl === "boolean" && src.ctrl === true)) {
      this.sequence.down.addAction(new Action("key", "lctrl", true));
      doCtrl = true;
    }
  }
  if(src.shift) {
    if((typeof src.shift === "string" && src.shift === "1") ||
    (typeof src.shift === "number" && src.shift === 1) ||
    (typeof src.shift === "boolean" && src.shift === true)) {
      this.sequence.down.addAction(new Action("key", "lshift", true));
      doShift = true;
    }
  }

  if(src.hardware_id) {
    this.hwid = src.hardware_id;
  }

  // Keymap
  if(src.key.match(/KEYMAP([0-9]+)/i)) {
    var i = parseInt(RegExp.$1);
    this.sequence.down.addAction(new Action("keymap", i-1));
    this.sequence.up.addAction(new Action("keymap", 0));
  }
  // Extra Action
  else if(src.key.match(/EA:(.+)/i)) {
    var action = RegExp.$1;
    this.parseExtraAction(action, src);
  }
  // Normal Key
  else {
    this.sequence.down.addAction(new Action("key", src.key, true));
    if(jra) {
      this.sequence.down.addAction(new Action("delay", 30));
      this.sequence.down.addAction(new Action("key", src.key, false));
      if(doAlt) this.sequence.down.addAction(new Action("key", "lalt", false));
      if(doCtrl) this.sequence.down.addAction(new Action("key", "lctrl", false));
      if(doShift) this.sequence.down.addAction(new Action("key", "lshift", false));
      this.sequence.down.addAction(new Action("delay", 30));
      if(doAlt) this.sequence.down.addAction(new Action("key", "lalt", true));
      if(doCtrl) this.sequence.down.addAction(new Action("key", "lctrl", true));
      if(doShift) this.sequence.down.addAction(new Action("key", "lshift", true));
      this.sequence.down.addAction(new Action("key", src.key, true));
    }
    this.sequence.up.addAction(new Action("key", src.key, false));
  }

  this.origin = src.origin;
  var kmI = this.keymap()._keymapIndex;
  if(!this.profile().hasBindInKeymap(this.origin, kmI)) {
    if(this.profile()._bindDb[kmI]) this.profile()._bindDb[kmI].push(this.origin);
    else this.profile()._bindDb[kmI] = [this.origin];
  }

  if(doAlt) this.sequence.up.addAction(new Action("key", "lalt", false));
  if(doCtrl) this.sequence.up.addAction(new Action("key", "lctrl", false));
  if(doShift) this.sequence.up.addAction(new Action("key", "lshift", false));

  if(src.rapidfire) {
    if(typeof src.rapidfire === "string") this._rapidfire = parseInt(src.rapidfire);
    else if(typeof src.rapidfire === "number") this._rapidfire = src.rapidfire;
  }

  if(src.toggle) {
    if((typeof src.toggle === "string" && src.toggle === "1") ||
    (typeof src.toggle === "number" && src.toggle === 1) ||
    (typeof src.toggle === "boolean" && src.toggle === true)) this._toggle = true;
  }
}

Bind.prototype.parseExtraAction = function(action, src) {
  if(action.toUpperCase() === "LOADPROFILE") {
    this.sequence.up.addAction(new Action("loadprofile", src.extra_params[0], src.extra_params[1]));
  } else if(action.toUpperCase() === "EXTENDED") {
    this._isExtended = true;
    this.parseExtendedAction(src);
  }
}

Bind.prototype.parseExtendedAction = function(src) {
  var list = [
    {srcList: src.extended.press, sequence: this.sequence.down},
    {srcList: src.extended.release, sequence: this.sequence.up}
  ];
  for(var a = 0;a < list.length;a++) {
    var obj = list[a];
    for(var b = 0;b < obj.srcList.length;b++) {
      var srcAction = obj.srcList[b];
      if(srcAction.type === "key") obj.sequence.addAction(new Action("key", srcAction.key, srcAction.params[0]));
      else if(srcAction.type === "delay") obj.sequence.addAction(new Action("delay", srcAction.params[0]));
    }
  }
}
