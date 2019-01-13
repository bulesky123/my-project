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
    	let categories = [{name:'类目1'},{name:'类目2'},{name:'类目3'},{name:'类目4'},{name:'类目5'}];
      let option = {
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
                layout: 'circular',
                circular: {
                    rotateLabel: true
                },
                data: arr,
                links: 'baidu.com',
                categories: categories,
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
    			sm: { span: 6 },
    		},
    		wrapperCol: {
    			xs: { span: 24 },
    			sm: { span: 18 },
    		},
    	};
        return(
            <div>
             	<Form onSubmit={this.handleSubmit}>
             	<Form.Item
             		{...formItemLayout}
             		label='异常相似度&nbsp;'
             		>
             		{getFieldDecorator('sensor_name', {
             			
             		})(
             		<RadioGroup onChange={this.onChange} value={this.state.value}>
             			<Radio value={1}>全部</Radio>
             			<Radio value={2}>90%相似</Radio>
                  <Radio value={3}>70%相似</Radio>
                  <Radio value={4}>50%相似</Radio>
             		</RadioGroup>
             	)}
             	</Form.Item>
             	</Form>
              <div id="myChart" style={{ width: '100%', height: 500}}></div>
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