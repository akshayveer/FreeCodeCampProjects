var single_player = true;
var game_started = false;
var player_choices = {1 : 'x', 2 : 'o'};
var player_name = {1 : 'Player 1', 2 : 'Computer'};
var current_player = 1;

function setGamePlay(flag) {
  if (flag === 's'){
    single_player = true;
    player_name[1] = 'Player 1';
    player_name[2] = 'Computer';
  } else if(flag === 'm'){
    single_player = false;
    player_name[1] = 'Player 1';
    player_name[2] = 'Player 2';
  } else {
    console.log('unknown');
  }
}

function setPlayerOneChoice(val) {
  if (val == 'o'){
    player_choices[1] = 'o';
    player_choices[2] = 'x';
  } else if (val == 'x'){
    player_choices[1] = 'x';
    player_choices[2] = 'o';
  }
}

function showBoard() {
  current_player = 1;
  game_started = true;
  $('.setting').hide(1000, function () {
    $('#game').show(1000);
    $('#current-player').text(player_name[1]);
  });

}

function resetSettings() {
  single_player = true;
  game_started = false;
  player_choices = {1 : 'x', 2 : 'o'};
  player_name = {1 : 'Player 1', 2 : 'Computer'};
}

function showSettings() {
  resetSettings();
  $('#game').hide(1000, function(){
    $('.setting').show(1000);
  })
}

$('#game').hide();
