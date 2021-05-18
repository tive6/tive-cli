const chalk = require('chalk')
const ora = require('ora')
const ExecAsync = require('../src/exec-async')

const time = Date.now()
const spinner = ora({
    text: `${chalk.cyan.bgYellowBright(' Doing ... ')}`,
    color: "green",
})

function getTime() {
    return Date.now() - time
}

/*
* git push
* */
const push = (data) => {
    spinner.start()
    ExecAsync('git status').then(res => {
        return ExecAsync('git add .')
    }).then(res=>{
        return ExecAsync(`git commit -m "${data.commit}"`)
    }).then(res=>{
        return ExecAsync(`git pull origin ${data.branch}`)
    }).then(res=>{
        return ExecAsync(`git push origin ${data.branch}`)
    }).then(res=>{
        return ExecAsync(`git status`)
    }).then(res=>{
        spinner.text = `${chalk.greenBright.bgBlueBright(' Run successfully ')}`
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
const merge = (data) => {
    spinner.start()
    ExecAsync('git status').then(res => {
        return ExecAsync('git add .')
    }).then(res=>{
        return ExecAsync(`git commit -m "${data.commit}"`)
    }).then(res=>{
        return ExecAsync(`git pull origin ${data.branch}`)
    }).then(res=>{
        return ExecAsync(`git checkout ${data.target}`)
    }).then(res=>{
        return ExecAsync(`git pull origin ${data.target}`)
    }).then(res=>{
        return ExecAsync(`git merge --no-ff -m "${data.branch} ${data.commit} merge into ${data.target}" ${data.branch}`)
    }).then(res=>{
        return ExecAsync(`git push origin ${data.target}`)
    }).then(res=>{
        return ExecAsync(`git checkout ${data.branch}`)
    }).then(res=>{
        return ExecAsync(`git status`)
    }).then(res=>{
        spinner.text = `${chalk.greenBright.bgBlueBright(' Run successfully ')}`
        spinner.succeed()
    }).catch(err => {
        spinner.text = `${chalk.red.bgWhite(' Run failed ')}`
        spinner.fail()
    }).finally(()=>{
        console.log(`${chalk.bgGreen(' DONE ')} ${chalk.green(`End of shell script in ${getTime()}ms`)}`)
    })
}

/*
* custom git configuration
* */
const runShell = (list, index=0) => {
    let len = list.length
    if (index === 0) {
        spinner.start()
    }
    if (index < len) {
        ExecAsync(list[index]).then(res => {
            if (index === len-1) {
                spinner.text = `${chalk.greenBright.bgBlueBright(' Run successfully ')}`
                spinner.succeed()
                console.log(`\n${chalk.bgGreen(' DONE ')} ${chalk.green(`End of shell script in ${getTime()}ms`)}`)
            }
            runShell(list, ++index)
        }).catch(err => {
            spinner.text = `${chalk.red.bgWhite(' Run failed ')}`
            spinner.fail()
            console.log(`\n${chalk.bgGreen(' DONE ')} ${chalk.green(`End of shell script in ${getTime()}ms`)}`)
        })
    }
}

module.exports = {
    push,
    merge,
    runShell,
}