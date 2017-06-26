var single_player = true;
var game_started = false;
var player_choices = {1 : 'x', 2 : 'o'};
var player_name = {1 : 'Player 1', 2 : 'Computer'};
var current_player = 1;
var board_config= {};

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
  resetBoard();
  current_player = 1;
  game_started = true;
  $('.setting').hide(1000, function () {
    $('#game').show(1000);
    $('#current-player').text(player_name[1]);
    $('#player1-choice').text(player_name[1] + ' choice ' + player_choices[1]);
    $('#player2-choice').text(player_name[2] + ' choice ' + player_choices[2]);
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
for (var i = 1;i <= 9;i++){
  board_config[i] = '';
}

function markCell(cellId, val) {
  $('#'+cellId).text(val);
}

function computerMove() {

}

function resetBoard() {
  board_config= {};
  for (var id = 1;id <= 9;id++){
    $('#'+id).html('&nbsp;');
  }
}

function checkGameOver(id) {
  id = id - 1;
  var row = Math.floor(id / 3);
  var col = id % 3;
  var equal = true;

  for (var c = 0; c < 3;c++){
    if (board_config[row * 3 + c + 1] != player_choices[current_player]){
      equal = false;
      break;
    }
  }
  if (equal){
    return true;
  }
  equal = true;

  for (var r = 0; r < 3;r++){
    if (board_config[r * 3 + col + 1] != player_choices[current_player]){
      equal = false;
      break;
    }
  }
  if (equal){
    return true;
  }

  if (id == 1 || id == 3 || id == 5 || id == 7){
    return false;
  }
  if (id == 0 || id == 8){
    equal = true;
    for (var r = 0;r < 3;r++){
      if (board_config[r * 3 + r + 1] != player_choices[current_player]){
        equal = false;
        break;
      }
    }
    if (equal){
      return true;
    }
    return false;
  }
  if (id == 2 || id == 6){
    equal = true;
    for (var r = 0; r < 3;r++){
      if (board_config[r * 3 + 2 - r + 1] != player_choices[current_player]){
        equal = false;
        break;
      }
    }
    if (equal){
      return true;
    }
    return false;
  }

  // for middle element
  equal = true;
  for (var r = 0;r < 3;r++){
    if (board_config[r * 3 + r + 1] != player_choices[current_player]){
      equal = false;
      break;
    }
  }
  if (equal){
    return true;
  }
  equal = true;
  for (var r = 0; r < 3;r++){
    if (board_config[r * 3 + 2 - r + 1] != player_choices[current_player]){
      equal = false;
      break;
    }
  }
  if (equal){
    return true;
  }
  return false;
}

function gameTie() {
  return Object.keys(board_config).length == 9;
}

$('.cell').on('click', function (e) {
  if (game_started == false){
    return;
  }
  var id = parseInt($(e.target).attr('value'));
  markCell(id, player_choices[current_player]);
  board_config[id] = player_choices[current_player];
  console.log(id);
  if (checkGameOver(id)){
    console.log('player wins');
    $('#current-player').text(player_name[current_player] + ' wins ');
    game_started = false;
    return;
  } else if(gameTie()){
    console.log('game ties');
    $('#current-player').text('Game Tie');
    game_started = false;
    return;
  } else {
      console.log('not game over');
      if (current_player === 1){
        current_player = 2;
      } else {
        current_player = 1;
      }
  }
  $('#current-player').text(player_name[current_player]);
  if (single_player){
    computerMove();
  }
});
