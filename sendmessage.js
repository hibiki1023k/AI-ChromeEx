import { KAL_ENDPOINT } from "./.env";
const url = KAL_ENDPOINT;

function sanitize(input) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(input));
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector("#send");
  button.addEventListener("click", function () {
    var input = document.querySelector("#req");
    console.log(input.value);
    send(input.value);
  });
});

async function send(input) {
  const req = sanitize(input);
  const sendReq = req;
  console.log("Sending Reqeust");
  const requestData = {
    model: "gpt - 3",
    request: sendReq,
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
  const res = data.response;
  // 新しいdiv要素を作成
  var newDiv = document.createElement("div");

  // 新しいdiv要素にclassを追加
  newDiv.className = "gpt_res";

  // 新しいdiv要素にテキストノードを追加
  var newContent = document.createTextNode(res);
  newDiv.appendChild(newContent);

  // 既存のdiv要素を取得
  var currentDiv = document.querySelector(".res");

  // 新しいdiv要素を既存のdiv要素の子として追加
  currentDiv.appendChild(newDiv);
}
