const { spawn } = require('child_process');
const fs = require('fs');

// Command to run the Python script and pass input as a command-line argument
const pythonProcess = spawn('python', ['python_file.py', ' def calculate_square(x):     return x ** 2']);

// Listen for the Python script's output
pythonProcess.stdout.on('data', (data) => {
  const outputFile = fs.createWriteStream('output.txt', { flags: 'a' });
  const outputData=data.toString()
  outputFile.write(outputData + '\n');
});

// Listen for errors
pythonProcess.stderr.on('data', (data) => {
  console.error('Python Error: ' + data.toString());
});

// Listen for the Python script to exit
pythonProcess.on('close', (code) => {
  console.log('Python process exited with code ' + code);
});
