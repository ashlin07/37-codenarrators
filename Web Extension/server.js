const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const port = 3000;
const { spawn } = require('child_process');

// Respond with "Hello, World!" for requests to the root URL ('/')
app.get('/', (req, res) => {
    const pythonProcess = spawn('python', ['python_file.py']);
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

// // Handle a GET request at /data
// app.get('/data', (req, res) => {
//   const data = {
//     name: 'John Doe',
//     age: 30,
//     occupation: 'Engineer'
//   };
//   res.json(data);
// });

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});