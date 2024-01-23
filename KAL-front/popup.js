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
  req = sanitize(input);
  url = `https://yahooshop.azurewebsites.net/api/httpYahooApi`;
  sendReq = req;
  console.log("Sending Reqeust");
  const requestData = {
    model: "gpt-3",
    request: `${sendReq}`,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    console.log("Error");
    return;
  }

  const data = await response.json();

  str = str + "\n" + data;
  document.getElementById("edit_area").textContent = str;
}
