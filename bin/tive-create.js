#!/usr/bin/env node

const path = require('path')
const { Command } = require('commander')
const inquirer = require('inquirer')
const os = require('os')
const { v1 } = require('uuid')
const download = require('download-git-repo');
const ora = require('ora');
const rm = require('rimraf').sync;
const shell = require('shelljs');
const chalk = require('chalk');
const copy = require('copy')


const log = require('../src/log')
const program = new Command()

program
    .name('tive create')
    .usage('<项目名称> [tive-demo]')
    .option('-tpl, --template', 'select template', 'vue2.0')
    .option('-h, --help', 'view help information')
    .parse(process.argv)

const options = program.opts()
// console.log(options)

const args = program.args
// console.log(args)

const dir = path.relative('../', process.cwd())
// console.log(dir)

let projectName = dir

if (args && args.length>0) {
    projectName = args[0]==='.' ? dir : args[0]
} else {
    program.help()
}

// console.log('projectName: %s', projectName)

let template = ''

inquirer.prompt([{
    type: 'list',
    message: '请选择要创建的脚手架或Demo',
    name: 'tel',
    choices: [
        {
            name: 'vue2.0+vantUI移动端Demo',
            value: 'zm-1006/tive-vue2-mobile-demo',
        },
        {
            name: 'vue3.0+vite2+vantUI基础Demo',
            value: 'zm-1006/tive-vue3-vite-demo',
        },
        // new inquirer.Separator(),
    ],
}]).then(res=>{
    // console.log(res)
    template = res.tel
    downloadAndGenerate(template)
});

/*
* @param {string} template
* */
function downloadAndGenerate(template) {
    let tmp = path.join(os.tmpdir(), `tive-template-${v1()}`)
    // console.log(tmp)
    let spinner = ora({
        text: `开始下载模板: ${template}`,
        color: "blue",
    }).start();
    download(template, tmp, (err) => {
        process.on('exit', () => rm(tmp))

        if (err) {
            console.log(err)
            spinner.text = chalk.red(`下载模板 ${template} 失败: ${err.message.trim()}`);
            spinner.fail();
            process.exit(1);
        }
        let tplName = template.split('/').slice(-1)[0]
        spinner.text = chalk.green(`${tplName} 下载成功`);
        spinner.succeed();
        log.tips();

        copy(path.join(tmp, '/**/*'), projectName, (err, files) => {
            if(err){
                log.error(`生成错误: ${err.message.trim()}`);
            }
            // log.success('下载成功...')
            log.tips('Done. Now run:')
            log.tips()
            log.success(`   cd ${projectName}`)
            log.success(`   npm install`)
            log.success(`   npm start`)
            // `files` is an array of the files that were copied
        })

    })

}

