const { exec } = require('child_process');
const fs = require('fs');


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function execWithTimeout(command, timeout) {
    return new Promise((resolve, reject) => {
        console.log(command);
        exec(command, (error, stdout, stderr) => {
            if (error) { reject(error) }
            else if (stderr) { reject(stderr) }
            else { resolve() }
        });
        setTimeout(() => {
            // When the application is successfully launched, the callback from
            // the 'exec' function will not be executed until the application is
            // closed. Therefore, we need to use setTimeout to return a resolve if
            // the application starts without errors and does not close on its own.
            resolve();
        }, timeout);
    });
}

function isCurrentHourInRange(current, start, end) {
    if (
        (start > end && (current >= start || current < end)) ||
        (start < end && current >= start && current < end)
    ) {
        return true;
    }
    return false;
}



(async () => {
    console.log("Node.js Time-Based Executor\n");

    const scheduleCommands = JSON.parse(fs.readFileSync("scheduleCommands.json", 'utf8'));
    const currentTime = new Date().getHours();

    for (const schedule of scheduleCommands) {
        const { startTime, endTime } = schedule.timeRange; 
        if (!isCurrentHourInRange(currentTime, startTime, endTime)) {
            continue;
        }
        for (const { command, timeout } of schedule.commands) {
            try {
                await execWithTimeout(command, timeout);
            } catch (error) {
                console.log("Error: ", error);
            }
        }
    }
   
    await delay(2000);
    process.exit(0);
})();
