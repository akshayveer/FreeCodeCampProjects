var timer_state = 'stopped';
var break_duration = 20;
var work_duration = 20;

var timer;

function changeBreakDuration(val) {
  if (timer_state === 'stopped'){
    if (val < 0){
      return false;
    }
    if (val + work_duration <= 60){
      break_duration = val;
      return true;
    } else {
      console.log('invalid');
    }
  } else {
    console.log('cannot change duration while timer is running');
  }
  return false;
}

function changeWorkDuration(val) {

  if (timer_state === 'stopped'){
    if (val < 0){
      return false;
    }
    if (val + break_duration <= 60){
      work_duration = val;
      return true;
    } else {
      console.log('invalid');
    }
  } else {
    console.log('cannot change duration while timer is running');
  }
  return false;
}

function resetTimer() {
  stopTimer();
  break_duration = 20;
  work_duration = 20;
  $('#work-setting').text('20');
  $('#break-setting').text('20');
}

function stopTimer() {
  if (timer_state === "running"){
    clearInterval(timer);
  }
  timer_state = "stopped";
}

function startWorkTimer() {
  timer_state = "running";
  $('#work-state').text("Let's do some work");
  var count = work_duration;
  timer = setInterval(function () {
    updateTimerDisplay(count);
    if (count === 0){
      clearInterval(timer);
      startBreakTimer();
    }
    count--;
  }, 1000);
}

function startBreakTimer() {
  timer_state = "running";
  $('#work-state').text("Take a break");
  var count = break_duration;
  timer = setInterval(function () {
    updateTimerDisplay(count);
    if (count === 0){
      clearInterval(timer);
      startWorkTimer();
    }
    count--;
  }, 1000);
}

function updateSettings(val) {
  var ans = false;
  var view;
  var result;
  console.log(val);
  if (val[0] == 'b'){
    if (val[1] == 'p'){
      ans = changeBreakDuration(break_duration + 1);
    } else if(val[1] == 'm'){
      ans = changeBreakDuration(break_duration - 1);
    }
    view = $('#break-setting');
    result = break_duration;
  } else if(val[0] == 'w'){
    if (val[1] == 'p'){
      ans = changeWorkDuration(work_duration + 1);
    } else if(val[1] == 'm'){
      ans = changeWorkDuration(work_duration - 1);
    }
    view = $('#work-setting');
    result = work_duration;
  }
  if (ans){
    view.text(result);
  }
}

function updateTimerDisplay(val) {
  $('#timer').text(val);
}
