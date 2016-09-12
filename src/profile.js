function Profile() {
  this.initialize.apply(this, arguments);
}

Profile.prototype.constructor = Profile;

Profile.prototype.initialize = function(url) {
  this.initMembers();
  this.loadProfile(url);
}

Profile.prototype.initMembers = function() {
  // this._core = null;
  this._source = null;
  this._suspended = false;
  this.keymaps = [];
  this._keymapIndex = 0;
  this._held = {};
  this._whitelist = null;
  this._whitelistLoading = false;
  this._usingWhitelist = false;
  this._mouseFuncHeld = [];
}

Profile.prototype.core = function() {
  return $Core.handler;
}

Profile.prototype.loadProfile = function(url) {
  fs.readFile(url, function(err, data) {
    this._source = JSON.parse(data);
    this.applySource();
  }.bind(this));

  this._whitelistLoading = true;
  fs.readFile("profiler/whitelist.json", function(err, data) {
    if(!err) {
      this._whitelist = JSON.parse(data);
      this._whitelistLoading = false;
      // Get whitelist element value
      var elem = document.getElementById("profile-whitelist");
      if(elem.checked) this._usingWhitelist = true;
    }
    else {
      console.log("No whitelist has been loaded.");
    }
  }.bind(this));
}

Profile.prototype.applySource = function() {
  var src = this.source();
  for(var a = 0;a < src.keymaps.length;a++) {
    var km = new Keymap(this);
    km.applySource(src.keymaps[a], src.bindings[a]);
    this.keymaps.push(km);
  }
}

Profile.prototype.source = function() {
  return this._source;
}

Profile.prototype.options = function() {
  return this.source().options;
}

Profile.prototype.handleInterception = function(keyCode, keyDown, keyE0, hwid, keyName, deviceType, mouseWheel, mouseMove, x, y) {
  var options = this.options();
  var coreOptions = $Core.options();

  if(keyName == $Core.conf.suspend_key) {
    if(keyDown) this.toggleSuspend();
  }
  else {
    if(this.suspended() || deviceType === $Core.DEVICE_TYPE_MOUSE) {
      this.core().send_default();
    }
    else {
      var deviceType = this.checkWhitelist(hwid);
      var onWhitelist = this.usingWhitelist() ? this.isOnWhitelist(deviceType) : true;
      var bind = this.getBind(deviceType, keyName);
      if(onWhitelist && bind) {
        // Key DOWN
        if(keyDown) {
          this.pressBind(bind);
        }
        // Key UP
        else {
          this.releaseBind(bind);
        }
      }
      else if((options && (options.enableDefaults || coreOptions.enableDefaults) && !bind) || !onWhitelist) {
        this.core().send_default();
      }
    }
  }
}

Profile.prototype.checkWhitelist = function(hwid) {
  if(this._whitelistLoading) return "any";
  for(var a in this._whitelist) {
    var obj = this._whitelist[a];
    if(obj.indexOf(hwid) !== -1) return a;
  }
  return "any";
}

Profile.prototype.isOnWhitelist = function(deviceType) {
  return (this._whitelist[deviceType] !== undefined);
}

Profile.prototype.usingWhitelist = function() {
  return (this._whitelist !== null && this._usingWhitelist);
}

Profile.prototype.remove = function() {
  // this.core().destroy();
}

Profile.prototype.getBind = function(deviceType, keyName) {
  // Search held bind
  var held = this._held[keyName];
  var km;
  var bind;
  if(held) {
    km = this.keymaps[held.keymap];
    bind = km.getBind(deviceType, keyName);
    if(bind) {
      return bind;
    }
  }
  // Search current keymap
  km = this.keymaps[this.keymapIndex()];
  bind = km.getBind(deviceType, keyName);
  if(bind) {
    return bind;
  }
  // Search base keymap
  km = this.keymaps[0];
  bind = km.getBind(deviceType, keyName);
  if(bind) {
    return bind;
  }
}

Profile.prototype.pressBind = function(bind) {
  if(!this._held[bind.origin]) this._held[bind.origin] = { keymap: this.keymapIndex() };
  bind.press();
}

Profile.prototype.releaseBind = function(bind) {
  bind.release();
  this._held[bind.origin] = null;
}

Profile.prototype.toggleSuspend = function() {
  if(this._suspended) {
    this.suspend(false);
  }
  else {
    this.suspend(true);
  }
}

Profile.prototype.keymapIndex = function() {
  return this._keymapIndex;
}

Profile.prototype.switchKeymap = function(value) {
  if(this._keymapIndex !== value) this._keymapIndex = value;
}

Profile.prototype.suspended = function() {
  return this._suspended;
}

Profile.prototype.suspend = function(sw) {
  this._suspended = sw;
  if(sw) {
    $Audio.play("deactivate_profile");
  }
  else {
    $Audio.play("activate_profile");
  }
}
