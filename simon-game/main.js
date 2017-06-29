function createSVGPath(cx, cy, r1, r2, width) {
  r1 = r1 - width;
  var d = ["M", cx , cy - r2, "L", cx, cy - r1, "A", r1, r1, 0, 0, 1, cx + r1, cy,
  "L", cx + r2, cy, "A", r2, r2, 0, 0, 0, cx, cy - r2];
  var ans =  d.join(" ");
  console.log(ans);
  $("#svg2").attr({"d": ans, "stroke-width":width});
  $("#svg1").attr({"d": ans, "stroke-width":width});
  $("#svg3").attr({"d": ans, "stroke-width":width});
  $("#svg4").attr({"d": ans, "stroke-width":width});

  var dx = 17;
  $("#stop-button").attr({"cx" : r1 + width - dx, "cy" : 100});
  $("#start-button").attr({"cx" : r1 + width, "cy" : 100});
  $("#strict-button").attr({"cx" : r1 + width + dx, "cy" : 100});

  var dy = 20;

  $("#count").attr({"x" : r1 + width, "y" : r1 + width + dy});
}


var Game = {
  started : false,
  state : 'uninitialized',
  strict_mode : false,
  level : 0,
  pattern : [],
  pattern_index : 0,
  time_out : {},
  playPattern : function () {
    if (this.started === false){
      return;
    }
    this.state = "playing";
    updateCount(this.pattern.length);
    console.log('playing pattern');
    var i = 0;
    var interval = new Object();
    interval.pattern = this.pattern;
    interval.set = setInterval(function () {
      if (i === this.pattern.length){
        window.clearInterval(interval.set);
        console.log('playing end');
        this.pattern_index = 0;
        this.addTimeOut();
        this.state = "listening";
      }
      else {
        console.log('playing music with id ' + i);
        activateAndPlayMusic(this.pattern[i]);
        i++;
      }
    }.bind(this), 1000);
  },
  addTimeOut : function () {
    if (this.started === false){
      return;
    }
    this.time_out = setTimeout(function () {
      this.handleWrongInput();
      console.log('timeout function called');
    }.bind(this), 5000);
  },
  addNextPattern : function () {
    if (this.started === false){
      return;
    }
    if (this.pattern.length === 20){
      setGameOver();
      return;
    }
    var id = 'svg' + (1 + Math.floor(Math.random() * 4));
    console.log('prevous count ' +  this.pattern.length);
    console.log('added pattern ' + id);
    this.pattern.push(id);
    console.log('current count ' +  this.pattern.length);
    this.playPattern();
  },
  notifyUserClicked : function (id) {
    if (this.started === false){
      return;
    }
    console.log('user clicked');
    clearTimeout(this.time_out);
    if (this.pattern[this.pattern_index] != id){
      console.log('wrong pattern');
      this.handleWrongInput();
    } else {
      this.pattern_index++;
      if (this.pattern_index === this.pattern.length){
        console.log('get next pattern');
        this.state = "playing";
        this.addNextPattern();
      } else {
        this.addTimeOut();
      }
    }
  },
  handleWrongInput : function () {
    if (this.started === false){
      return;
    }
    provideFeedbackToUser();
    var interval = new Object();
    interval.val = this;
    interval.set = setTimeout(function () {
      if (interval.val.strict_mode){
        interval.val.restart();
      } else {
        console.log('wrong inpt by mand');
        interval.val.playPattern();
      }
      clearTimeout(interval.set);
    }, 2000);

  },
  restart : function () {
    this.state = 'uninitialized';

    clearTimeout(this.time_out);
    console.log('cleared timeout');
    this.level = 0;
    this.pattern.length = 0;
    this.pattern_index = 0;
    updateCount("!!");
    this.started = true;
    this.time_out = {};
    this.addNextPattern();

  },
  stop : function () {
    this.started = false;
  },
  restartButtonPressed : function () {
    console.log('restart button pressed');
    $('#restart-button').removeClass("restart-button-activated");
    provideFeedbackToUser();
    var interval = new Object();
    interval.val = this;
    interval.set = setTimeout(function () {
      interval.val.restart();
      clearTimeout(interval.set);
    }, 2000);
  },
  stopButtonPressed : function () {
    if (this.started){
      this.started = false;
      $("#stop-button").removeClass("start-button-activated");
      updateCount('!!');
      console.log('stopping game');
    } else {
      this.started = true;
      $("#stop-button").addClass("start-button-activated");
      this.restart();
    }
  },
  strictModeButtonPressed : function () {
    console.log('hadnling strict mode');
      if (this.strict_mode){
        this.strict_mode = false;
        deactiveStrictMode();
      } else {
        this.strict_mode = true;
        activateStrictMode();
      }
  }
};

$(document).ready(function () {
  createSVGPath(0, 100, 100, 30, 5);
})

function activateAndPlayMusic(item_id) {
  console.log(item_id);
  var hash_id = '#'+ item_id;
  $(hash_id).addClass(item_id+'-hover');
  $('#audio-'+item_id).get(0).play();
  $('#audio-'+item_id).on("ended", function () {
    $(hash_id).removeClass(item_id+'-hover');
  });
}

function deactiveStrictMode() {
  $('#strict-button').removeClass("strict-button-activated");
}

function activateStrictMode() {
  $('#strict-button').addClass("strict-button-activated");
}

function updateCount(val){
  $('#count').text(val);
}

function provideFeedbackToUser() {
  console.log('timeout');
  $('#count').text("!!");
  $('#count').fadeOut(100);
  $('#count').fadeIn(100);
  $('#count').fadeOut(100);
  $('#count').fadeIn(100);
}

function gameOver() {
  for (var i = 0;i < 4;i++){
    $('#count').fadeOut(100);
    $('#count').text('Game');
    $('#count').fadeIn(100);
    $('#count').fadeOut(100);
    $('#count').text('Over');
    $('#count').fadeIn(100);
  }
}
$("svg").mouseup(function(evt){
  if (Game.state === "playing"){
    return false;
  }
  var target = evt.target;
  var id = target.id;
  if (id === "stop-button"){
    Game.stopButtonPressed();
    return false;
  }
  if (id === "strict-button"){
    Game.strictModeButtonPressed();
    return false;
  }
  if (Game.started === false){
    console.log('not gona happen');
    return false;
  }

  if (id !== ''){
    if (id.startsWith("svg")){
      $(target).removeClass(id+'-hover');
      $('#audio-'+id).prop("loop",false);
      Game.notifyUserClicked(id);
    } else if (id === "stop-button"){
      Game.stopButtonPressed();
    } else if (id === "restart-button"){
      Game.restartButtonPressed();
    } else if (id === "strict-button"){
      Game.strictModeButtonPressed();
    }
  }
  return false;
}).mousedown(function(evt){
  var target = evt.target;
  var id = target.id;
  if (Game.state === "playing" || Game.started === false){
    console.log('not gona happen');
    return false;
  }

  if (id !== ''){
    if (id.startsWith("svg")){
      $('#audio-'+id).prop("loop",true);
      $(target).addClass(id+'-hover');
      $('#audio-'+id).get(0).play();
    } else if (id === 'restart-button'){
      $('#'+id).addClass("restart-button-activated");
    }
  }
  return false;
});
