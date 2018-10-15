(function() {
  'use strict';

  // PRESETS MODULE
  function Preset(id, addButtonId, subButtonId, defaultValue) {
    var value = defaultValue;
    var MIN = 5;
    var MAX = 55;
    var CHANGE = 5;
    var addBtn = document.getElementById(addButtonId);
    var subBtn = document.getElementById(subButtonId);

    // buttons events
    addBtn.onclick = function(e) {
      increment();
      update();
    };

    subBtn.onclick = function(e) {
      decrement();
      update();
    };

    function increment() {
      if (value < MAX) {
        value += CHANGE;
      }
    }

    function decrement() {
      if (value > MIN) {
        value -= CHANGE;
      }
    }

    function update() {
      document.getElementById(id).innerHTML = value;
    }

    var publicAPI = {
      value: value,
      update: update
    };

    return publicAPI;
  }

  // TIMER MODULE
  // preset and cycle in ms
  function Timer(preset, cycle, startBtnId, timerId) {
    var running;
    var interval;
    var value = preset;
    var startBtn = document.getElementById(startBtnId);
    var timer = document.getElementById(timerId);

    // start button event
    startBtn.onclick = function(e) {
      if (!running) {
        start();
        e.target.innerHTML = 'PAUSE';
      } else {
        pause();
        e.target.innerHTML = 'START';
      }
    };

    function start() {
      running = true;
      interval = setInterval(update, cycle);
    }

    function pause() {
      running = false;
      clearInterval(interval);
    }

    function update() {
      if (running) {
        value = value - cycle;
        timer.innerHTML = getMinutes() + ':' + getSeconds();
      }
    }

    function isFinished() {
      if (value == 0 && running) {
        return true;
      } else {
        return false;
      }
    }

    function getMinutes() {
      return pad(Math.trunc(value / 60000), 2);
    }

    function getSeconds() {
      return pad(value % 60000 / 1000, 2);
    }

    function pad(num, length) {
      var str = num +  '';
      while (str.length < length) {
        str = '0' + str;
      }

      return str;
    }

    var publicAPI = {
      running: running,
      start: start,
      pause: pause,
      update: update,
      isFinished: isFinished,
      getMinutes: getMinutes,
      getSeconds: getSeconds
    };

    return publicAPI;
  }

  // MAIN
  var pomodoroPreset = Preset('pomodoro', 'add-pom-btn', 'sub-pom-btn', 25);
  var restPreset = Preset('rest', 'add-rest-btn', 'sub-rest-btn', 5);
  var timer = Timer(pomodoroPreset.value * 60000, 1000, 'start-stop', 'timer');

  pomodoroPreset.update();
  restPreset.update();

})();