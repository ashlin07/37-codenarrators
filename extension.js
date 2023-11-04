// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "codenarrator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('codenarrator.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from CodeNarrator!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

function runEslint(code) {
    try {
        // Run ESLint on the code and capture the output
        const eslintOutput = execSync(`npx eslint --no-eslintrc -`, {
            input: code,
            encoding: 'utf-8',
        });
        return eslintOutput;
    } catch (error) {
        return error.stdout;
    }
}


async function documentCodeWithGpt3(code) {
    try {
        // Define a query for GPT-3 to generate documentation
        const query = `Document the following JavaScript code:\n\n${code}`;

        // Use GPT-3 to generate documentation
        const response = await openai.Completion.create({
            engine: 'davinci',
            prompt: query,
            max_tokens: 100,
        });

        return response.choices[0].text;
    } catch (error) {
        return error.message;
    }
}

const eslintOutput = runEslint(javascriptCode);

// Step 2: Generate documentation using GPT-3
documentCodeWithGpt3(javascriptCode)
    .then((documentation) => {
        console.log('ESLint Output:');
        console.log(eslintOutput);

        console.log('\nGenerated Documentation:');
        console.log(documentation);
    })
    .catch((error) => {
        console.error(error);
    });

const javascriptCode = `
	function addNumbers(a, b) {
		return a + b;
	}
	`;

module.exports = {
	activate,
	deactivate
}
