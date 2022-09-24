// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const date = require('date-and-time');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
    const now = new Date();
    const value = date.format(now,'HH:mm');
	console.log('Congratulations, your extension "clock" is now active!');
    let barClock = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    barClock.text = value;
    barClock.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    barClock.show();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('clock.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
        // barClock.show();
		vscode.window.showInformationMessage('Hello VS Code!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
