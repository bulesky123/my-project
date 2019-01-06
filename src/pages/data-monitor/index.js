import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Table ,Modal,Button,Input, Select, Row, Col,DatePicker,Icon,Upload ,message,Form} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import WrappedAddModalForm from './components/addModalFrom';
import { setData, getSensorList ,getOptionData } from './components/setOptions';
import echarts from 'echarts';
import {post} from '../../axios/tools'
import config from '../../axios/config'
import {DateFormat} from '../../utils'
import {
    queryAllSensorList , 
    queryKeySensorList,
    queryMonitorDataSensorListInitial,
    queryMonitorDataSensorFilter, 

}  from '../../action/data-monitor';
//http://echarts.baidu.com/examples/editor.html?c=line-marker
//http://echarts.baidu.com/examples/editor.html?c=line-aqi
//http://echarts.baidu.com/option.html#brush
import {chartData,chartArrData} from '../../api/chartArr';
const {Option} = Select;
const FormItem = Form.Item;
const {RangePicker} = DatePicker;



class DataMonitor extends Component{
    constructor(){
        super();
        this.state={
            addModalVisible:false,
            sensorList:['s001_002_08#deddadada'],
            time_scope:'1h'
        };
        this.myChart=null;
        this.sensorListArr=[];
        this.inputData = {
            start_time: null,      //开始时间
            end_time: null,         //结束时间
            
        };
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        let _this = this;
        _this.myChart = echarts.init(document.getElementById('myChart'));
        /*setInterval(()=>{
            this.getEchart();
        },5000)*/
        _this.props.queryAllSensorList({},(data)=>{
            _this.getEchart(data);
        });
        _this.myChart.on('brushSelected', renderBrushed);
        function renderBrushed(params) {
            if(params.batch[0].selected[0].dataIndex.length>0){
                console.log(params.batch[0])
                _this.setState({addModalVisible:true})
            }
            
        }

    }
    handleButton(orderId){
        alert(orderId)
    }

    handleRangePickerChange(moment, date) {
        this.inputData.start_time = date[0];
        this.inputData.end_time = date[1];
    }
    handleButtonClick(){
        this.setState({addModalVisible:true})
    }
    //关闭添加弹窗Modal
    hideAddModal(){
        this.setState({addModalVisible:false})
    }
    handleChange(value) {
            var valueArr = []
            for(var i=0;i<value.length;i++){
                valueArr.push({
                    "sensor_id":value[i].split('#')[0],
                    "sensor_name":value[i].split('#')[1],
                    data:[]
                })
            }
            this.sensorListArr=valueArr;
            this.setState({sensorList:value})
            this.props.queryMonitorDataSensorListInitial({
                "sensor_list":value,
                "time_scope":this.state.time_scope,
            },(res)=>{
                let res1 = res.length>0 ?res:chartArrData
                let arr = getSensorList(res1,this.sensorListArr)
                let series=getOptionData(arr)
                //let option = setData({series:series,xAxisData:series})
                this.myChart.setOption(series,true);
            })
        
    }
    getEchart(param){
        let valueArr = [],value = param.slice(0,2);
        for(let i=0;i<value.length;i++){
            valueArr.push({
                "sensor_id":value[i].split('#')[0],
                "sensor_name":value[i].split('#')[1],
                data:[]
            })
        }
        this.sensorListArr=valueArr;
        this.props.queryMonitorDataSensorListInitial({
            "sensor_list":value,
            "time_scope":this.state.time_scope,
        },(res)=>{
            let res1 =  res.length>0 ?res:chartArrData
            let arr = getSensorList(res1,this.sensorListArr)
            let series=getOptionData(arr)
            //let option = setData({series:series})
            this.myChart.setOption(series);
        })
    }
    selectChange(value){
        this.setState({time_scope:value})
        var startTime = new Date().getTime()-1*60*60*1000;
        this.props.queryMonitorDataSensorListInitial({
            "sensor_list":this.state.sensorList,
            "time_scope":value,
        },(res)=>{
                let res1 = res.length>0 ?res:chartArrData
                let arr = getSensorList(res1,this.sensorListArr)
                let series=getOptionData(arr)
                //let option = setData({series:series})
                this.myChart.setOption(series,true);
        })    
    }
    search(){
        const sensorList = this.state.sensorList
        const {start_time,end_time} = this.inputData
        if(!start_time || !end_time || sensorList.length===0){
            message.error('查询项不能为空(传感器or时间！)')
            return;
        }
        var valueArr = [],value = sensorList;
            for(var i=0;i<value.length;i++){
                valueArr.push({
                    "sensor_id":value[i].split('#')[0],
                    "sensor_name":value[i].split('#')[1],
                     "data":[]
                })
            }
            this.sensorListArr=valueArr;
            this.props.queryMonitorDataSensorFilter({
                "sensor_list":this.state.sensorList,
                "start_time":start_time,
                "end_time":start_time
            },(res)=>{
                let res1 = res.length>0 ?res:chartArrData
                let arr = getSensorList(res1,this.sensorListArr)
                let series=getOptionData(arr)
                //let option = setData({series:series})
                this.myChart.setOption(series,true);
            })

    }
    render(){
        const { sensorList=[] ,dataSensorListInitial=[]} =this.props.FetchSensorList
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
                            defaultValue={[]}
                            onChange={this.handleChange.bind(this)}
                            style={{ minWidth: '150px' }}
                            >
                            {
                                sensorList.map((item,index)=>{
                                    return(<Option key={item} value={item}>{item}</Option>)
                                })
                            }
                            </Select>
                        </FormItem>
                        
                    </Col>
                    <Col md={10} sm={24}>
                        <FormItem label="展示维度">
                            <Select
                            onChange={this.selectChange.bind(this)}
                            style={{ minWidth: '150px' }}
                            defaultValue='1h'
                            
                            >
                                <Option value="1h">近1小时</Option>
                                <Option value="24h">近24小时</Option>
                                <Option value="1week">近1个周</Option>
                                <Option value="1month">近1个月</Option>
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
                        <Button type="primary" onClick={this.search.bind(this)}>查询</Button>
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
//要state什么属性放到props里面
const mapStateToProps = (state) => {
    
    return state;
};
//要什么方法，放到props里面,自动dispath
const mapDispatchToProps = (dispatch) => ({
    queryAllSensorList: bindActionCreators(queryAllSensorList, dispatch),
    queryKeySensorList: bindActionCreators(queryKeySensorList, dispatch),
    queryMonitorDataSensorListInitial:bindActionCreators(queryMonitorDataSensorListInitial, dispatch),
    queryMonitorDataSensorFilter:bindActionCreators(queryMonitorDataSensorFilter, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DataMonitor));