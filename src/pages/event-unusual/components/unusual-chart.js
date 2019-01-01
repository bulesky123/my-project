import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {post,get} from '../../../axios/tools';
import echarts from 'echarts';
import BreadcrumbCustom from '../../BreadcrumbCustom';

import chartArr from '../../../api/chartArr';
//api参考：http://echarts.baidu.com/option.html#series-graph.data.category

class UnusualChart extends Component{
    constructor(){
        super();
    }
    createEchart(arr){
        let myChart = echarts.init(document.getElementById('myChart'));
        let categories = [{name:'类目1'},{name:'类目2'},{name:'类目3'},{name:'类目4'},{name:'类目5'}];
        let option = {
        title: {
            text: '异常监控',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
        },
        tooltip: {},
        legend: [{
            // selectedMode: 'single',
            data: categories.map(function (a) {
                return a.name;
            })
        }],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
            {
                name: '鼠标滑过显示的标题',
                type: 'graph',
                layout: 'none',
                data: arr,
                links: 'baidu.com',
                categories: categories,
                roam: true,
                focusNodeAdjacency: true,
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 1,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                    }
                },
                label: {
                    position: 'right',
                    formatter: '{b}'
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                },
                emphasis: {
                    lineStyle: {
                        width: 10
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}   
    getChartData(){
        let orderid = this.props.match.params.orderid;
        post({url:'',data:{orderid:orderid}}).then((data)=>{
            this.createEchart(data);
        })
    }
    componentDidMount(){
        this.createEchart(chartArr);
        //this.getChartData();
    }
    render(){
        return(
            <div>
                 <BreadcrumbCustom first={{link:'/app/event/unusual',name:"异常事件"}} second="查看图表"/>
                <div id="myChart" style={{ width: 500, height: 500}}></div>
            </div>
        )
    }
}

//要state什么属性放到props里面
const mapStateToProps = (state) => {
    
    return state;
};
//要什么方法，放到props里面,自动dispath
const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(UnusualChart);