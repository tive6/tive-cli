export default class Watermark {
    static version = '1.0.0' 
    app = 'Watermark'
    cvs = null
    ctx = null
    img = new Image()
    src = null
    constructor(options={}){
        this.el = options.el || document.body
        this.width = options.width || 150
        this.height = options.height || 150
        this.fontSize = options.fontSize || 11
        this.fontColor = options.fontColor || 'rgba(90,90,90,0.1)'
        this.text = options.text
        // this.text = options.text || '测试文字 12345'
        this.rotate = options.rotate || -30

    }
    get canvasCtx(){
        this.cvs = document.createElement('canvas')
        this.cvs.width = this.width
        this.cvs.height = this.height
        return this.cvs.getContext("2d")
    }
    setTextStyle(){
        this.ctx = this.canvasCtx
        this.ctx.fillStyle = this.fontColor
        this.ctx.font= `${this.fontSize}px`
    }
    getImgContent(){
        this.ctx.translate(50,30)
        this.ctx.rotate(+this.rotate * Math.PI/180)
        this.ctx.fillText(this.text, -5, 35)
        this.src = this.cvs.toDataURL("image/png")
    }
    getImgSrc(){
        this.setTextStyle()
        this.getImgContent()
        return this.src
    }
    setBackground(){
        let src = this.getImgSrc()
        this.wmNode.style.cssText = `
        pointer-events: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url(${src}) repeat;
        background-size: 50%;
        opacity: 0.5;
        `
        this.el.style.cssText = `position: relative;`
        // this.el.appendChild(this.wmNode)
    }
    setSvgBg(){
        // let deg = Math.floor(Math.random()*30+25)
        let deg = 30
        let src = 'data:image/svg+xml;utf8,<svg height="200" style="width: 100%;" ' +
            'xmlns="http://www.w3.org/2000/svg" version="1.1">' +
            '<text style="font-size: '+this.fontSize+'px;" x="20" y="70" fill="'+this.fontColor+'" ' +
            'transform="rotate('+-deg+',70 50)">'+this.text+'</text>' +
            '<text style="font-size: '+this.fontSize+'px;" x="30" y="30" fill="'+this.fontColor+'" ' +
            'transform="translate(200,70) rotate('+-deg+')">'+this.text+'</text>' +
            '<text style="font-size: '+this.fontSize+'px;" x="30" y="70" fill="'+this.fontColor+'" ' +
            'transform="translate(60,150) rotate('+-deg+')">'+this.text+'</text>' +
            '<text style="font-size: '+this.fontSize+'px;" x="30" y="70" fill="'+this.fontColor+'" ' +
            'transform="translate(270,130) rotate('+-deg+')">'+this.text+'</text>' +
            '</svg>'
        // console.log(src)
        let newNode = document.getElementById('wm-mark')
        let wmNode = null
        // console.log(newNode)
        if (!newNode) {
            wmNode = document.createElement('div')
            wmNode.id = 'wm-mark'
        } else {
            wmNode = newNode
        }

        wmNode.style.cssText = `
        pointer-events: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url('${src}') repeat;
        `
        this.el.style.cssText = `position: relative;`
        this.el.appendChild(wmNode)
        // let img = new Image()
        // img.src = src
        // this.el.appendChild(img)
    }
    removeSvgBg(){
        let wmNode = document.getElementById('wm-mark')
        wmNode && this.el.removeChild(wmNode)
    }
}