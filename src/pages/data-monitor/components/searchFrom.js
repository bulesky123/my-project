import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import echarts from 'echarts';


class SearchFrom extends React.Component {
  constructor(){
        super();
        this.state={
        }
    }
    componentDidMount(){
        let dataZoom = this.props.dataZoom
        let option = this.getOption(dataZoom)
        this.createEchart(option)
    }
    componentWillReceiveProps(props){
      if(props.visible){
        let dataZoom = props.dataZoom
        let option = this.getOption(dataZoom)
        this.createEchart(option)
      } 
    }
    createEchart(obj){
      let myChart = echarts.init(document.getElementById('myChart1'));
      let option = {
        title: {
          text: '选中状态'
        },
        tooltip: {
          trigger: 'axis',
        },
        yAxis: {
          gridIndex: 0,
          splitLine: {
            show: false,
          },
          scale:true,
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
            }
        }
        },
        xAxis:{
          gridIndex:0,
          data:obj.xAxis
        },
        series: obj.series
      }
      console.log(option)
      myChart.setOption(option,true);
    } 
  getOption(arr){
    let xAxis=arr[0].xAxis;
    let yAxis = []
    if(arr.length===0){return {}}
      for(let i=0;i<arr.length;i++){
        yAxis.push({
          data:arr[i].yAxis,
          name: arr[i].sensor,
          type: 'line',
        })
      }
      return {
        xAxis:xAxis,
        series:yAxis
      }
  }
  onOk(value) {
    console.log('onOk: ', value);
  }
  onCancel(){
    this.props.hideModal()
  }
  handleChange(value) {
        console.log(`Selected: ${value}`);
}
  render() {
    return (
      <div id="myChart1" style={{ width: 500, height: 400}}></div>
    );
  }
}

export default SearchFrom;