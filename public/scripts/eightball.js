
const answers = [
  "It is Certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful"
]


document.querySelector(".rollButton").addEventListener("click",function(){
  rollAnswer();
})

const textDisplay = document.querySelector("#eightballText");

let fading = false;

function rollAnswer()
{
  if(fading)
  {
    return;
  }
  else
  {
    fading = true;
    fadeOut(textDisplay);
    later(1000).then(() => fadeIn(textDisplay));
    later(2000).then(() => fading = false);
  }

}

function changeText()
{
  const answer = Math.floor(Math.random() * answers.length);
  textDisplay.textContent = answers[answer].toUpperCase();
}

function later(delay)
{
  return new Promise(function(resolve){
    setTimeout(resolve,delay);
  });
}

function fadeOut(element)
{
  let opacity = 1;
  let timer = setInterval(function(){
    if (opacity <= 0.01)
    {
      clearInterval(timer);
      changeText();
    }
    element.style.opacity = opacity;
    opacity -= opacity * 0.1;
  },10);
}

function fadeIn(element)
{
  let opacity = 0.01;
  element.style.display = "initial";
  let timer = setInterval(function(){
    if (opacity >= 1)
    {
      clearInterval(timer);
    }
    element.style.opacity = opacity;
    opacity += opacity * 0.1;
  }, 10);
}