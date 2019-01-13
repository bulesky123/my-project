import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Radio,Button, Row, Col,message,Form} from 'antd';
import {post} from '../../../axios/tools';
import echarts from 'echarts';

import chartArr from '../../../api/chartArr';
const RadioGroup = Radio.Group;

class ModleChart extends Component{
    constructor(){
        super();
        this.state={
        	value:1
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
    			data: ['传感器A', '传感器B', '传感器C',]
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
    			data: [320, 332, 301,]
    		},
    		{
    			name: '70%相似度',
    			type: 'bar',
    			data: [220, 182, 191,]
    		},
    		{
    			name: '50%相似度',
    			type: 'bar',
    			data: [150, 232, 201,]
    		},
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
    handleSubmit = (e) => {
    e.preventDefault(); 
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {  
        console.log('Received values of form: ', values);
        /*post({url:config.BASEURL+'addSensorConf',data:values}).then((data)=>{
          if(data.status !== '200'){
            message.error('添加失败');
            return; 
          }
            this.props.form.resetFields() ;
            this.props.hideModal();
            message.success('添加成功');
        })*/
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
            	<div id="myChart" style={{ width: 500, height: 500}}></div>
             	<Form onSubmit={this.handleSubmit}>
             	<Form.Item
             		{...formItemLayout}
             		label='是否系统监控&nbsp;'
             		>
             		{getFieldDecorator('sensor_name', {
             			rules: [{ required: true, message: '请选择是否系统监控!',}],
             		})(
             		<RadioGroup onChange={this.onChange} value={this.state.value}>
             			<Radio value={1}>是</Radio>
             			<Radio value={2}>否</Radio>
             		</RadioGroup>
             	)}
             	</Form.Item>
             		<Form.Item>
             			<Row>
             				<Col  push='5' span='12'>
             					<Button  type="primary" htmlType="submit">添加</Button>
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