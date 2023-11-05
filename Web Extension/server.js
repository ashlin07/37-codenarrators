const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3000;
const { spawn } = require('child_process');

function getSelectedText(text) {
    console.log(text);
    console.log("select");
    return text;
    // return "sample text";
}

// Respond with "Hello, World!" for requests to the root URL ('/')
app.get('/', (req, res) => {
    
    const selectedText = "Your selected text here"; // Replace with the actual selected text
    const processedText = getSelectedText(selectedText);
    const pythonProcess = spawn('python', ['python_file.py', processedText]);
    let dataToSend = '';

    pythonProcess.stdout.on('data', (data) => {
        dataToSend += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        console.log(`server ${dataToSend}`);
        res.send(dataToSend);
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
