# tive-cli
>基于`node和npm`的命令行工具集
>>1、基于`vue`脚手架的npm模板工具
> 
>>2、基于`shelljs`的`Git`自动化工具


## 安装
tive-cli 依赖 [Node.js](https://nodejs.org/en/) (>=7.x)：

```
$ npm install tive-cli -g
```

## 用法
```
$ tive create <project-name>
$ tive git <options>
```

示例：

```
$ tive create my-project                # 自定义目录生成

$ tive create .                         # 当前目录生成

$ tive git -b master -m "push"          # push代码到远程
$ tive git -b dev -t test -m "push"     # 开发分支合并到测试分支并提交 
$ tive git -c ./tive.git.config.js      # 顺序执行自定义组合git命令
```

## 基本命令

* `tive` or `tive -h` --- 查看 tive 的帮助信息
* `tive create` or `tive create -h` --- 查看 tive create 的帮助信息
* `tive create your-project-name` --- 用指定的脚手架创建你的项目
* `tive git` or `tive git -h` --- 查看 tive git 的帮助信息
* `tive git -b [current branch] -m [commit description]`
* `tive git -b [current branch] -t [merged branch] -m [commit description]`
* `tive git -c [git config]`

### git配置文件

*提示*：git命令顺序执行

目录：和`package.json`同级

示例：`tive.git.config.js`

```javascript
module.exports = {
    shell: [
        'git status',
        'git add .',
        'git commit -m "commit description"',
        'git push origin master',
    ]
}
```

## 在线文档

* 详见：[基于node和npm的命令行工具——tive-cli](https://tiven.cn/p/d85f4546/ "天問博客") 