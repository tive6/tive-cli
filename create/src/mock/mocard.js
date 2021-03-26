import Mock from 'mockjs'

export default {
    getMemberCountList() {
        Mock.mock(/\/nbi\/member\/url-1/, {
            code: 0,
            msg: 'ok',
            records: {
                "dayIncreaseNum": '@integer(-1000, 1000)',
                // "dayIncreaseRate": '@float(0, 20)',
                "dayIncreaseRate": ()=>{
                    return +(Math.random()*20/100).toFixed(1)
                },
                "weekIncreaseNum": '@integer(-1000, 1000)',
                // "dayIncreaseRate": '@float(0, 20)',
                "weekIncreaseRate": ()=>{
                    return +(Math.random()*20/100).toFixed(1)
                },
                "graphDtl|7": [
                    {
                        dx: '@integer(1576119000000, 1576119052762)',
                        dy: '@integer(3000, 7000)',
                        // 'dt': '@now("yyyy-MM-dd")',
                    },
                ],
                "indictor": '@string("number", 4)',
                "indictorValue": '@integer(3000, 10000)',
            },
        })
    },
    getMemberRankingList() {
        Mock.mock(/\/nbi\/member\/url-2/, {
            code: 0,
            msg: 'ok',
            records: {
                "dimension": "PEOPLE",
                "topN|10": [
                    {
                        "gain": "@cword(3, 5)",
                        "indictor": '@string("number", 4)',
                        // "indictor": "@cname(3)",
                        "value": '@integer(500, 7000)',
                    },
                ]
            },
        })
    },
    getMemberDeal() {
        Mock.mock(/\/nbi\/member\/url-3/, {
            code: 0,
            msg: 'ok',
            records: {
                "gain": '@integer(500, 7000)',
                "member": '@integer(2000, 10000)',
                "service": '@integer(5000, 20000)',
            }
        })
    },
    getMemberRealList() {
        Mock.mock(/\/nbi\/member\/url-4/, {
            code: 0,
            msg: 'ok',
            records: {
                "dimension": "dim",
                "graphDtl|24": [
                    {
                        "dx|+1": 1,
                        "dy|2": [
                            '@integer(3000, 7000)',
                        ]
                    },
                ],
                "indictor": '@string("number", 4)',
            }
        })
    },
}