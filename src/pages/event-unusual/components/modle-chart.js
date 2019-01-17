import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Radio,Button, Row, Col,message,Form} from 'antd';
import config from '../../../axios/config'
import {post} from '../../../axios/tools';
import echarts from 'echarts';

import chartArr from '../../../api/chartArr';
const RadioGroup = Radio.Group;

class ModleChart extends Component{
    constructor(){
        super();
        this.state={
        	value:'yes'
        }
    }
    createEchart(arr){
    	let myChart = echarts.init(document.getElementById('myChart'));
    	let option = {
    		color: ['#003366', '#006699', '#4cabce',],
    		tooltip: {
    			trigger: 'axis',
    			axisPointer: {
    				type: 'shadow'
    			}
    		},
    		legend: {
    			data: ['90%相似度', '70%相似度', '50%相似度']
    		},
    		calculable: true,
    		xAxis: [
    		{
    			type: 'category',
    			axisTick: {show: false},
    			data: arr&&arr.map(function (item) {
            return item[0];
          })
    		}
    		],
    		yAxis: [
    		{
    			type: 'value'
    		}
    		],
    		series: [
    		{
    			name: '90%相似度',
    			type: 'bar',
    			barGap: 0,
    			data: arr&&arr.map(function (item) {
            return item[2];
        })
    		},
    		{
    			name: '70%相似度',
    			type: 'bar',
    			data: arr&&arr.map(function (item) {
            return item[3];
        })
    		},
    		{
    			name: '50%相似度',
    			type: 'bar',
    			data: arr&&arr.map(function (item) {
            return item[4];
        })
    		},
    		]
    	};
    	myChart.setOption(option);
	}   
    getChartData(){
        let formValue = this.props.formValue;
        post({url:config.BASEURL+'queryAnalysisAbnormalChart',data:formValue}).then((data)=>{
          if(data&&data.status == '200'){
              this.createEchart(data.resultList);
          }else{
            message.error('请求失败');
          }
            
        })
    }
    componentDidMount(){
        //this.createEchart(chartArr);
        this.getChartData();
    }
    handleSubmit = (e) => {
    const formValue = this.props.formValue
    e.preventDefault(); 
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {  
        console.log('Received values of form: ', values);
        let submitObj = Object.assign({sensor_id:formValue.sensor_id,case_type:formValue.case_type,id:formValue.id}, values);
        post({url:config.BASEURL+'queryAbnormalToSYSMonitor',data:submitObj}).then((data)=>{
          if(data&&data.status !== '200'){
            message.error('报存失败');
            return; 
          }
            message.success('保存成功');
        })
        this.props.hideModal();
      }
    });
  }
    onCancel(){
    	this.props.hideModal()
  	}
  	onChange = (e) => {
  		console.log('radio checked', e.target.value);
  		this.setState({
  			value: e.target.value,
  		});
  	}
    render(){
    	const { getFieldDecorator } = this.props.form;
      let value = this.state.value
    	const formItemLayout = {
    		labelCol: {
    			xs: { span: 24 },
    			sm: { span: 8 },
    		},
    		wrapperCol: {
    			xs: { span: 24 },
    			sm: { span: 16 },
    		},
    	};
        return(
            <div>
            	<div id="myChart" style={{ width: 600, height: 500}}></div>
             	<Form onSubmit={this.handleSubmit}>
             	<Form.Item
             		{...formItemLayout}
             		label='是否系统监控&nbsp;'
             		>
             		{getFieldDecorator('to_sys_monitor', {
             			rules: [{ required: true, message: '请选择是否系统监控!'}],
                  initialValue:value 
             		})(
             		<RadioGroup onChange={this.onChange}>
             			<Radio value='yes'>是</Radio>
             			<Radio value='no'>否</Radio>
             		</RadioGroup>
             	)}
             	</Form.Item>
             		<Form.Item>
             			<Row>
             				<Col  push='5' span='12'>
             					<Button  type="primary" htmlType="submit">报存</Button>
             				</Col>
             				<Col push='5' span='12'>
             					<Button onClick={()=>this.onCancel()}>取消</Button>
             				</Col>
             			</Row>
             		</Form.Item>
             	</Form>
            </div>
        )
    }
}
const WrappedAddModalForm = Form.create()(ModleChart);
//要state什么属性放到props里面
const mapStateToProps = (state) => {
    
    return state;
};
//要什么方法，放到props里面,自动dispath
const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedAddModalForm);