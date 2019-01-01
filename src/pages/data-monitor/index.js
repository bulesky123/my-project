import React,{Component} from 'react';
import { Table ,Modal,Button,Input, Select, Row, Col,DatePicker,Icon,Upload ,message,Form} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import WrappedAddModalForm from './components/addModalFrom';
import echarts from 'echarts';
import {post} from '../../axios/tools'
import config from '../../axios/config'
//http://echarts.baidu.com/examples/editor.html?c=line-marker
//http://echarts.baidu.com/examples/editor.html?c=line-aqi
import {chartData} from '../../api/chartArr';
const {Option} = Select;
const FormItem = Form.Item;
const {RangePicker} = DatePicker;



class Menu extends Component{
    constructor(){
        super();
        this.state={
            addModalVisible:false,
        };
        this.inputData = {
            startTimeVal: null,      //开始时间
            endTimeVal: null,         //结束时间
            
        };
    }
    componentDidMount(){
        let myChart = echarts.init(document.getElementById('myChart'));
        let option = {
        title: {
            text: 'Beijing AQI'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: chartData.map(function (item) {
                return item[0];
            })
        },
        yAxis: {
            splitLine: {
                show: false
            }
        },
        toolbox: {
            left: 'center',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [{
            startValue: '2014-06-01'
        }, {
            type: 'inside'
        }],
        visualMap: {
            top: 10,
            right: 10,
            pieces: [{
                gt: 0,
                lte: 50,
                color: '#096'
            }, {
                gt: 50,
                lte: 100,
                color: '#ffde33'
            }, {
                gt: 100,
                lte: 150,
                color: '#ff9933'
            }, {
                gt: 150,
                lte: 200,
                color: '#cc0033'
            }, {
                gt: 200,
                lte: 300,
                color: '#660099'
            }, {
                gt: 300,
                color: '#7e0023'
            }],
            outOfRange: {
                color: '#999'
            }
        },
        series: {
            name: 'Beijing AQI',
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
        }
    }
        myChart.setOption(option);
    }
    handleButton(orderId){
        alert(orderId)
    }
    handleSelectChange(option, value) {
        if (value == -1) {
            this.inputData[option] = null;
        } else {
            this.inputData[option] = value;
        }
    }

    handleRangePickerChange(moment, date) {
        this.inputData.startTimeVal = date[0];
        this.inputData.endTimeVal = date[1];
    }
    handleButtonClick(){
        this.setState({addModalVisible:true})
    }
    //关闭添加弹窗Modal
    hideAddModal(){
        this.setState({addModalVisible:false})
    }
    handleChange(value) {
        console.log(`Selected: ${value}`);
    }
    render(){
        return(
            <div>
                <BreadcrumbCustom first="数据监控" />
                <Form style={{marginBottom:20,marginTop:20}} layout="inline">
                    <Row > 
                    <Col md={10} sm={24}>
                        <FormItem key="name" label="展示传感器">
                            <Select
                            mode="multiple"
                            size='default'
                            placeholder="选择传感器"
                            defaultValue={['1', '2']}
                            onChange={this.handleChange}
                            style={{ minWidth: '150px' }}
                            >
                                <Option value="1">c000001_A传感器</Option>
                                <Option value="2">c000002_B传感器</Option>
                                <Option value="3">c000003_C传感器</Option>
                                <Option value="4">c000004_C传感器</Option>
                                <Option value="5">c000005_C传感器</Option>
                                <Option value="6">c000006_C传感器</Option>
                            </Select>
                        </FormItem>
                        
                    </Col>
                    <Col md={10} sm={24}>
                        <FormItem label="展示维度">
                            <Select
                            style={{ minWidth: '150px' }}
                            defaultValue='近1小时'
                            
                            >
                                <Option value="近1小时">近1小时</Option>
                                <Option value="近24小时">近24小时</Option>
                                <Option value="近1个周">近1个周</Option>
                                <Option value="近1个月">近1个月</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col md={4} sm={24}>
                        <Button type="primary" onClick={this.handleButtonClick.bind(this)}>添加异常事件</Button>
                    </Col>
                </Row>  
                <Row style={{marginTop:20}}>
                    <Col md={20} sm={24} >
                        <FormItem label='历史查询：'>
                            <RangePicker format="YYYY-MM-DD HH:mm:ss" placeholder={['开始时间', '结束时间']} onChange={this.handleRangePickerChange.bind(this)}/> 
                        </FormItem>
                    </Col> 
                    <Col md={4} sm={24}>
                        <Button type="primary">查询</Button>
                    </Col>
                </Row>   
                </Form>
                <div id="myChart" style={{ marginTop:20,width: 1000, height: 450}}></div>

                <Modal
                title="添加异常事件"
                visible={this.state.addModalVisible}
                onOk={this.hideAddModal.bind(this)}
                onCancel={this.hideAddModal.bind(this)}
                okText="添加"
                cancelText="取消"
                footer={null}
                >
                    <WrappedAddModalForm hideModal={this.hideAddModal.bind(this)} />
                </Modal>
            </div>
        )
    }
}
export default Menu;