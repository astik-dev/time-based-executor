# Time-Based Executor
This Node.js script, `script.js`, is designed to execute commands based on a specified time range. The script reads a schedule from a JSON file, `scheduleCommands.json`, and runs commands if the current hour falls within the specified time range.

## Features
- **Time-Based Execution:** The script allows you to define time ranges during which specific commands should be executed.
- **Automated Startup:** Included is a `startup.bat` file that can be added to Windows autostart to ensure the script runs automatically on system startup.

## How to Use
1. **Define Schedule**: Edit the `scheduleCommands.json` file to set up your desired schedule. Specify the start and end times for each command set along with the corresponding commands and timeouts.
2. **Configure Autostart (Optional):** If you want the script to run automatically on Windows startup, add `startup.bat` to the Windows autostart.
3. **Run the Script:** Execute the script using Node.js by running the command `node script.js`.

## Schedule Commands Example
```json
[
    {
        "timeRange": {
            "startTime": 17,
            "endTime": 7
        },
        "commands": [
            {
                "command": "\"C:/Program Files/Example/example.exe\"",
                "timeout": 2000
            },
            {
                "command": "taskkill /F /IM example.exe",
                "timeout": 2000
            }
        ]
    }
]
```
In this example, the script will execute two commands between 5 PM (17:00) and 7 AM (07:00). The commands involve launching an executable and killing a process.

## Why Use Timeout?
The **timeout** parameter is crucial for handling scenarios where the application being launched by the **exec** function does not close immediately. When an application is successfully launched, the callback from the **exec** function will not be executed until the application is closed. This can potentially lead to the script waiting indefinitely, especially if the application does not close on its own.  
To address this, the script utilizes the **setTimeout** function to introduce a timeout period. If the application starts without errors and does not close within the specified timeout, the **resolve** is triggered, allowing the script to move forward. This ensures that the script doesn't get stuck waiting for a response from the launched application and can continue executing the subsequent commands in the schedule.