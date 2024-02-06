const url = "aaa";
var conversation = "";

function sanitize(input) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(input));
  return div.innerHTML;
}

//sendボタンを押したかどうかの判定
document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector("#send");
  button.addEventListener("click", function () {
    var input = document.querySelector("#req");
    if (input.value != "") {
      send(input.value);
    }
  });
});

//refreshボタンを押したかどうかの判定
document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector("#refresh");
  button.addEventListener("click", function () {
    clearChildren();
  });
});

// テキストエリアの内容をクリア
function clearText() {
  var textForm = document.getElementById("req");
  textForm.value = "";
}

//会話を削除
function clearChildren() {
  var resDiv = document.getElementById("res");
  conversation = "";
  while (resDiv.firstChild) {
    resDiv.removeChild(resDiv.firstChild);
  }
}

//  backendにリクエストを送信
async function send(input) {
  const req = sanitize(input);
  conversation += "User: " + req + ",";
  console.log("Sending Reqeust");
  const requestData = {
    model: "gpt - 3",
    request: conversation,
  };
  // 送信したリクエストを表示
  var newDiv = document.createElement("div");
  newDiv.className = "message";
  var newContent = document.createTextNode(req);
  newDiv.appendChild(newContent);
  var currentDiv = document.querySelector("#res");
  currentDiv.appendChild(newDiv);

  clearText();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("エラーが発生しました");
    }
  } catch (error) {
    console.log(error);
    var newDiv = document.createElement("div");
    newDiv.className = "error_message";
    var newContent = document.createTextNode("エラーが発生しました");
    newDiv.appendChild(newContent);
    var currentDiv = document.querySelector("#res");
    currentDiv.appendChild(newDiv);
  }

  const data = await response.json();
  const res = data.response;
  conversation += "GPT: " + res + ",";
  // 新しいdiv要素を作成
  var newDiv = document.createElement("div");

  // 新しいdiv要素にclassを追加
  newDiv.className = "gpt_res";

  // 新しいdiv要素にテキストノードを追加
  var newContent = document.createTextNode(res);
  newDiv.appendChild(newContent);

  // 既存のdiv要素を取得
  var currentDiv = document.querySelector("#res");

  // 新しいdiv要素を既存のdiv要素の子として追加
  currentDiv.appendChild(newDiv);
}
