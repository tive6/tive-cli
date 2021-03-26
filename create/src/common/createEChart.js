import echarts from '@/common/echartsConfig.js'

export default class CreateEChart {
  static version = '1.0.0'
  app = 'CreateEChart'
  constructor(opts = {}) {
    this.id = opts.id
    this.els = opts.els
    this.options = opts.options || {}
    this.data = opts.data || {}
    this.instance = echarts.init(document.getElementById(this.id))
    this.init()

    return new Proxy({ ...opts }, {
      set: (target, key, data, receiver) => {
        if (key === 'data') {
          this.data = data
          this.reset()
        }
        if (key === 'setOption') {
          this.data = data
          this.setOption()
        }
        if (key === 'dispose') {
          this.dispose()
        }
        return {}
      },
      get: (target, key, receiver) => {
        return () => {
          // console.log(target)
          // console.log(key)
          if (key === 'dispose') {
            this.dispose()
          }
          if (key === 'clear') {
            this.clear()
          }
          if (key === 'getInstance') {
            return this.instance
          }
          return Reflect.set(...arguments)
        }
      },
      apply: (target, ctx, args) => {
        // console.log(target)
        // console.log(ctx)
        // console.log(args)
        return Reflect.apply(...arguments)
      }
    })
  }
  init () {
    this.instance.setOption(this.options)
    // this.instance.setOption(this.data)
  }
  reset () {
    this.instance.clear()
    this.instance.setOption(this.options)
    this.instance.setOption(this.data)
  }
  setOption () {
    this.instance.clear()
    this.instance.setOption(this.data)
  }
  dispose () {
    this.instance.clear()
    this.instance.dispose()
  }
  clear () {
    this.instance.clear()
  }
}
