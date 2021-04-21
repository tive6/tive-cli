const { exec, exit } = require('shelljs');
const chalk = require('chalk');

const execAsync = (command)=>{
    return new Promise((resolve, reject) =>{
        exec(command, {silent: true}, (code, output, err) => {
            if (code !== 0) {
                console.log(chalk.red(`
${chalk.redBright(`┍-------------------- ${command} --------------------┑`)}

【command】=> \t${chalk.underline.magenta(command)} (失败)
【code】=> \t${chalk.magenta(code)}
【output】=> \n${chalk.redBright(err)}
${chalk.redBright(`┕-------------------- ${command} --------------------┙`)}`))
                reject(0)
                // exit(1)
            } else {
                console.log(chalk.cyan(`
${chalk.cyanBright(`┍-------------------- ${command} --------------------┑`)}

【command】=> \t${chalk.underline.green(command)} (成功)
【code】=> \t${chalk.green(code)}
【output】=> \n${chalk.cyanBright(output)}
${chalk.cyanBright(`┕-------------------- ${command} --------------------┙`)}`))
                // console.log('「﹁﹂」『﹃﹄』┌┐└┘┍┑┕┙')
                resolve(1)
            }
        })
    })
}

module.exports = execAsync