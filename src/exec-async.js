const { exec, exit } = require('shelljs');

const execAsync = (command)=>{
    return new Promise((resolve, reject) =>{
        exec(command, {silent: true}, (code, output, err) => {
            if (code !== 0) {
                reject(`
    【command】=> ${command} (失败)
    【code】=> ${code} 
    【output】=> ${err} \r`)
                // exit(1)
            } else {
                console.log(`
    【command】=> ${command} (成功)
    【code】=> ${code} 
    【output】=> ${output}`)
                resolve(1)
            }
        })
    })
}

module.exports = execAsync