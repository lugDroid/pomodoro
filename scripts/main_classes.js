
/*jshint esversion: 6 */

const $pomodoroPreset = document.getElementById('pomodoro-preset');
const $restPreset = document.getElementById('rest-preset');
const $timer = document.getElementById('timer-faceplate');

const pomodoroPreset = new Preset(25, $pomodoroPreset);
const restPreset = new Preset(5, $restPreset);

const timer = new Timer(1000, $timer);

pomodoroPreset.valueChangeSubscriber(timer.updateValue);