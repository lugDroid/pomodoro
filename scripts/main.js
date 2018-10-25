
// PRESETS MODULE
function Preset(id, addButtonId, subButtonId) {

  // Private variables
  var value;
  var MIN = 5;
  var MAX = 55;
  var CHANGE = 5;
  var addBtn = document.getElementById(addButtonId);
  var subBtn = document.getElementById(subButtonId);
  var valueChangeSuscribers = [];

  // Buttons events
  addBtn.onclick = function(e) {
    increment();
    update();
  };

  subBtn.onclick = function(e) {
    decrement();
    update();
  };

  // Functions
  var init = function(defaultValue) {
    value = defaultValue;
    update();
    valueChangeNotify();
  };

  var increment = function() {
    if (value < MAX) {
      value += CHANGE;
    }
    valueChangeNotify();
  };

  var decrement = function() {
    if (value > MIN) {
      value -= CHANGE;
    }
    valueChangeNotify();
  };

  var update = function() {
    document.getElementById(id).innerHTML = value;
  };

  var getValue = function() {
    return value;
  };

  var valueChangeSuscribe = function(suscriber) {
    valueChangeSuscribers.push(suscriber);
  };

  var valueChangeNotify = function() {
    valueChangeSuscribers.forEach(function(f) {
      f(value);
    });
  };

  // Public API
  return {
    getValue: getValue,
    init: init,
    update: update,
    valueChangeSuscribe: valueChangeSuscribe
  };
}

// TIMER MODULE
// preset and cycle in ms
function Timer() {

  // Private variables
  var running;
  var pomRunning;
  var restRunning;
  var pomTime;
  var restTime;
  var interval;
  var value;
  var cycle;
  var countdown;
  var title;

  // Functions
  var init = function(newCycle, countdownId, titleId) {
    cycle = newCycle;
    countdown = document.getElementById(countdownId);
    title = document.getElementById(titleId);
    running = false;
  };

  var start = function(pomPreset, restPreset) {
    pomTime = pomPreset;
    restTime = restPreset;
    value = pomTime;
    running = true;
    pomRunning = true;
    interval = setInterval(update.bind(this), cycle);
  };

  var stop = function() {
    clearInterval(interval);
    running = false;
  };

  var update = function() {
    if (running && !isFinished()) {
      value = value - cycle;
      countdown.innerHTML = getMinutes() + ':' + getSeconds();
    } else if (isFinished() && pomRunning) {
      value = restTime;
      pomRunning = false;
      restRunning = true;
      title.innerHTML = 'REST';
    } else if (isFinished() && restRunning) {
      value = pomTime;
      pomRunning = true;
      restRunning = false;
      title.innerHTML = 'POMODORO';
    }
  };

  var isFinished = function() {
    if (value == 0 && running) {
      return true;
    } else {
      return false;
    }
  };

  var isRunning = function() {
    return running;
  };

  var getMinutes = function() {
    return pad(Math.trunc(value / 60000), 2);
  };

  var getSeconds = function() {
    return pad(value % 60000 / 1000, 2);
  };

  var pad = function(num, length) {
    var str = num +  '';
    while (str.length < length) {
      str = '0' + str;
    }

    return str;
  };

  var updateValue = function(newValue) {
    value = newValue * 60000;
    countdown.innerHTML =  getMinutes() + ':' + getSeconds();
  };

  // Public API
  return {
    isRunning: isRunning,
    init: init,
    start: start,
    stop: stop,
    updateValue: updateValue
  };
}

// MAIN
var pomodoroPreset = Preset('pomodoro', 'add-pom-btn', 'sub-pom-btn');
var restPreset = Preset('rest', 'add-rest-btn', 'sub-rest-btn');
var timer = Timer();
var startBtn = document.getElementById('start-stop');

// Initialize timer
timer.init(1000, 'timer-countdown', 'timer-title');

// Subscribe timer as listener for changes on preset value
pomodoroPreset.valueChangeSuscribe(timer.updateValue);

// Initialize presets with defaults values
pomodoroPreset.init(25);
restPreset.init(5);


// Start button event
startBtn.onclick = function(e) {
  if (!timer.isRunning()) {
    timer.start(pomodoroPreset.getValue() * 60000, restPreset.getValue() * 60000);
    e.target.innerHTML = 'STOP';
  } else {
    timer.stop();
    e.target.innerHTML = 'START';
  }
};