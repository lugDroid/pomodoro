(function() {
  'use strict';

  // PRESETS MODULE
  function Preset(id, addButtonId, subButtonId) {

    // Private variables
    var value;
    var MIN = 5;
    var MAX = 55;
    var CHANGE = 5;
    var addBtn = document.getElementById(addButtonId);
    var subBtn = document.getElementById(subButtonId);

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
    };

    var increment = function() {
      if (value < MAX) {
        value += CHANGE;
      }
    };

    var decrement = function() {
      if (value > MIN) {
        value -= CHANGE;
      }
    };

    var update = function() {
      document.getElementById(id).innerHTML = value;
    };

    var getValue = function() {
      return value;
    };

    // Public API
    return {
      getValue: getValue,
      init: init,
      update: update
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
    var element;

    // Functions
    var init = function(newCycle, timerId) {
      cycle = newCycle;
      element = document.getElementById(timerId);
    };

    var start = function(pomPreset, restPreset) {
      pomTime = pomPreset;
      restTime = restPreset;
      value = pomTime;
      running = true;
      pomRunning = true;
      interval = setInterval(update.bind(this), cycle);
    };

    var pause = function() {
      running = false;
      clearInterval(interval);
    };

    var update = function() {
      if (isRunning && !isFinished()) {
        value = value - cycle;
        element.innerHTML = getMinutes() + ':' + getSeconds();
      } else if (isFinished() && pomRunning) {
        value = restTime;
        pomRunning = false;
        restRunning = true;
      } else if (isFinished() && restRunning) {
        value = pomTime;
        pomRunning = true;
        restRunning = false;
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

    var getValue = function() {
      return value;
    };

    var setValue = function(newValue) {
      value = newValue;
    };

    var getCycle = function() {
      return cycle;
    };

    var setPomRunning = function() {
      pomRunning = true;
    };

    var setRestRunning = function() {
      pomRunning = true;
    };

    var resetPomRunning = function() {
      pomRunning = false;
    };

    var resetRestRunning = function() {
      pomRunning = false;
    };

    // Public API
    return {
      isRunning: isRunning,
      init: init,
      start: start,
      pause: pause,
      update: update,
      isFinished: isFinished,
      getMinutes: getMinutes,
      getSeconds: getSeconds,
      getValue: getValue,
      setValue: setValue,
      getCycle: getCycle,
      setPomRunning: setPomRunning,
      setRestRunning: setRestRunning,
      resetPomRunning: resetPomRunning,
      resetRestRunning: resetRestRunning
    };
  }

  // MAIN
  var pomodoroPreset = Preset('pomodoro', 'add-pom-btn', 'sub-pom-btn');
  var restPreset = Preset('rest', 'add-rest-btn', 'sub-rest-btn');
  var timer = Timer();
  var startBtn = document.getElementById('start-stop');

  // Initialize timer
  timer.init(1000, 'timer');

  // Initialize presets with defaults values
  pomodoroPreset.init(25);
  restPreset.init(5);

  // Start button event
  startBtn.onclick = function(e) {
    if (!timer.running) {
      timer.start(pomodoroPreset.getValue() * 60000, restPreset.getValue() * 60000);
      e.target.innerHTML = 'PAUSE';
    } else {
      timer.pause();
      e.target.innerHTML = 'START';
    }
  };

})();