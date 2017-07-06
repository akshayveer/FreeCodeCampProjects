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

function getBestAndWorstCase(cp){
  if (cp == 1){
    var prob = 1;
    for (var i = 1;i <= 9;i++){
      if (board_config[i] == ''){
        board_config[i] = player_choices[1];
        if (checkGameOver(i, cp)){
          board_config[i] = '';
          return {'chance' : 0};
        } else if (gameTie()){
          prob = 0.5;
        } else {
          var temp = getBestAndWorstCase(2);
          if (temp.chance == 0){
            board_config[i] = '';
            return {'chance' : 0};
          } else if(temp.chance == 0.5){
            prob = 0.5;
          }
        }
        board_config[i] = '';
      }
    }
    return {'chance' : prob};
  } else {
    var prob = 0;
    var poss_index;
    for (var i = 1;i <= 9;i++){
      if (board_config[i] == ''){
        board_config[i] = player_choices[2];
        if (checkGameOver(i, cp)){
          board_config[i] = '';
          return {'id' : i, 'chance' : 1};
        } else if (gameTie()){
          prob = 0.5;
          poss_index = i;
        } else {
          var temp  = getBestAndWorstCase(1);
          //console.log(temp);
          if (temp.chance === 1){
            board_config[i] = '';
            return {'id' : i, 'chance' : 1};
          } else if (temp.chance == 0.5){
            prob = 0.5;
            poss_index = i;
          }
        }
        board_config[i] = '';
        if (prob == 0){
          poss_index = i;
        }
      }
    }
    return {'id' : poss_index, 'chance' : prob};
  }
}
// best case win probability and worst case win probability
// first value is in best case probability of winning alteast this much
// second value in in worst case probability of winning is altest this much
function getBestAndWorstCase1(cp) {
  //console.log(board_config);
  //debugger;
  if (cp == 1){
    var probabilites = [];
    for (var i = 1;i <= 9;i++){
      if (board_config[i] == ''){
        board_config[i] = player_choices[1];
        if (checkGameOver(i, cp)){
          board_config[i] = '';
          return [{'id' : i, 'chance' : 0},{'id' : i, 'chance' : 0}];
        } else if (gameTie()){
          probabilites.push([{'id' : i, 'chance' : 0.5},{'id' : i, 'chance' : 0.5}]);
        } else {
          probabilites.push(getBestAndWorstCase(2));
        }
        board_config[i] = '';
      }
    }
    //console.log('player 1', probabilites);
    if (probabilites.length == 1){
      return [probabilites[0][1], probabilites[0][1]];
    }
    probabilites.sort(function (p1, p2) {
      if (p1[1].chance < p2[1].chance){
        return -1;
      } else if(p1[1].chance == p2[1].chance){
        if (p1[0].chance < p2[0].chance){
          return -1;
        } else{
          return 1;
        }
      } else {
        return 1;
      }
    });
    return [probabilites[1][1], probabilites[0][1]];
  } else {
    var probabilites = [];
    for (var i = 1;i <= 9;i++){
      if (board_config[i] == ''){
        board_config[i] = player_choices[2];
        if (checkGameOver(i, cp)){
          board_config[i] = '';
          return [{'id': i, 'chance' : 1},{'id': i, 'chance' : 1}];
        } else if (gameTie()){
          probabilites.push([{'id' : i, 'chance' : 0.5},{'id' : i, 'chance' : 0.5}]);
        } else {
          probabilites.push(getBestAndWorstCase(1));
          probabilites[probabilites.length - 1][0].id = i;
          probabilites[probabilites.length - 1][1].id = i;
        }
        board_config[i] = '';
      }
    }
    //console.log('player 2', probabilites);
    if (probabilites.length == 1){
      return [probabilites[0][1], probabilites[0][1]];
    }
    probabilites.sort(function(p1, p2){
      //console.log(p1, p2);

      if (p1[1].chance > p2[1].chance){
        return -1;
      } else if(p1[1].chance == p2[1].chance){
        if (p1[0].chance > p2[0].chance){
          return -1;
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    });

    return [probabilites[1][1], probabilites[0][1]];
  }
}

function computerMove() {
  var prop = getBestAndWorstCase(2);
  var next_move_id = prop.id;
  console.log(prop);
  console.log('next move', next_move_id);
  $('#' + next_move_id).trigger('click');
}

function resetBoard() {

  for (var id = 1;id <= 9;id++){
    $('#'+id).html('&nbsp;');
    board_config[id] = '';
  }
}

function checkGameOver(id, current_player) {
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
  for (var i = 1;i <= 9;i++){
    if (board_config[i] == '' || board_config[i] == ' ' || board_config[i] == null){
      return false;
    }
  }
  return true;
}

$('.cell').on('click', function (e) {
  if (game_started == false){
    return;
  }
  var id = parseInt($(e.target).attr('value'));
  markCell(id, player_choices[current_player]);
  board_config[id] = player_choices[current_player];
  console.log(id);
  if (checkGameOver(id, current_player)){
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
  if (single_player && current_player === 2){
    computerMove();
  }
});
