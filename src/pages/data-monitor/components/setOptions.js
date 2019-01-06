import {chartData,chartArrData} from '../../../api/chartArr';
let option = {
    title: {
        text: '数据监控'
    },
    tooltip: {
        trigger: 'axis',

    },
/*    xAxis: {
        gridIndex: 0,
        data: chartData.map(function (item) {
            return item[0];
        })
    },*/
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
                type: ['lineX', 'clear',]
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
        startValue: '1'
    }, {
        type: 'inside'
    }],
    visualMap: {
        top: 10,
        right: 10,
        pieces: [{
            gt: 0,
            lte: 10,
            color: '#096'
        }, {
            gt: 10,
            lte: 12,
            color: '#ffde33'
        }, {
            gt: 12,
            lte: 14,
            color: '#ff9933'
        }, {
            gt: 14,
            lte: 16,
            color: '#cc0033'
        }, {
            gt: 16,
            lte: 18,
            color: '#660099'
        }, {
            gt: 20,
            color: '#7e0023'
        }],
        outOfRange: {
            color: '#999'
        }
    },
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


function setData(params){
    return Object.assign(
        {
            xAxis:{
                gridIndex: 0,
                data: params.series[0].data.map(function (item) {
            return item[1];
        })
            },
            series:params.series
        },option)
}

function getSensorList(sensorListArr,sensor){
    var realSensorListArr=[];
    console.log(sensorListArr)
    for(var m=0;m<sensorListArr.length;m++){
        realSensorListArr=realSensorListArr.concat(sensorListArr[m])
    }
    for(var i=0;i<realSensorListArr.length;i++){
        for(var j=0;j<sensor.length;j++){
            if(realSensorListArr[i][0] == sensor[j].sensor_id){
                sensor[j].data.push([realSensorListArr[i][3],realSensorListArr[i][2]])
            }
        }
    }
    return sensor;
}


function getOptionData(arr,markPoint){
    var series=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i].data.length==0){continue;}
        series.push(
        {
            data:arr[i].data.map(function (item) {
            return item[1];
        }) ,
            name: arr[i].sensor_name,
            type: 'scatter',
            markPoint : {
                data : markPoint || []
            },
        },
        {
            data:arr[i].data.map(function (item) {
            return item[1];
        }) ,
            name: arr[i].sensor_name,
            type: 'line',
        }
        )
    }
    return Object.assign(
        {
            xAxis:{
                gridIndex: 0,
                data: arr[0]&&arr[0].data.map(function (item) {
            return item[0];
        })
            },
            series:series
        },option)
}

export {
    setData,
    getSensorList,
    getOptionData
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

