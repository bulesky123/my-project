import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table ,Button,Input, Form, Row, Col,DatePicker,Menu} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {post,get} from '../../axios/tools';
import config from '../../axios/config';

import fetchUnusual  from '../../action/unusual';

import './css/index.less'
const {RangePicker} = DatePicker;
const FormItem = Form.Item;


class EventUnusal extends Component{
    constructor(){
        super();
        this.inputData = {
            start_time: null,      //开始时间
            end_time: null,         //结束时间
        };
    }
    componentDidMount(){
        this.props.fetchUnusual(this.inputData)   
    }
    handleButton(orderId){
        this.props.history.push(`/app/event/echart/${orderId}`);
    }

    handleRangePickerChange(moment, date) {
        this.inputData.start_time = date[0];
        this.inputData.end_time = date[1];
    }
    handleButtonClick(){
        this.props.fetchUnusual(this.inputData)  
    }
    render(){
       const {UnusalData=[{
                key: 1,
                id: 1,
                event_name: '2wss',
                sensor_id: '23wed',
                sensor_name:'2345',
                dev_name: 'item.dev_name',
                function_id: '2345rf',
                trend_flg: 'up',
                mean_value: 1,
                mse_value: 2,
                start_time:'2019-1-1',
                end_time: '2019-1-1',
                create_time:'2019-1-1',
                realEndTime:'2019-1-1',
                operator:'zf'}],totalCount=0,a=20,b=30} = this.props.FetchUnusualList;
        const columns = [
            {title: '异常事件id', dataIndex: 'id', key: 'id',fixed: 'left', width: 80 },
            {title: '异常事件名称', dataIndex: 'event_name', key: 'event_name', width: 70},
            {title: '传感器id', dataIndex: 'sensor_id', key: 'sensor_id', width: 100},
            {title: '传感器名称', dataIndex: 'sensor_name', key: 'sensor_name', width: 70},
            {title: '设备名称', dataIndex: 'dev_name', key: 'dev_name', width: 100},
            {title: '功能名称', dataIndex: 'function_id', key: 'function_id', width: 100},
            {title: '趋势', dataIndex: 'trend_flg', key: 'trend_flg', width: 100},
            {title: '均值', dataIndex: 'mean_value', key: 'mean_value', width: 100},
            {title: '方差', dataIndex: 'mse_value', key: 'mse_value', width: 70},
            {title: '开始时间', dataIndex: 'start_time', key: 'start_time', width:160},
            {title: '持续时间', dataIndex: 'realEndTime', key: 'realEndTime' ,width: 160},
            {title: '结束时间', dataIndex: 'end_time', key: 'end_time', width: 160},
            {title: '创建时间', dataIndex: 'create_time', key: 'create_time' ,width: 160},
            {title: '操作人', dataIndex: 'operator', key: 'operator', width: 70},
            {title: '操作', dataIndex: 'operation', key: 'operation', fixed: 'right',align:'center'},
        ];
        
        let data = UnusalData&&UnusalData.map((item,index)=>{
            return {
                key: index,
                id: item.id,
                event_name: item.event_name,
                sensor_id: item.sensor_id,
                sensor_name:item.sensor_name,
                dev_name: item.dev_name,
                function_id: item.function_id,
                trend_flg: item.trend_flg,
                mean_value: item.mean_value,
                mse_value: item.mse_value,
                start_time:item.start_time,
                end_time: item.end_time,
                create_time:item.create_time,
                realEndTime:item.realEndTime,
                operator:item.operator,
                operation:<Button onClick={this.handleButton.bind(this,item.sensor_id)}>异常分析</Button>
            }
        });
        //翻页器配置
        /*let pagination = {
            // size:"small",
            pageSize: pageSize,
            defaultCurrent: 1,
            total: total,
            onChange: (page) => {
                alert(page)
            }
        };*/
        return(
            <div className="EventUnusal">
                <BreadcrumbCustom first="事件诊断" second="异常事件"/>
                <div className='btnGroup'>
                    <Button type="primary" style={{marginRight:20}}>圈选异常事件({a})</Button>
                    <Button type="primary">系统异常事件({b})</Button>
                </div>
                <Form style={{marginBottom:20}}>
                    <Row>
                        <Col>
                            <span style={{paddingRight:10}}>发生时间：</span>
                            <RangePicker format="YYYY-MM-DD HH:mm:ss" placeholder={['开始时间', '结束时间']} onChange={this.handleRangePickerChange.bind(this)} style={{paddingRight:10}}/>
                            <Button type="primary" icon="search" onClick={this.handleButtonClick.bind(this)}>搜索</Button>
                        </Col>
                    </Row>
                </Form>
                <div style={{"marginBottom":10}}>总共<span style={{"color":'red'}}>{totalCount}</span>条：</div>
                <Table columns={columns} dataSource={data} scroll={{ x: 1600, y:300}} />
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
    fetchUnusual: bindActionCreators(fetchUnusual, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventUnusal));