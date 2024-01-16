// popup.js
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('inputForm');

    form.onsubmit = function (e) {
        e.preventDefault();
        var userInput = document.getElementById('userInput').value;

        fetch('YOUR_SERVER_ENDPOINT/query-gpt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: userInput })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('responseArea').textContent = data.choices[0].text;
        })
        .catch(error => {
            console.error('Error:', error);
        });

        document.getElementById('userInput').value = '';
    };
});
