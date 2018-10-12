// constructor function for presets
function Preset(id, defaultValue) {
  this.id = id;
  this.value = defaultValue;
  this.MIN = 5;
  this.MAX =55;
  this.CHANGE = 5;
}

Preset.prototype.inc = function() {
  if (this.value < this.MAX) {
    this.value += this.CHANGE;
  }
};

Preset.prototype.dec = function() {
  if (this.value > this.MIN) {
    this.value -= this.CHANGE;
  }
};

Preset.prototype.getValue = function() {
  return this.value;
};

Preset.prototype.update = function() {
  document.getElementById(this.id).innerHTML = this.value;
};

// Model
function Model() {
  this.pomodoroPreset = new Preset('pomodoro', 25);
  this.restPreset = new Preset('rest', 5);
}

// View
function View(model) {
  this.model = model;
  this.incPomBtn = document.getElementById('add-pom-btn');
  this.decPomBtn = document.getElementById('sub-pom-btn');
  this.incRestBtn = document.getElementById('add-rest-btn');
  this.decRestBtn = document.getElementById('sub-rest-btn');
  this.pomPreset = document.getElementById('pomodoro');
  this.restPreset = document.getElementById('rest');

  this.update = function() {
    this.pomPreset.innerHTML = model.pomodoroPreset.getValue();
    this.restPreset.innerHTML = model.restPreset.getValue();
  };

  this.incPomBtn.onclick = function(e) {
    model.pomodoroPreset.inc();
    view.update();
  };

  this.decPomBtn.onclick = function(e) {
    this.model.pomodoroPreset.dec();
    this.update();
  };

   this.incRestBtn.onclick = function(e) {
    this.model.rest.Preset.inc();
    this.update();
  };

  this.decRestBtn.onclick = function(e) {
    this.model.rest.Preset.dec();
    this.update();
  };
}

// Main
var model = new Model();
var view = new View(model);

view.update();

/*// constructor function for preset buttons
function Button(id, presetObj, type, change) {
  document.getElementById(id).onclick = function(e) {
    if (type === 'add') {
      presetObj.inc();
    } else {
      presetObj.dec();
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
var subRestBtn = new Button('sub-rest-btn', restPreset, 'sub', 5);*/