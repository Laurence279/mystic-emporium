

document.querySelector(".rollButton").addEventListener("click",function(){
  rollDice();
})

function rollNumber()
{
   var randomNumber1 = Math.floor(Math.random() * 6 + 1);
   return randomNumber1;
}


function rollDice()
{
  var dice1 = rollNumber();
  var dice2 = rollNumber();
  const diceImage1 = document.querySelector("#dice1");
  const diceImage2 = document.querySelector("#dice2");
  diceImage1.setAttribute("src","images/dice"+dice1+".png");
  diceImage2.setAttribute("src","images/dice"+dice2+".png");
  diceImage1.style.display = "initial";
  diceImage2.style.display = "initial";
  document.querySelector("#result").textContent = "You rolled "+(dice1 + dice2);
}


