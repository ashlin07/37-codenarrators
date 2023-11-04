document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fetch').addEventListener('click', () => {
        fetch('http://localhost:3000')
            .then(response => response.text())
            .then(data => {
                document.getElementById('output').innerText = data;
                console.log("html");
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});