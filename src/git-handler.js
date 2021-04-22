const chalk = require('chalk')
const ora = require('ora')
const ExecAsync = require('../src/exec-async')

const time = Date.now()
const spinner = ora({
    text: `${chalk.cyan.bgYellowBright(' Doing ... ')}`,
    color: "green",
})
/*
* git push
* */
exports.push = (data) => {
    spinner.start()
    ExecAsync('git status').then(res => {
        return ExecAsync('git fetch')
    }).then(res=>{
        return ExecAsync('git add .')
    }).then(res=>{
        return ExecAsync(`git commit -m "${data.commit}"`)
    }).then(res=>{
        return ExecAsync(`git push origin ${data.branch}`)
    }).then(res=>{
        spinner.text = `${chalk.greenBright.bgCyan(' Run successfully ')}`
        spinner.succeed()
    }).catch(err => {
        spinner.text = `${chalk.red.bgWhite(' Run failed ')}`
        spinner.fail()
    }).finally(()=>{
        console.log(`\n${chalk.bgGreen(' DONE ')} ${chalk.green(`End of shell script in ${getTime()}ms`)}`)
    })
}

/*
* git merge
* */
exports.merge = (data) => {
    spinner.start()
    ExecAsync('git status').then(res => {
        return ExecAsync('git fetch')
    }).then(res=>{
        return ExecAsync('git add .')
    }).then(res=>{
        return ExecAsync(`git commit -m "${data.commit}"`)
    }).then(res=>{
        return ExecAsync(`git checkout ${data.target}`)
    }).then(res=>{
        return ExecAsync('git fetch')
    }).then(res=>{
        return ExecAsync(`git mg "${data.branch} merge" ${data.branch}`)
    }).then(res=>{
        return ExecAsync(`git push origin ${data.target}`)
    }).then(res=>{
        return ExecAsync(`git checkout ${data.branch}`)
    }).then(res=>{
        spinner.text = `${chalk.greenBright.bgCyan(' Run successfully ')}`
        spinner.succeed()
    }).catch(err => {
        spinner.text = `${chalk.red.bgWhite(' Run failed ')}`
        spinner.fail()
    }).finally(()=>{
        console.log(`${chalk.bgGreen(' DONE ')} ${chalk.green(`End of shell script in ${getTime()}ms`)}`)
    })
}


function getTime() {
    return Date.now() - time
}