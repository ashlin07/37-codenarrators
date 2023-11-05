// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const doc = window.document;

// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('fetch').addEventListener('click', () => {
//         fetch('http://localhost:3000')
//             .then(response => response.text())
//             .then(data => {
//                 document.getElementById('output').innerText = data;
//                 console.log("html");
//                 console.log(data);
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     });
// });

// Example of how to get selected text and send it to the server
document.getElementById('fetch').addEventListener('click', () => {
    const selectedText = window.getSelection().toString();
    fetch(`http://localhost:3000?selectedText=${encodeURIComponent(selectedText)}`)
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

