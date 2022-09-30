# Readme

## Project Description
In my assignment, I created a clock plugin for vscode using typescript. The
clock, formatted in military time, counts in one second intervals and has
timer functionality which remembers the previously provided timer.

## Getting Started
Download the zip and unzip it to a local directory. From the extension.tx file, run the extension using F5. A new window will open
with a clock in the bottom left hand corner highlighted in red. To use the timer
functionality, click on the clock and enter a time in hh:mm:ss format. For 
example, if I wanted to enter a 5 second timer, I would click on the clock and
type "00:00:05" representing 00 hours, 00 minutes, and 05 seconds. *Note: the*
*behavior of the extension with other input formats is not well defined.* Once
the timer has been given a time, a countdown will begin. Once the timer is up,
the user is notified and the clock resumes.

##  Sources
- https://code.visualstudio.com/api/get-started/your-first-extension
- https://code.visualstudio.com/api/references/vscode-api
- https://www.geeksforgeeks.org/what-is-setinterval-in-javascript/