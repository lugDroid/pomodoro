// ### CONSTRUCTOR FUNCTIONS ###

// presets
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

// timer
function Timer() {
  var running;
  var interval;
}

Timer.prototype.isRunning = function() {
  return this.running; 
};

Timer.prototype.start = function() {
  this.running = true;
  console.log('timer started');
  this.interval = setInterval(function() {
    console.log('timer running');}, 1000);
};

Timer.prototype.pause = function() {
  this.running = false;
  clearInterval(this.interval);
  console.log('timer stopped');
};

Timer.prototype.update = function() {
  console.log('timer running');
};

// ### MODEL VIEW ###

// Model
function Model() {
  this.pomodoroPreset = new Preset('pomodoro', 25);
  this.restPreset = new Preset('rest', 5);
  this.timer = new Timer();
}

// View
function View(model) {
  this.model = model;
  var self = this;

  // get page elements
  this.incPomBtn = document.getElementById('add-pom-btn');
  this.decPomBtn = document.getElementById('sub-pom-btn');
  this.incRestBtn = document.getElementById('add-rest-btn');
  this.decRestBtn = document.getElementById('sub-rest-btn');
  this.pomPreset = document.getElementById('pomodoro');
  this.restPreset = document.getElementById('rest');
  this.startBtn = document.getElementById('start-stop');

  // update view
  this.update = function() {
    this.pomPreset.innerHTML = this.model.pomodoroPreset.getValue();
    this.restPreset.innerHTML = this.model.restPreset.getValue();
  };

  // preset buttons events
  this.incPomBtn.onclick = function(e) {
    self.model.pomodoroPreset.inc();
    self.update();
  };

  this.decPomBtn.onclick = function(e) {
    self.model.pomodoroPreset.dec();
    self.update();
  };

   this.incRestBtn.onclick = function(e) {
    self.model.restPreset.inc();
    self.update();
  };

  this.decRestBtn.onclick = function(e) {
    self.model.restPreset.dec();
    self.update();
  };

  // start button event
  this.startBtn.onclick = function(e) {
    if (!self.model.timer.isRunning()) {
      self.model.timer.start();
      e.target.innerHTML = 'PAUSE';
    } else {
      self.model.timer.pause();
      e.target.innerHTML = 'START';
    }
  };
}

// Main
var model = new Model();
var view = new View(model);

view.update();