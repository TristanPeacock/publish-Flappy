// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelscore;
var player;
var pipebody;
var pipetop;
var pipes = [];
var rotation = 1;
var jumpCount = 0
var labelJump
var airBlock = []


/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("player","../assets/flappy-cropped.png");
game.load.image("pipeblock","../assets/pipe2-body.png")
game.load.image("pipetop","../assets/pipe2-end.png")
game.load.audio("score", "../assets/point.ogg");
game.load.image("bg", "../assets/bg1.jpg");
game.load.image("air", "../assets/flappy-bg.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.add.sprite(0,0, "bg");
    game.stage.setBackgroundColor("FFFFFF");

    player=game.add.sprite(50,50, "player");


    game.input.onDown.add(clickHandler);
    game.input
     .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
     .onDown.add(playerJump);
     labelScore = game.add.text(20, 20, "0");
     labelJump = game.add.text(20, 50, "0");



    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);

    player.body.gravity.y=  250;
    var pipeInterval = 1  * Phaser.Timer.SECOND;
game.time.events.loop(
 pipeInterval,
 generatePipe
);

player.anchor.setTo(0.5,0.5)
}


/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

  game.physics.arcade.overlap(
 player,
 airBlock,
 changeScore);

 game.physics.arcade.overlap(
player,
pipes,
gameOver);




 //player.angle += rotation;

}


function gameOver(){
 game.state.restart();
 score = 0
 jumpCount = 0

}

function clickHandler(event){

  player.y -= 350


}

function spaceHandler() {
  player.y = player.y - 10;
  changeScore();


  game.sound.play("score");
}


function changeScore(){

  score = score + 1;
  labelScore.setText(score.toString());
  game.sound.play("score");
}


function generatePipe(){
  var gapStart = game.rnd.integerInRange(1,4);
    for(var count= 0; count < 8; count += 1){
      if(count!= gapStart && count != gapStart +1  && count != gapStart +2 ) {
        addPipeBlock(800, count * 50);

      } else{
        addAirBlock(800, count * 50)
        }


    }



}

function addPipeBlock(x,y){

var block = game.add.sprite(x, y, "pipeblock");
pipes.push(block)
game.physics.arcade.enable(block);
block.body.velocity.x=- 250

}


function addAirBlock(x,y){

var block = game.add.sprite(x, y, "air");
airBlock.push(block)
game.physics.arcade.enable(block);
block.body.velocity.x=- 250;
}

function playerJump(){
  player.body.velocity.y =-150;
  //rotation += 1


  jumpCount += 1;
  labelJump.setText(jumpCount.toString());

}
