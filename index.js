const chalk = require('chalk')
const pacote = require('pacote')

console.log(chalk.green('123123'))


console.log(chalk.bgBlack.white(`\n New npm version is: 
1.0.0`))


pacote.manifest(`tive-cli@1.0.3`, {
    // always prefer latest, even if doing --tag=whatever on the cmd
    defaultTag: 'latest',
}).then(res=>{
    console.log(res)
}).catch(() => null)