

var possibleNames = ["Dave", "Sid", "Billy", "Aethel", "Rosemary", "Connor","Cara","Jenny","Laurence","Tasha","Fred","Greg","Norman","Paul","Marie","William","Matt","Sarah","Megan","Hazel","Wayne","Mil","Bill","Lola","Harry","Ross",
"Bruce","Cook",
"Carolyn","Morgan",
"Albert","Walker",
"Randy","Reed",
"Larry","Barnes",
"Lois","Wilson",
"Jesse","Campbell",
"Ernest","Rogers",
"Theresa","Patterson",
"Henry","Simmons",
"Michelle","Perry",
"Frank","Butler",
"Shirley","Brooks",
"Rachel","Edwards",
"Christopher","Perez",
"Thomas","Baker",
"Sara","Moore",
"Chris","Bailey",
"Roger","Johnson",
"Marilyn","Thompson",
"Anthony","Evans",
"Julie","Hall",
"Paula","Phillips",
"Annie","Hernandez",
"Dorothy","Murphy",
"Alice","Howard","Ruth","Jackson",
"Debra","Allen",
"Gerald","Harris",
"Raymond","Carter",
"Jacqueline","Torres",
"Joseph","Nelson",
"Carlos","Sanchez",
"Ralph","Clark",
"Jean","Alexander",
"Stephen","Roberts",
"Eric","Long",
"Amanda","Scott",
"Teresa","Diaz",
"Wanda","Thomas"];
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
