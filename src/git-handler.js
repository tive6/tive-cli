const chalk = require('chalk');
const ExecAsync = require('../src/exec-async')
const log = require('./log')
let time = Date.now()
/*
* git push
* */
exports.push = (data) => {
    ExecAsync('git status').then(res => {
        return ExecAsync('git fetch')
    }).then(res=>{
        return ExecAsync('git add .')
    }).then(res=>{
        return ExecAsync(`git commit -m "${data.commit}"`)
    }).then(res=>{
        return ExecAsync(`git push origin ${data.branch}`)
    }).catch(err => {
        // console.log(err)
    }).finally(()=>{
        console.log(`\n${chalk.bgGreen(' DONE ')} ${chalk.green(`End of shell script in ${getTime()}ms`)}`)
    })
}

/*
* git merge
* */
exports.merge = (data) => {
    ExecAsync('git status').then(res => {
        return ExecAsync('git fetch')
    }).then(res=>{
        return ExecAsync('git add .')
    }).then(res=>{
        return ExecAsync(`git commit -m "${data.commit}"`)
    }).then(res=>{
        return ExecAsync(`git ck ${data.target}`)
    }).then(res=>{
        return ExecAsync('git fetch')
    }).then(res=>{
        return ExecAsync(`git mg "${data.branch} merge" ${data.branch}`)
    }).then(res=>{
        return ExecAsync(`git push origin ${data.target}`)
    }).then(res=>{
        return ExecAsync(`git ck ${data.branch}`)
    }).catch(err => {
        console.log(err)
    }).finally(()=>{
        console.log(`${chalk.bgGreen(' DONE ')} ${chalk.green(`End of shell script in ${getTime()}ms`)}`)
    })
}


function getTime() {
    return Date.now() - time
}