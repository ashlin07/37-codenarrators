
const vscode = require('vscode');
const { spawn } = require('child_process');
const fs=require('fs');


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "CodeNarrator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('codenarrator.codenarrator', () => {
		// The code you place here will be executed every time your command is executed
        const editor = vscode.window.activeTextEditor;
        if(editor){
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            // vscode.window.showInformationMessage(selectedText)
            // const { spawn } = require('child_process');
           
            const pythonProcess = spawn('python', ['D:\\Kodikon\\37_codenarrators\\py_file.py', selectedText]);


// Listen for the Python script's output
            pythonProcess.stdout.on('data', (data) => {
                const outputFile = fs.createWriteStream('D:\\Kodikon\\37_codenarrators\\output.txt', { flags: 'a' });
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
            // pythonProcess.stdout.on('data', (data) => {
            //     vscode.window.showInformationMessage('Python Output: ' + data.toString());
            //   });
            
        }
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate
}