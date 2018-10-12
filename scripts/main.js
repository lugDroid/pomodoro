// Preset class
function Preset(id, defaultValue) {
  this.value = defaultValue;
  this.MIN = 5;
  this.MAX =55;

  this.add = function(inc) {
    if (this.value < this.MAX) {
      this.value += inc;
    }
  };

  this.sub = function(dec) {
    if (this.value > this.MIN) {
      this.value -= dec;
    }
  };

  this.update = function() {
    document.getElementById(id).innerHTML = this.value;
  };
}

// Button class
function Button(id, presetObj, type, change) {
  document.getElementById(id).onclick = function(e) {
    if (type === 'add') {
      presetObj.add(change);
    } else {
      presetObj.sub(change);
    }

    presetObj.update();
  };
}

var pomPreset = new Preset('pomodoro', 25);
var restPreset = new Preset('rest', 5);

pomPreset.update();
restPreset.update();

var addPomBtn = new Button('add-pom-btn', pomPreset, 'add', 5);
var subPomBtn = new Button('sub-pom-btn', pomPreset, 'sub', 5);

var addRestBtn = new Button('add-rest-btn', restPreset, 'add', 5);
var subRestBtn = new Button('sub-rest-btn', restPreset, 'sub', 5);