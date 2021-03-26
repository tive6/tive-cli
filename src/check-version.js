const chalk = require('chalk')
const pacote = require('pacote')
const semver = require('semver')
const log = require('../src/log')
const { version } = require('../package.json')

module.exports = function () {
    pacote.manifest(`tive-cli@latest`, {
        defaultTag: 'latest',
    }).then(res=>{
        // console.log(res)
        let latest = res.version
        let isLatest = semver.lt(version, latest)
        // console.log(isLatest)
        if (isLatest) {
            log.tips()
            log.tips('**********************************************')
            log.tips('*                                            *')
            log.tips('*'+chalk.blue('  tive-cli 有新的版本.                      ')+'*')
            log.tips('*                                            *')
            log.tips(`*  最新版本:       ${chalk.green(latest)}                     *`)
            log.tips(`*  当前版本:       ${chalk.red(version)}                     *`)
            log.tips(`*  升级成最新:     ${chalk.green('npm install -g tive-cli')}   *`)
            log.tips('*                                            *')
            log.tips('**********************************************')
            log.tips()
        }
    }).catch(() => null)
}

