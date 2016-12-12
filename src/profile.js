function Profile() {
  this.initialize.apply(this, arguments);
}

Profile.prototype.constructor = Profile;

Profile.prototype.initialize = function(url) {
  this.initMembers();
  this.loadProfile(url);
}

Profile.prototype.initMembers = function() {
  this._source = null;
  this._suspended = false;
  this.keymaps = [];
  this._keymapIndex = 0;
  this._held = {};
  this._whitelist = null;
  this._whitelistLoading = false;
  this._mouseFuncHeld = [];
  this._bindDb = {};
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
    }
    else {
      console.log("No whitelist has been loaded.");
    }
  }.bind(this));
}

Profile.prototype.applySource = function() {
  var src = this.source();
  for(var a = 0;a < src.keymaps.length;a++) {
    var km = new Keymap(this, a);
    km.applySource(src.keymaps[a], src.bindings[a]);
    this.keymaps.push(km);
  }
}

Profile.prototype.source = function() {
  return this._source;
}

Profile.prototype.options = function() {
  if(this.source()) return this.source().options;
  return null;
}

Profile.prototype.handleInterception = function(keyCode, keyDown, keyE0, hwid, keyName, deviceType, mouseWheel, mouseMove, x, y, config) {
  var options = this.options();
  if(!options) {
    this.core().send_default();
    return;
  }
  var coreOptions = $Core.options();
  var sendDefault = true;
  var ignoreWhitelist = false;
  if(config && config.ignoreWhitelist) ignoreWhitelist = true;

  if(!this.suspended()) {
    sendDefault = false;
    var deviceNames = this.checkWhitelist(hwid);
    var onWhitelist = this.usingWhitelist() ? this.isOnWhitelist(deviceNames) : true;
    if(ignoreWhitelist) onWhitelist = true;
    var bind = this.getBind(deviceNames, keyName);
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
    else if(!bind && deviceType === $Core.DEVICE_TYPE_MOUSE) sendDefault = true;
    else if((options && (options.enableDefaults || coreOptions.enableDefaults) && !bind) || !onWhitelist) {
      this.core().send_default();
    }
  }

  if(sendDefault) this.core().send_default();
}

Profile.prototype.checkWhitelist = function(hwid) {
  var result = ["any"];
  if(this._whitelistLoading) return [];
  for(var a in this._whitelist) {
    var obj = this._whitelist[a];
    if(obj.indexOf(hwid) !== -1) result.push(a);
  }
  return result;
}

Profile.prototype.isOnWhitelist = function(deviceTypeArr) {
  for(var a = 0;a < deviceTypeArr.length;a++) {
    var deviceType = deviceTypeArr[a];
    if(this._whitelist[deviceType] !== undefined) return true;
  }
  return false;
}

Profile.prototype.usingWhitelist = function() {
  return (this._whitelist !== null && $Core.conf.usingWhitelist === true);
}

Profile.prototype.remove = function() {
  // this.core().destroy();
}

Profile.prototype.hasBind = function(origin) {
  for(var a in this._bindDb) {
    var km = this._bindDb[a];
    if(km.indexOf(origin) !== -1) return true;
  }
  return false;
}

Profile.prototype.hasBindInKeymap = function(origin, keymapIndex) {
  var km = this._bindDb[keymapIndex];
  if(!km) return false;
  if(km.indexOf(origin) !== -1) return true;
  return false;
}

Profile.prototype.hasActiveBind = function(origin) {
  if(this.hasBindInKeymap(origin, 0)) return true;
  if(this._keymapIndex > 0 && this.hasBindInKeymap(origin, this._keymapIndex)) return true;
  if(this._held[origin]) return true;
  return false;
}

Profile.prototype.getBind = function(deviceTypes, keyName) {
  for(var a = 0;a < deviceTypes.length;a++) {
    var deviceType = deviceTypes[a];
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
  return null;
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
