import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Table ,Modal,Button,Input, Select, Row, Col,DatePicker,Icon,Upload ,message,Form} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import WrappedAddModalForm from './components/addModalFrom';
import {  getSeries } from './components/setOptions';
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
            selectData:null,
            sensorList:[],
            time_scope:'1min'
        };
        this.myChart=null;
        this.interval=null;
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
        this.interval = setInterval(()=>{
            this.getEchart({"sensor_list":this.state.sensorList,"time_scope":this.state.time_scope});
        },3000)
        _this.props.queryAllSensorList({},(data)=>{
            _this.setState({
                sensorList:[data[0]] //给state一个默认值
            })
            _this.getEchart({"sensor_list":[data[0]]});
        });
        _this.myChart.on('brushSelected', renderBrushed);

        function renderBrushed(params){
            const dataSensorListInitial = _this.props.FetchSensorList.dataSensorListInitial[0] || []
            const sensorIdArr = dataSensorListInitial.map((item)=>{return item[0]})
            const sensorValueArr = dataSensorListInitial.map((item)=>{return item[2]})
            const sensorTimeArr = dataSensorListInitial.map((item)=>{return item[3]})
            let select = params.batch[0].selected
            let sensor_id = []
            let start_time,end_time
            if(select.length>0){
                let dataIndex = select[0].dataIndex
                start_time = sensorTimeArr[dataIndex[0]]
                end_time = sensorTimeArr[dataIndex[dataIndex.length-1]]
                for(let i=0;i<select.length;i++){
                    if(!sensor_id.includes(select[i].seriesName,0)){
                        sensor_id.push(select[i].seriesName)
                    }   
                }
            }
            if(!_this.state.addModalVisible&&start_time&&end_time&&sensor_id.length>0){
                _this.myChart.dispatchAction({
                    type: 'brush',//选择action行为
                    areas:[]//areas表示选框的集合，此时为空即可。
                });
                _this.setState({
                    selectData:{
                        start_time:start_time,
                        end_time:end_time,
                        sensor_id:sensor_id
                    }
                })
                setTimeout(()=>{
                    _this.setState({addModalVisible:true})
                },0)
            }
        }
        _this.myChart.on('click', function (params) {
            // 点击事件
            alert(params)
        });
        _this.myChart.on('mouseover', function (params) {
            // 鼠标滑入
            clearInterval(_this.interval)
        });
        _this.myChart.on('mouseout', function (params) {
            // 鼠标移开
            let search = sessionStorage.getItem('search');
            if(!search){
                let sensorList = _this.state.sensorList;
                let time_scope = _this.state.time_scope
                _this.interval = setInterval(()=>{
                    _this.getEchart({"sensor_list":sensorList,"time_scope":time_scope});
                },3000)
            }
            
        });
        _this.myChart.on('legendselectchanged', function(obj) {
            //图例点击事件
           /* let sensorList = _this.state.sensorList;
            let selected = obj.selected
            Object.keys(selected).forEach(function(key){
                if(selected[key]===false){
                    let index = sensorList.indexOf(key); 
                    if (index > -1) { 
                        sensorList.splice(index, 1); 
                    } 
                }else{
                    sensorList.push(key)
                }
               //console.log(key,selected[key]);
           });
            console.log(sensorList)*/

        })
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    handleRangePickerChange(moment, date) {
        if(moment[1].valueOf()-moment[0].valueOf()>7*24*60*60*1000){
            message.warn('时间不允许超过7天！');
            return;
        }
        this.inputData.start_time = date[0];
        this.inputData.end_time = date[1];
    }
    handleButtonClick(){
        this.setState({addModalVisible:true,selectData:null})
    }
    //关闭添加弹窗Modal
    hideAddModal(){
        this.setState({addModalVisible:false,selectData:null})
    }
    getEchart(param){
        //this.myChart.showLoading();
        this.props.queryMonitorDataSensorListInitial({
            "sensor_list":param.sensor_list,
            "time_scope":param.time_scope || this.state.time_scope,
        },(res)=>{
            //this.myChart.hideLoading();
            if(res==null || res=={} || res.length==0){return}
            let series=getSeries(res);
            this.myChart.setOption(series,true);
        })
    }
    selectChange(value){
        this.setState({time_scope:value})
        if(this.interval){
            clearInterval(this.interval)
        }
        this.myChart.showLoading();
        this.props.queryMonitorDataSensorListInitial({
            "sensor_list":this.state.sensorList,
            "time_scope":value,
        },(res)=>{
            this.myChart.hideLoading();
            if(res==null || res=={} || res.length==0){return}
            let series=getSeries(res)  
            this.myChart.setOption(series,true);
            let sensorList = this.state.sensorList;
            let time_scope = this.state.time_scope
            this.interval = setInterval(()=>{
                this.getEchart({"sensor_list":sensorList,"time_scope":time_scope});
            },3000)
        })      
    }
    handleChange(value) {
        this.setState({sensorList:value})
        if(this.interval){
            clearInterval(this.interval)
        }
        this.myChart.showLoading();
        this.props.queryMonitorDataSensorListInitial({
            "sensor_list":value,
            "time_scope":this.state.time_scope,
        },(res)=>{
            this.myChart.hideLoading();
            if(res==null || res=={} || res.length==0){return}
            let series=getSeries(res)
            this.myChart.setOption(series,true);
            let sensorList = this.state.sensorList;
            let time_scope = this.state.time_scope
            this.interval = setInterval(()=>{
                this.getEchart({"sensor_list":sensorList,"time_scope":time_scope});
            },3000)
        })
        
    }
    search(){
        const sensorList = this.state.sensorList
        const {start_time,end_time} = this.inputData
        if(!start_time || !end_time || sensorList.length===0){
            message.error('查询项不能为空(传感器or时间！)')
            return;
        }
        this.myChart.showLoading()
        clearInterval(this.interval)
        this.props.queryMonitorDataSensorFilter({
            "sensor_list":this.state.sensorList,
            "start_time":start_time,
            "end_time":end_time
        },(res)=>{
            this.myChart.hideLoading()
            if(res==null || res=={} || res.length==0){return}
            sessionStorage.setItem('search','search')
            let series=getSeries(res)
            this.myChart.setOption(series,true); 
        })

    }
    render(){
        const {selectData} = this.state
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
                            defaultValue={sensorList[0]?[sensorList[0]]:[]}
                            onChange={this.handleChange.bind(this)}
                            style={{ minWidth: '150px' }}
                            >
                            {
                                sensorList&&sensorList.map((item,index)=>{
                                    return(<Option key={ index+item } value={ item }>{ item }</Option>)
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
                            defaultValue='1min'
                            
                            >
                                <Option key='11' value="1min">近1分钟</Option>
                                <Option key='22' value="5min">近5分钟</Option>
                                <Option key='33' value="10min">近10分钟</Option>
                                <Option key='44' value="1h">近1小时</Option>
                                <Option key='55' value="24h">近24小时</Option>
                                <Option key='66' value="1week">近1个周</Option>
                                <Option key='77' value="1month">近1个月</Option>
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
                <div id="myChart" style={{ marginTop:20,width: '90%', height: 450,marginRight:80}}></div>
                <div style={{ position: 'absolute',top: '244px', right: '50px'}}>
                    <div><span style={{ display: 'inline-block',width: '20px',height: '10px',background: 'red',marginRight: '10px'}}></span>红色预警</div>
                    <div><span style={{ display: 'inline-block',width: '20px',height: '10px',background: 'orange',marginRight: '10px'}}></span>橙色预警</div>
                    <div><span style={{ display: 'inline-block',width: '20px',height: '10px',background: 'yellow',marginRight: '10px'}}></span>黄色预警</div>
                </div>
                <Modal
                title="添加异常事件"
                visible={this.state.addModalVisible}
                onCancel={this.hideAddModal.bind(this)}
                footer={null}
                >
                    <WrappedAddModalForm selectData={selectData} hideModal={this.hideAddModal.bind(this)} />
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