import Utils from './utils'

export const getFirstWeekDate = (year) => {
    let firstDay = new Date(`${year}-01-01`)
    let fw = firstDay.getDay()
    // console.log(fw)
    let startMs = firstDay.valueOf()

    if (fw !== 1) {
        fw = fw === 0 ? 7 : fw
        let dd = 31-(fw-2)
        firstDay = new Date(`${year-1}-12-${dd}`)
        startMs = firstDay.valueOf()
    }

    return {
        date: firstDay,
        ms: startMs,
    }
}

export const getWeekData = (date) => {
    let year = new Date(date).getFullYear()
    let { ms } = getFirstWeekDate(year)
    let startMs = ms
    let oneDays = Utils.getDateTime().oneTimes
    let today = new Date(date)
    let tw = today.getDay()
    tw = tw === 0 ? 0 : tw
    let lastMs = today.valueOf() - tw * oneDays

    // if (fw !== 1) {
    //     fw--
    //     fw = fw === 0 ? 7 : fw
    //     startMs = firstDay.valueOf() + (7 - fw) * oneDays
    // }
    // console.log(Utils.formatFixedDate(startMs, 'M.d'))
    let list = []
    let weekMap = {}
    let weeks = 1
    while (startMs <= lastMs) {
        let arr = []
        let nedMs = startMs + oneDays * 6
        arr[0] = Utils.formatFixedDate(startMs, 'M.d')
        arr[1] = Utils.formatFixedDate(nedMs, 'M.d')
        list.push({
            weeks,
            date: arr,
        })
        weekMap[`${year}_${weeks}`] = [startMs, nedMs]
        weeks++
        startMs += oneDays * 7
    }
    list.reverse()
    let weekList = list.map(item => {
        return {
            text: `${year}年 ${item.weeks}周 (${item.date[0]}～${item.date[1]})`,
            value: `${year}_${item.weeks}`,
        }
    })
    let weekSelect = weekList[0].value

    return {
        weekList,
        weekMap,
        weekSelect,
    }
}

export const weekInit = (date, cb) => {
    // this.lastDate = '2021-05-11'
    // console.log(date)
    let year = new Date(date).getFullYear()
    let wl = [], wm = {}, ws = ''
    for (let i=2020; i <= year; i++) {
        let d = date
        if (i!==year) {
            let { ms } = getFirstWeekDate(i+1)
            d = Utils.formatFixedDate(ms, 'yyyy-MM-dd')
        }
        let { weekList, weekMap, weekSelect } = getWeekData(d)
        if (i===year) {
            ws = weekSelect
        }
        wl = [
            ...weekList,
            ...wl,
        ]
        wm = {
            ...weekMap,
            ...wm,
        }
    }
    cb && cb({
        weekList: wl,
        weekMap: wm,
        weekSelect: ws,
    })

}