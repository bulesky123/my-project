function getPointData(point){
    if(!point || point.length===0){return []}
    let seriesData = [];
    let categoryArr = [];
    for(let i=0;i<point.length;i++){
        if(!categoryArr.includes(point[i].sensor_type_name)){
            categoryArr.push(point[i].sensor_type_name)
        }
        seriesData.push({
            "id": point[i].sensor_id,
            "name": point[i].sensor_name,
            "symbolSize": point[i].abnormal_num,
            "attributes": {
                "modularity_class": 0
            },
            "value": point[i].abnormal_num,
            "label": {
                "normal": {
                    "show": true
                }
            },
            "category": point[i].sensor_type   
        })
    }
    return {
        seriesData,
        categoryArr
    }
}

function getLine(line){
    if(!line || line.length===0){return []}
    let lineData = [];
    for(let i=0;i<line.length;i++){
        lineData.push({
            source: line[i].sensor_name_from,
            lineStyle:{
                width:line[i].relation_label,
            },
            target: line[i].sensor_name_to
        })
    }
}


function getOption(obj){       
    let point = obj.point || [],
        line = obj.line || [],
        categories = [],
        linksPoint = getLine(line) || [],
        legendData = getPointData(point).categoryArr || [],
        seriesData = getPointData(point).seriesData || [];
    for(let i=0;i<legendData.length;i++){
        categories.push({'name':legendData[i]})
    }
    let option = {
       title: {
        text: '监控图谱',
        subtext: 'Circular layout',
        top: 'bottom',
        left: 'right'
    },
    legend: [{
            // selectedMode: 'single',
            data: legendData
        }],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
        {
            name: '鼠标滑过显示的标题',
            type: 'graph',
            layout: 'circular',
            circular: {
                rotateLabel: true
            },
            data: seriesData,
            links: linksPoint,
            categories: categories,
            focusNodeAdjacency: true,
            roam: true,
            label: {
                normal: {
                    position: 'right',
                    formatter: '{b}'
                }
            },
            lineStyle: {
                normal: {
                    color: 'source',
                    curveness: 0.3
                }
            }
        }
        ]
    };
    return option
}



export {
    getOption,
}

/*{
    point:[
        {
            'sensor_id':'sfai',
            'sensor_name':'sdfg',
            'sensor_type':'sdf',
            'abnormal_num':12
        },
        {
            'sensor_id':'sfai',
            'sensor_name':'sdfg',
            'sensor_type':'sdf',
            'abnormal_num':12
        },
    ],
    line:[
        {
            'sensor_name_from':'sdf',
            'sensor_name_to':'sdf',
            'relation_label':10,
            'relation_type':'ddd'
        },
        {
            'sensor_name_from':'sdf',
            'sensor_name_to':'sdf',
            'relation_label':10,
            'relation_type':'ddd'
        },
    ]
}*/