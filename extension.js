// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// const vscode = require('vscode');
// const { execSync } = require('child_process');


// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed

// /**
//  * @param {vscode.ExtensionContext} context
//  */
// function activate(context) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "codenarrator" is now active!');

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with  registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	let disposable = vscode.commands.registerCommand('codenarrator.helloWorld', documentCodeWithGpt3 ());

// 	context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated

// function runEslint(code) {
//     try {
//         // Run ESLint on the code and capture the output
//         const eslintOutput = execSync(`npx eslint --no-eslintrc -`, {
//             input: code,
//             encoding: 'utf-8',
//         });
//         return eslintOutput;
//     } catch (error) {
//         return error.stdout;
//     }
// }


// async function documentCodeWithGpt3(code) {
//     try {
//         // Define a query for GPT-3 to generate documentation
//         const query = `Document the following JavaScript code:\n\n${code}`;
        
//         // Use GPT-3 to generate documentation
//         const response = await openai.Completion.create({
//             engine: 'davinci',
//             prompt: query,
//             max_tokens: 100,
//         });
        
//         return response.choices[0].text;
//     } catch (error) {
//         return error.message;
//     }
// }


// const javascriptCode = `
// 	function addNumbers(a, b) {
//     		return a + b;
//     	}
//     	`;
    
//     const eslintOutput = runEslint(javascriptCode);
    
// // Step 2: Generate documentation using GPT-3
// documentCodeWithGpt3(javascriptCode)
//     .then((documentation) => {
//         console.log('ESLint Output:');
//         console.log(eslintOutput);

//         console.log('\nGenerated Documentation:');
//         console.log(documentation);
//     })
//     .catch((error) => {
//             console.error(error);
//         });
    
//     module.exports = {
//         activate,
//         deactivate
//     }
    
//     function deactivate() {}
    
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { spawn } = require('child_process');


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
           
            const pythonProcess = spawn('python', ['C:\\ashlin\\college study material\\sem5\\37-codenarrators\\python_file.py', selectedText]);


// Listen for the Python script's output
            pythonProcess.stdout.on('data', (data) => {
            console.log('Python Output: ' + data.toString());
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