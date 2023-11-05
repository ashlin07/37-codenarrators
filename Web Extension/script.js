/*fetch('https://icanhazdadjoke.com/slack')
    .then(data => data.json())
    .then(jokeData => {
        const jokeText = jokeData.attachments[0].text;
        const jokeElement = document.getElementById('jokeElement');

        jokeElement.innerHTML = jokeText;
    })*/

fetch('http://localhost:3000')
.then(response => response.text())
.then(data => {
    document.getElementById('output').innerText = data;
})
.catch(error => {
    console.error('Error:', error);
});