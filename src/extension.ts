import * as vscode from 'vscode';
const date = require('date-and-time');

export function activate(context: vscode.ExtensionContext) {
    let format = 'HH:mm:ss';
    let now = new Date();
    const value = date.format(now,format);
    let clockIsOn = true;
    let timerIsOn = false;

    // This will be used to store the end of timer data
    var timerEnd: Date; 

    let barClock = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);

    barClock.text = value;
    barClock.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    barClock.show();

    let updateClock = setInterval(function () {
        if (clockIsOn) {
            now = new Date();
            barClock.text = date.format(now, format);
        }
    }, 1000);

    let updateTimer = setInterval(function () {
        if (timerIsOn) {
          let now = new Date();
          if (timerEnd > now) {
            barClock.text = date.format(new Date(0,0,0, timerEnd.getHours() - now.getHours(), timerEnd.getMinutes() - now.getMinutes(), timerEnd.getSeconds() - now.getSeconds()), format);
          } else {
            timerIsOn = false;
            vscode.window.showInformationMessage("Timer Complete");
            clockIsOn = true;
          }
        }
    }, 1000);
    
    barClock.command = 'clock.timer';

	let disposable = vscode.commands.registerCommand('clock.timer', async () => {
        var options = {
            prompt: "Enter timer length or press esc to cancel",
            placeHolder: "HH:MM:ss format:" // <- An optional string to show as place holder in the input box to guide the user what to type.
        };

    // Consider adding a stop timer function
    // let disposable = vscode.commands.registerCommand('clock.timer', async () => {
    //     var options = {
    //         prompt: "Enter timer length or press esc to cancel",
    //         placeHolder: "HH:MM:ss format:" // <- An optional string to show as place holder in the input box to guide the user what to type.
    //     };

        let ret = await vscode.window.showInputBox(options);
        console.log("Input: " + ret);
        if (ret !== undefined) {
            timerEnd = new Date();
            let [hours, minutes, seconds] = ret.split(':');
            timerEnd.setHours(timerEnd.getHours() + +hours, timerEnd.getMinutes() + +minutes, timerEnd.getSeconds() + +seconds);
            console.log("Timer is set to end at: " + timerEnd);
            vscode.window.showInformationMessage("Timer started");
            clockIsOn = false;
            timerIsOn = true;
        } 
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
