

var possibleNames = ["Dave", "Sid", "Billy", "Aethel", "Rosemary", "Connor","Cara","Jenny","Laurence","Tasha","Fred","Greg","Norman","Paul","Marie","William","Matt","Sarah","Megan","Hazel","Wayne","Mil","Bill","Lola"];
var usedNames = new Array();


document.querySelector(".rollButton").addEventListener("click",function(){
  generateNames();
})


function generateNames()
{
  var items = document.querySelectorAll(".result");
      usedNames = Array.from(possibleNames);
  for (var i = 0; i < items.length; i++)
  {
    var selectedNameIndex = Math.floor(Math.random()*usedNames.length)
    var selectedName = usedNames[selectedNameIndex];
    usedNames.splice(selectedNameIndex, 1);
    items[i].textContent = selectedName;
  }

  document.querySelectorAll(".tableDiv")[0].style.display = "inline-flex";
  document.querySelectorAll(".tableDiv")[1].style.display = "inline-flex";


//  document.querySelector("#result").textContent = "Your number is "+(dice1 + dice2);
}
