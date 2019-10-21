// Tic Tac Toe

//

let togglePlayer = true;
let squares = document.querySelectorAll(".square");
let button = document.querySelector("#reset-button");
let currentPlayer = document.querySelector("h1");
let p1Won = document.querySelector("#p1");
let p2Won = document.querySelector("#p2");
let draws = document.querySelector(".draws");
currentPlayer.innerText = "Current Player: 1";
let menuButton = document.querySelector(".menu-icon");
let stats = document.querySelector(".stats");
menuButton.addEventListener("click",toggleMenu);
let clickCount = 0;
let winnerOfRound;

let player1Wins = 0;
let player2Wins = 0;
let drawsCount = 0;

let winningConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[6,4,2]
];

squares.forEach(val => val.addEventListener("click", colorSquare));
button.addEventListener("click", resetGame);

function toggleMenu(){
  console.log("Menu is toggled");
  //let widthIsZero = getComputedStyle(aside).position === "absolute";
  let widthIsZero = getComputedStyle(stats).width === "0px";
  console.log(widthIsZero);
  if(widthIsZero){
    stats.classList.remove("hide");
    //aside.classList.add("show");
  //  aside.style.opacity = "1"
    //aside.style.width = "20%";
  }else{
    //aside.style.width = "0px";
    stats.classList.add("hide");
  //  aside.classList.remove("show");
    //aside.style.opacity = "0";
  }
}


function colorSquare(evt){
  let square = evt.target;
  let squareNotAssigned = square.classList.contains("red-item") === false
  && square.classList.contains("blue-item") === false;
  if(squareNotAssigned){
    clickCount++;
    square.classList.add(determineColor());

    checkForWinner();

  }


}

function checkForWinner(){
  for(let i = 0; i < winningConditions.length; i++){
    console.log(`Checking Condition ${i}`);
    index = winningConditions[i];
    let winnerFound =
    [ squares[index[0]].classList.contains(determineColor()),
      squares[index[1]].classList.contains(determineColor()),
      squares[index[2]].classList.contains(determineColor())];
      console.log(winnerFound);
      determineColor();
      if(winnerFound.every(val => val===true)){
        let winner = togglePlayer === true ? "player 1" : "Player 2";
        return setTimeout(alertWinner.bind(this, winner),500);
        //return alertWinner("Winner is " + winner);
      }
  }
    if(clickCount===9){
      setTimeout(alertTie, 500);
    }
      togglePlayer = !togglePlayer;
}

function resetGame(){
  clickCount = 0;
  squares.forEach(square => {
    square.classList.remove("red-item");
    square.classList.remove("blue-item");
    currentPlayer.innerText = "Current Player: 1";
    togglePlayer = true;
  })
}


function determineColor(){
  let firstPlayerTurn = togglePlayer===true;
  let result;
    if(firstPlayerTurn){
      result = "red-item";
      currentPlayer.innerText = "Current Player: 2";
    }else{
      result = "blue-item";
      currentPlayer.innerText = "Current Player: 1";
    }

    return result;

}

function alertWinner(winner){

  alert(`Player ${winner} won the game!`);
  if(togglePlayer === true){
    player1Wins++;
    p1Won.innerText = player1Wins;
  }else if(togglePlayer === false){
    player2Wins++;
    p2Won.innerText = player2Wins;
  }
  resetGame();
}

function alertTie(){
  alert(`No Player has won!`);
  drawsCount++;
  draws.innerText = drawsCount;
  resetGame();
}
