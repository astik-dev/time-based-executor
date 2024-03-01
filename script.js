const { exec } = require('child_process');



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function execWithTimeout(command, timeout) {
    return new Promise((resolve, reject) => {
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



(async () => {
    const currentHours = new Date().getHours();

    if (currentHours >= 16 || currentHours <= 7) {
        try {
            await execWithTimeout(`"C:/Program Files/LGHUB/system_tray/lghub_system_tray.exe"`, 2000);
            await execWithTimeout(`taskkill /F /IM lghub.exe`, 2000);
        } catch (error) {
            console.log("Error: ", error);
        }
    }
   
    await delay(2000);
    process.exit(0);
})();
