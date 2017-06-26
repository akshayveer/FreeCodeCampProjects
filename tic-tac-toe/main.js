var single_player = true;
var player1_choice = 'x';
var player2_choice = 'o';

function setGamePlay(flag) {
  if (flag === 's'){
    single_player = true;
  } else if(flag === 'm'){
    single_player = false;
  } else {
    console.log('unknown');
  }
}

function setPlayerOneChoice(val) {
  player1_choice = val;
}

function showBoard() {
  $('.setting').hide(1000, function () {
    $('#game').show(1000);
  });

}

function showSettings() {
  $('#game').hide(1000, function(){
    $('.setting').show(1000);
  })
}

$('#game').hide();
