# tive-cli
>基于`node和npm`的命令行工具集
>>1、基于`vue`脚手架的npm模板工具
> 
>>2、基于`shelljs`的`Git`自动化工具


### 安装
tive-cli 依赖 [Node.js](https://nodejs.org/en/) (>=7.x)：

```
$ npm install tive-cli -g
```

### 用法
```
$ tive create <project-name>
$ tive git <options>
```

示例:

```
$ tive create my-project

$ tive create .     # 当前目录生成

$ tive git -b master -m "push"      # push代码到远程
$ tive git -b dev -t test -m "push"      # 开发分支合并到测试分支并提交 
```

### 基本命令

* `tive` or `tive -h` --- 查看 tive 的帮助信息
* `tive create` or `tive create -h` --- 查看 tive create 的帮助信息
* `tive create your-project-name` --- 用指定的脚手架创建你的项目
* `tive git` or `tive git -h` --- 查看 tive git 的帮助信息
* `tive git -b [current branch] -m [commit description]`
* `tive git -b [current branch] -t [merged branch] -m [commit description]`