console.log("This is a popup!");
var str = "";

function sanitize(input) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(input));
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector("#send");
  button.addEventListener("click", function () {
    var input = document.querySelector("#jannum");
    console.log(input.value);
    send(input.value);
  });
});

async function send(input) {
  jannum = sanitize(input);
  console.log("Sending Jancode");
  const response = await fetch(
    `https://yahooshop.azurewebsites.net/api/httpYahooApi?jannumber=${jannum}`
  );
  const data = await response.json();
  console.log(data);

  str = str + "\n" + data;
  document.getElementById("edit_area").textContent = str;
}
