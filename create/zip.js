const adm_zip = require('adm-zip')
const rm = require('rimraf')
const fs = require('fs')
// console.log(process.argv)

fs.exists('./dist', (s) => {
    if (s) {
        handle()
    } else {
        console.log('dist目录不存在')
    }
})

function handle () {
    let ver = process.argv.length > 2 && process.argv.slice(-1)[0] || '01'
    let t = new Date()
    let month = t.getMonth() + 1
    let day = t.getDate()
    let date = '' + t.getFullYear() + (month > 9 ? month : '0' + month) + (day > 9 ? day : '0' + day)
    // console.log(date)
    //creating archives
    let filename = `dist-${date}-${ver}.zip`
    const zip = new adm_zip()
    // zip.addLocalFolder('./dist')
    // zip.writeZip(`C:/Users/xxx/Desktop/zip/${filename}`)
    // console.log(filename)
    // console.log('dist 压缩完成')
    //extracting archives
    // var unzip = new adm_zip('C:/Users/xxx/dist.zip')
    // unzip.extractAllTo("C:/Users/xxx/Desktop/git", /*overwrite*/true)

    // rm('./dist', () => { // 删除当前目录
    //     console.log('dist deleted')
    // })
}

