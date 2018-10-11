$(document).ready(function () {

  // global variables
  var timerInterval, lineInterval;
  var pomRunning = false;
  var restRunning = false;
  var initMSeconds;

  // constants
  var MIN_TO_MSECONDS = 60000;
  var SEC_TO_MSECONDS = 1000;
  var CYCLE = 1000;

  console.log("inside js");

  function setTimer(mSeconds) {

    // convert milliseconds to seconds and minutes
    var min = Math.floor((mSeconds / (1000 * 60)) % 60);
    var sec = Math.floor((mSeconds / 1000) % 60);

    // add leading 0 to seconds string
    if (sec.toString().length === 1) {
      sec = '0' + sec;
    }

    // update timer contents
    $('#timer').html(min.toString() + ':' + sec);
  }

  // start countdown button
  $('#start-stop').click(function() {
    if (timerInterval == undefined) {
      pomRunning = true;
      $(this).html('PAUSE');
      initMSeconds = Number($('#pomodoro').html()) * MIN_TO_MSECONDS;
      timerInterval = setInterval(updateTimer, CYCLE);
    } else {
      pomRunning = false;
      $(this).html('START');
      clearInterval(timerInterval);
      timerInterval = undefined;
    }
  })

  function getMSeconds(element) {
    var contents = $(element).html();
    contents = contents.split(":");
    var minutes = Number(contents[0]);
    var seconds = Number(contents[1]);
    
    return ((minutes * MIN_TO_MSECONDS) + (seconds * SEC_TO_MSECONDS));
  }

  // countdown function
  function updateTimer() {

    // get current mseconds from timer
    var mSeconds = getMSeconds('#timer');
    
    // update time
    if (mSeconds >= CYCLE) {
      mSeconds = mSeconds - CYCLE;
    }
    setTimer(mSeconds);
    drawLine(mSeconds, initMSeconds);

    // re-start timer
    if (mSeconds === 0) {

      if (pomRunning === true) {

        // load timer with rest minutes and seconds
        $('#section').html('REST');
        $('#section').css('right', '35%');
        mSeconds = Number($('#rest').html()) * MIN_TO_MSECONDS;
        console.log(mSeconds);
        pomRunning = false;
        restRunning = true;
        
        setTimer(mSeconds);
        
        initMSeconds = mSeconds;
        drawLine(mSeconds, initMSeconds);

      } else {

        // load timer with pomodoro minutes and seconds
        $('#section').html('POMODORO');
        $('#section').css('right', '30%');
        mSeconds = Number($('#pomodoro').html()) * MIN_TO_MSECONDS;
        restRunning = false;
        pomRunning = true;
        
        setTimer(mSeconds);
        
        initMSeconds = mSeconds;
        drawLine(mSeconds, initMSeconds);
      }
    }
  }

  function drawLine(mSeconds, initMSeconds) {
    // update bottom line
    $('#bottom-line').css('width', (100 - (100 * mSeconds / initMSeconds) + '%'));
  }

  $(document).ready(function() {
    setTimer($('#pomodoro').html() * MIN_TO_MSECONDS);
  });

  /* ######### buttons code ########## */
  function updateValue(element, change, limit) {
    var oldValue = parseInt($(element).html());
    var newValue = oldValue;
    if (((change > 0) && (oldValue < limit)) || ((change < 0) && (oldValue > limit))) {
      newValue = newValue + change;
    }
    $(element).html(newValue);
    return newValue;
  }

  // subtract pomodoro time button
  $('#sub-pom-btn').click(function() {
    if (timerInterval == undefined) {
      setTimer(updateValue('#pomodoro', -5, 5) * MIN_TO_MSECONDS);
    }
  });

  // add pomodoro time button
  $('#add-pom-btn').click(function() {
    if (timerInterval == undefined) {
      setTimer(updateValue('#pomodoro', 5, 55) * MIN_TO_MSECONDS);
    }
  });

  // subtract rest time button
  $('#sub-rest-btn').click(function() {
    if (timerInterval == undefined) {
      updateValue('#rest', -1, 1);
    }
  });

  // add rest time button
  $('#add-rest-btn').click(function() {
    if (timerInterval == undefined) {
      updateValue('#rest', 1, 15);
    }
  });
  
});
