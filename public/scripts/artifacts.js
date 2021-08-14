

const itemTitle = document.querySelector("#itemTitle");
const itemAge = document.querySelector("#itemAge");

if (parseInt(itemAge.textContent) > 3000)
{
    itemTitle.style.color = "salmon";
}


