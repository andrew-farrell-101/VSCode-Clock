import * as vscode from 'vscode';
const date = require('date-and-time');

export function activate(context: vscode.ExtensionContext) {
    // format to print out the final clock
    let format = 'HH:mm:ss';
    let clockIsOn = true;
    
    // This will be used to store the end of timer data
    // I'm declaring it here because I'll need it in different parts of the code
    // later. Not ideal but it is what it is. 
    let timerEnd: Date; 

    // set up the clock and make it show up
    let barClock = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    barClock.text = date.format(new Date(),format);
    barClock.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    barClock.show();
	
    // variable to configure the timer completion notification
    let msgOpts = {
        detail: "Your timer complete.",
        modal: true,
    };
	
    // this will be used to update both the clock and timer on a 1000ms interval
    setInterval(function () {
        let now = new Date();
        if (clockIsOn) {
            barClock.text = date.format(now, format);
        } else {
            // if the timer hasn't ended yet
            if (timerEnd > now) {
                // set the clock timer text to the differenec between the time 
                // stored in now and the time stored in the timer end.
                barClock.text = date.format(new Date(0,0,0,
                    timerEnd.getHours() - now.getHours(),
                    timerEnd.getMinutes() - now.getMinutes(),
                    timerEnd.getSeconds() - now.getSeconds()),
                    format);
            } else {
		        // turn the clock back on and notify the user
                clockIsOn = true;
                vscode.window.showInformationMessage("Timer complete", msgOpts);
            }
        }
    }, 1000);

    // set a command that will activate on clicking the clock widget
    barClock.command = 'clock.timer';
	let disposable = vscode.commands.registerCommand('clock.timer', async () => {
		let options = {
		    prompt: "Enter timer length or press esc to cancel",
		    placeHolder: "Please only use HH:MM:ss format",
		    value: context.globalState.get("previousTimer", "")
		};
		
		// get and set user input
		let ret = await vscode.window.showInputBox(options);
		context.globalState.update("previousTimer", ret);
		
		if (ret) {
		    // **No thorough checking is done of the input, I only check
		    // to make sure the string has something in it
		    let [hours, minutes, seconds] = ret.split(':');
		    timerEnd = new Date();
		    timerEnd.setHours(timerEnd.getHours() + +hours,
				      timerEnd.getMinutes() + +minutes,
				      timerEnd.getSeconds() + +seconds);
		    clockIsOn = false;
		    vscode.window.showInformationMessage("Timer started");
		}
	});
	context.subscriptions.push(disposable);
}

export function deactivate() {}