'use strict';
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
// the 3 buttons that we play the game with..we store them in a var so that game can be played easily

let active = 0;
// this is the current player..if activeplayer is 1..then active is 0..if active player is 2..then active is 1
//we use xor operation to move b/w 1 and 0

// let ele = document.getElementById('score--0').innerText;
// console.log(ele, typeof ele);

/* 
this function accepts 3 params
innertext= value passed..it can be any number or any string 
ele- the property that we want to change..i.e if we want to change name or current score ot totol score or number of ones....in html we have all the ides by name ele--0/1..i.e for player 1..all props are name--0...current--0, score--0..one--0etc...for player 2 we have current--1 score--1 name--1etc..
a- active player...it accepts0/1..if we are changing props of player 1..it takes 0..else it takes 1..
so we pass value.property and active player in order ..we get the result
ex; display(20, current , 0) that means current--0 id value should be 20..so player 1 current value is 20...displaY('you win', name, 1) name--1 id value is now you win...that is player 2 wins is printed
*/
const display = function (innerText, ele, a) {
  document.getElementById(ele + '--' + a).innerText = innerText;
  let v = document.getElementById(ele + '--' + a).innerText;
  console.log(v, typeof v);
};

const player = {
  name0: document.getElementById('name--0').innerText,
  score0: parseFloat(document.getElementById('score--0').innerText),
  current0: parseFloat(document.getElementById('current--0').innerText),
  name1: document.getElementById('name--1').innerText,
  score1: parseFloat(document.getElementById('score--1').innerText),
  current1: parseFloat(document.getElementById('current--1').innerText),
};
//it contains all values of both players...for an object we can give custom param by obj[]
/* 
we use same approch ..player[name + active] can be passed..if active player is 1st player..0 will be passed..so now player[name0] is a key in obj..so name of 1st player is retrieved
we can us player['score' + active] it gives score of player 1 or 2 based on value of active
*/
// const player1 = {
//   name: document.getElementById('name--1'),
//   score: parseFloat(document.getElementById('score--1').innerText),
//   current: parseFloat(document.getElementById('current--1').innerText),
// };

// it resets all values
/*
all scores are set to 0 at 1st...since we know values of all props already..we can use .property..instead of[] property
when game is over..we dont need roll dice and hold..so they are disabled..here they are abled back again
and finally we display all of them 
*/
newGame.addEventListener('click', function () {
  player.score0 = 0;
  player.current0 = 0;
  player.score1 = 0;
  player.current1 = 0;
  document.getElementById('one--0').innerText = 0;
  document.getElementById('one--1').innerText = 0;
  rollDice.disabled = false;
  hold.disabled = false;
  console.log(player.current1, typeof player.current1);
  display(player.current0, 'current', 0);
  display(player.score0, 'score', 0);
  display(player.current1, 'current', 1);
  display(player.score1, 'score', 1);
  display(ones, 'one', 0);
  display(ones, 'one', 1);
  active = 0;
  display('PLAYER 1', 'name', 0);
  display('PLAYER 2', 'name', 1);
});

/*
generate a random number from 1 to 6
display img based on number...all images are of dice-number.png..so we can pass in the number generated and it will generate img
if no =1 we make current value of that player to 0..else we add no to current value
then we display the current value
if no==1
we modify no of 1s of that player..we inc. it..if value is 3..then score is reset to 0 and both 1s and score are displayed
if value is 1..we finally make that player inactive by removing the class and make the next player active by adding the class
logically we perform xor operation..so 1 becomes 0 and 0 becomes 1 with xor..so player is switched ..
on screen we just change colors of both players by adding and removing active classes to indicate if player is active or not
*/

rollDice.addEventListener('click', function () {
  let diceNumber = Math.floor(Math.random() * 6 + 1);
  document.querySelector('.dice').src = 'dice-' + diceNumber + '.png';
  if (diceNumber == 1) {
    player['current' + active] = 0;
  } else {
    player['current' + active] += diceNumber;
  }
  display(player['current' + active], 'current', active);

  if (diceNumber == 1) {
    let ones = parseFloat(document.getElementById('one--' + active).innerText);
    console.log(ones, typeof ones);
    ones++;
    if (ones == 3) {
      alert(
        `count of 1's of ${
          player['name' + active]
        } is 3. so score is reset to 0`
      );
      player['score' + active] = 0;
      display(player['score' + active], 'score', active);
      ones = 0;
    }
    display(ones, 'one', active);
    playerChange();
  }
});

/*
adds current score to final
make current score 0
if score is 100 or above..print active player won annd disable roll and hold buttons as game is over
display scores..
if game is not over..then switch players again...logically apply xor
on screen..modify css classes
*/

hold.addEventListener('click', function () {
  player['score' + active] += player['current' + active];
  player['current' + active] = 0;
  if (player['score' + active] >= 100) {
    display(`${player['name' + active]} wins`, 'name', active);
    rollDice.disabled = true;
    hold.disabled = true;
  }
  display(player['current' + active], 'current', active);
  display(player['score' + active], 'score', active);
  playerChange();
});

function playerChange() {
  document
    .querySelector('.player--' + active)
    .classList.remove('player--active');
  active = active ^ 1;
  document.querySelector('.player--' + active).classList.add('player--active');
}
