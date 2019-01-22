//import {chartData,chartArrData} from '../../../api/chartArr';
let option = {
    title: {
        text: '数据监控'
    },
    tooltip: {
        trigger: 'axis',
    },
    yAxis: {
        gridIndex: 0,
        splitLine: {
            show: false,
        }
    },
    axisPointer: {
        link: {xAxisIndex: 'all'},
        label: {
            backgroundColor: '#777'
        }
    },
    toolbox: {
        left: 'center',
        feature: {
            dataZoom: {
                yAxisIndex: false
            },
            brush: {
                type: ['lineX', 'clear']
            }
        }
    },
    brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
            colorAlpha: 0.1
        },
        throttleType: 'debounce',
        throttleDelay: 300,
    },
    dataZoom: [{
        startValue: '1',
        /*start:50,
        end:60*/
    }, {
        type: 'inside'
    }],
    /*visualMap: [{
        top: 10,
        seriesIndex:1,
        right: 10,
        pieces: [{
            gt: 12.67,
            lte: 23.53,
            color: 'red'
        }, {
            gt: 14.48,
            lte: 21.72,
            color: 'orange'
        }, {
            gt: 16.29,
            lte: 19.91,
            color: 'yellow'
        }, {
            gt: 60,
            lte: 80,
            color: '#cc0033'
        }, {
            gt: 80,
            lte: 100,
            color: '#660099'
        }, {
            gt: 100,
            color: '#7e0023'
        }],
        outOfRange: {
            color: '#999'
        }
    },
    {
        top: 10,
        right: 10,
        seriesIndex:2,
        pieces: [{
            gt: 0,
            lte: 20,
            color: '#f00'
        }, {
            gt: 20,
            lte: 40,
            color: '#0f0'
        }, {
            gt: 40,
            lte: 60,
            color: '#ff9933'
        }, {
            gt: 60,
            lte: 80,
            color: '#cc0033'
        }, {
            gt: 80,
            lte: 100,
            color: '#660099'
        }, {
            gt: 100,
            color: '#7e0023'
        }],
        outOfRange: {
            color: '#999'
        }
    }],*/
    /*series: [
    {
        data:chartData.map(function (item) {
            return item[0];
        }),
        name: 'Beijing',
        type: 'scatter',
        markPoint : {
            data : [
            {
                name: '第一个',
                coord:[21,71]
            },
            {type : 'max', name: '最大值'},
            {type : 'min', name: '最小值'}
            ]
        },
    },
    {
        data:chartData.map(function (item) {
            return item[1];
        }),
        name: 'Beijing',
        type: 'scatter',
        markPoint : {
            data : [
            {
                name: '第一个',
                coord:[21,71]
            },
            {type : 'max', name: '最大值'},
            {type : 'min', name: '最小值'}
            ]
        },
    },
    {
        name: 'Beijing1',
        type: 'line',
        data: chartData.map(function (item) {
            return item[0];
        }),
        markLine: {
            silent: true,
            data: [{
                yAxis: 50
            }, {
                yAxis: 100
            }, {
                yAxis: 150
            }, {
                yAxis: 200
            }, {
                yAxis: 300
            }]
        }
    },
    {
        name: 'Beijing2',
        type: 'line',
        data: chartData.map(function (item) {
            return item[1];
        }),
        markLine: {
            silent: true,
            data: [{
                yAxis: 50
            }, {
                yAxis: 100
            }, {
                yAxis: 150
            }, {
                yAxis: 200
            }, {
                yAxis: 300
            }]
        }
    },
    {
        name: 'Beijing3',
        type: 'line',
        data: chartData.map(function (item) {
            return item[3];
        }),
        markLine: {
            silent: true,
            data: [{
                yAxis: 50
            }, {
                yAxis: 100
            }, {
                yAxis: 150
            }, {
                yAxis: 200
            }, {
                yAxis: 300
            }]
        }
    },
    ]*/
}

function getSeries(param,markPoint){
    if(!param || param==null ||  param=={} || param.data.length==0){return {}}
    let params = param.data,alarm_level=param.label,alarm=param.alarm;
    //设置x轴
    let xAxis = {
        gridIndex: 0,
        data: params[0]&&params[0].map(function (item) {
            return item[3];
        })
            
    }
    let series =[
        {            
            data:params[0]&&params[0].map(function (item) {
                return item[2];
            }) ,
            name: params[0]&&(params[0][0][0]+"#"+params[0][0][1]),
            type: 'scatter',
            tooltip:{
                show:false
            }
        }
    ];
    let lendArr = [params[0][0][0]+"#"+params[0][0][1]]
    let markPointData = getAlarmLevel(alarm_level)
    let visualMap = [];
    for(let i=0;i<params.length;i++){
        lendArr.push(params[i][0][0]+"#"+params[i][0][1]);
        visualMap.push({
            show:false,
            top: 10+(20*i),
            seriesIndex:i+1,
            right: 10+(80*i),
            pieces:alarm[params[i][0][0]],
            outOfRange: {
                color: '#999'
            }
        });
        series.push({
            data:params[i].map(function (item) {
            return item[2];
        }) ,
            name: params[i][0][0]+"#"+params[i][0][1],
            type: 'line',
            markPoint : markPointData[i],
        })

    }
    
    let legend = {
        data: lendArr,
        top: 40
    };
        return Object.assign(
        {
            legend:legend,
            xAxis:xAxis,
            visualMap:visualMap,
            series:series
        },option)
}


function getAlarmLevel(arr){
    if(!arr || arr.length==0){return []};
    let levelArr = [];
    for(let i=0;i<arr.length;i++){
        levelArr.push({
            name:arr[i].sensor_id,
            data:getCoord(arr[i].data)
        })
        
    }

    return levelArr
}

function getCoord(arr){
    if(arr.length==0){return []};
    let levelArr = [];
    for(let j=0;j<arr.length;j++){
        levelArr.push({
            coord:arr[j].coord,
            itemStyle:{
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                                offset: 0, color: 'red' // 0% 处的颜色
                            },  
                            {
                                offset: 1, color: arr[j].level || 'yellow' // 100% 处的颜色
                            }],
                        globalCoord: false // 缺省为 false
                    }
                }
            })
    }
    return levelArr
}


export {
    getSeries,
    getAlarmLevel
}


/*
let arr = [
['sensor_id01','sensor_name1',12,'1'],
['sensor_id01','sensor_name1',13,'2'],
['sensor_id01','sensor_name1',14,'3'],
['sensor_id01','sensor_name1',15,'4'],
['sensor_id01','sensor_name1',16,'5'],
['sensor_id01','sensor_name1',1,'6'],

['sensor_id02','sensor_name2',2,'1'],
['sensor_id02','sensor_name2',22,'2'],
['sensor_id02','sensor_name2',14,'3'],
['sensor_id02','sensor_name2',11,'4'],
['sensor_id02','sensor_name2',19,'5'],
['sensor_id02','sensor_name2',13,'6'],
]

let sensor1 =[{sensor_id:'sensor_id01',sensor_name:'sensor_name1',data:[]},{sensor_id:'sensor_id02',sensor_name:'sensor_name2',data:[]}]*/

