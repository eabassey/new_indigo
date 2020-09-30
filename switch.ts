const { exec } = require('child_process');
const chalk = require('chalk');

const envKey = process.argv[2];
const [clientName, envName] = envKey.split('-');

exec(`rm -f .env && cp ./envs/${clientName}/.env.${envKey} .env`, (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      console.error(err)
    } else {
     // the *entire* stdout and stderr (buffered)
    }
  });

// console.log({env: process.env.NODE_ENV, client_id: process.env.FOURSURE_CLIENT_ID});
console.log(`You are now running client ${chalk.blue.underline.bold(clientName.toUpperCase())} in ${chalk.green.underline.bold(envName.toUpperCase())} mode.`);