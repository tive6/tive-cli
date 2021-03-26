<template>
    <div class="com-calendar">
        <div class="com-calendar-head">
            <div class="com-quick">

            </div>
            <div class="com-calendar-week">
                <div v-for="(item, index) in weekText" :key="index" class="com-calendar-wl">{{item}}</div>
            </div>
        </div>
        <div class="com-calendar-outer">
            <div v-for="(item, index) in dateList" :key="index" class="com-calendar-inner">
                <div class="com-calendar-ym">{{item.ym}}</div>
                <div class="com-calendar-ul">
                    <div v-for="(val, i) in item.list"
                         :key="i" class="com-calendar-li"
                         :class="{
                             'selected': dateMap[val.date] && dateMap[val.date].selected,
                             'end': dateMap[val.date] && dateMap[val.date].isEnd,
                              'first': dateMap[val.date] && dateMap[val.date].isFirst,
                              'last': dateMap[val.date] && dateMap[val.date].isLast,
                              }"
                         @click="dateChange(val)">{{val.day}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import Utils from '@/common/utils'
    export default {
        components: {},
        props: {
            type: {
                type: String,
                default: 'single',
            },
            formatter: {
                type: String,
                default: ''
            },
        },
        data () {
            let { oneDayMs, yesterday } = Utils.getDateTime()
            return {
                weekText: [
                    '日',
                    '一',
                    '二',
                    '三',
                    '四',
                    '五',
                    '六',
                ],
                dateList: [],
                dateMap: {},
                dateArr: [],
                selectDate: this.$utils.formatFixedDate(new Date(), 'yyyy-MM-dd'),
                oldSelectDate: '',
                selectArr: [
                    this.$utils.formatFixedDate(yesterday, 'yyyy-MM-dd'),
                    this.$utils.formatFixedDate(new Date(), 'yyyy-MM-dd'),
                ],
                oldSelectArr: [],
            }
        },
        mounted () {
            this.getDateLi()
            console.log(this.selectDate)
        },
        methods: {
            dateChange (item) {
                let { isDay, ms, date } = item
                if (!isDay) return
                if (this.type==='single') {
                    // if (this.oldSelectDate ===  date) return
                    // console.log(ms)
                    this.oldSelectDate = this.selectDate
                    console.log(this.dateFormat(ms))
                    if (this.oldSelectDate !==  date) {
                        this.selectDate = date
                        this.dateMap[date].selected = true
                        this.dateMap[this.oldSelectDate].selected = false
                    }
                } else if (this.type==='range') {
                    if (this.selectArr.length===1 && this.selectArr[0]!==date) {
                        // this.dateMap[date].selected = true
                        this.selectArr.push(date)
                        let si = this.dateMap[this.selectArr[0]].index
                        let ei = this.dateMap[this.selectArr[1]].index + 1
                        if (ei<si) {
                            let n = si
                            si = ei
                            ei = n
                            this.selectArr.reverse()
                        }
                        let arr = this.dateArr.slice(si, ei)
                        console.log(arr)
                        let [sd, ed] = [arr[0].date, arr.slice(-1)[0].date]
                        console.log([sd, ed])
                        arr.map(item=>{
                            this.dateMap[item.date].selected = true
                        })
                        this.selectArr.map((date, index)=>{
                            this.dateMap[date] = {
                                ...this.dateMap[date],
                                selected: true,
                                isEnd: true,
                                isFirst: index===0,
                                isLast: index===1,
                            }
                        })
                    } else if (this.selectArr.length===2) {
                        Object.keys(this.dateMap).map(date=>{
                            this.dateMap[date] = {
                                ...this.dateMap[date],
                                selected: false,
                                isEnd: false,
                                isFirst: false,
                                isLast: false,
                            }
                        })
                        // this.selectArr.map(date=>{
                        //     this.dateMap[date].selected = false
                        // })
                        this.oldSelectArr = [...this.selectArr]
                        this.selectArr = []
                        this.dateMap[date] = {
                            ...this.dateMap[date],
                            selected: true,
                            isEnd: true,
                            isFirst: true,
                            isLast: true,
                        }
                        this.selectArr.push(date)
                    }
                }

            },
            dateFormat (ms) {
                if (this.formatter === '') {
                    return (new Date(ms).toString())
                } else {
                    return this.$utils.formatFixedDate(ms, this.formatter)
                }
            },
            getDateLi () {
                let oneDayMs = 24 * 60 * 60 * 1000
                let oneMonthMs = oneDayMs * 60
                let now = new Date().setHours(0, 0, 0, 0).valueOf()

                let prevMonthMs = now - oneMonthMs
                let nextMonthMs = now + oneMonthMs
                let dayObj = {}
                // console.log(new Date(now+oneDayMs*3).getDay())
                let index = 0
                for (let i = prevMonthMs; i < nextMonthMs; i += oneDayMs) {
                    let date = this.$utils.formatFixedDate(i, 'yyyy-MM-dd')
                    let month = this.$utils.formatFixedDate(i, 'yyyy年M月')
                    let day = this.$utils.formatFixedDate(i, 'd')
                    if (!dayObj[month]) {
                        (dayObj[month] = [])
                        let week = new Date(i).getDay()
                        console.log(date)
                        console.log(week)
                        if (week !== 0) {
                            let arr = new Array(week).fill({
                                isDay: false,
                                day: '',
                                ms: 0,
                                date: '',
                            })
                            dayObj[month] = [...arr]
                        }
                    }

                    let obj = {
                        date,
                        isDay: true,
                        day: day,
                        ms: i,
                        index: index++,
                    }
                    dayObj[month].push(obj)
                    this.$set(this.dateMap, [date], obj)
                    this.dateArr.push(obj)
                    // this.dateMap[date] = obj
                }
                console.log(this.dateMap)
                if (this.type==='single') {
                    this.dateMap[this.selectDate].selected = true
                } else if (this.type==='range') {
                    this.selectArr.map((date, index)=>{
                        this.dateMap[date] = {
                            ...this.dateMap[date],
                            selected: true,
                            isEnd: true,
                            isFirst: index===0,
                            isLast: index===1,
                        }
                    })
                }
                // console.log(dayArr)
                // console.log(dayObj)
                Object.keys(dayObj).map(key => {
                    this.dateList.push({
                        ym: key,
                        list: dayObj[key]
                    })
                })

                console.log(this.dateList)

            },
        }
    }
</script>

<style lang="scss" scoped>
    .com-calendar {
        background-color: #fff;
        position: relative;
        height: 750px;
        display: flex;
        flex-direction: column;
    }

    .com-calendar-head {
        width: 100%;
        background-color: #ffff;
        box-shadow: 0 4px 20px rgba(125, 126, 128, 0.16);
    }

    .com-calendar-outer {
        flex: 1;
        overflow-y: scroll;
    }

    .com-calendar-week {
        @extend .com-calendar-ul;
    }

    .com-calendar-wl {
        flex: 0 0 calc(100% / 7);
        height: 60px;
        line-height: 62px;
        font-size: 24px;
        text-align: center;
    }

    .com-calendar-ym {
        height: 88px;
        line-height: 90px;
        text-align: center;
    }

    .com-calendar-ul {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .com-calendar-li {
        flex: 0 0 calc(100% / 7);
        height: 120px;
        line-height: 122px;
        text-align: center;

        &:nth-child(7n+1),
        &:nth-child(7n) {
            color: #E07A7C;
        }

        &.selected {
            color: #ee0a24;
            background-color: #FDE7EA;
            &.end {
                color: #fff;
                background-color: #ee0a24;
                &.first{
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                }
                &.last{
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                }
            }
        }
    }

</style>
