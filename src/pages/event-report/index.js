import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table ,Button,Input, Form, Row, Col,DatePicker,Menu} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {post,get} from '../../axios/tools';
import config from '../../axios/config';

import fetchEventUnusual  from '../../action/event-unusual';

import './css/index.less'
const {RangePicker} = DatePicker;
const FormItem = Form.Item;


class EventUnusal extends Component{
    constructor(){
        super();
        this.inputData = {
            startTimeVal: null,      //开始时间
            endTimeVal: null,         //结束时间
        };
    }
    componentDidMount(){
        this.props.fetchEventUnusual()   
    }

    handleRangePickerChange(moment, date) {
        this.inputData.startTimeVal = date[0];
        this.inputData.endTimeVal = date[1];
    }
    handleButtonClick(){
        this.props.fetchEventUnusual({})  
    }
    render(){
        const {eventList,a=30,b=20,pageSize=20,total=50} = this.props.FetchList
        const columns = [
            {title: '异常事件id', dataIndex: 'mainOrderId', key: 'mainOrderId',fixed: 'left', width: 160 },
            {title: '异常事件名称', dataIndex: 'nameRegister', key: 'nameRegister', width: 70},
            {title: '传感器id', dataIndex: 'matchStatus', key: 'matchStatus', width: 100},
            {title: '传感器名称', dataIndex: 'name', key: 'name', width: 70},
            {title: '设备名称', dataIndex: 'loanAmount', key: 'loanAmount', width: 100},
            {title: '功能名称', dataIndex: 'bidRate', key: 'bidRate', width: 100},
            {title: '趋势', dataIndex: 'cycle', key: 'cycle', width: 100},
            {title: '均值', dataIndex: 'cycleType', key: 'cycleType', width: 100},
            {title: '方差', dataIndex: 'migrated', key: 'migrated', width: 70},
            {title: '开始时间', dataIndex: 'matchTime', key: 'matchTime', width:150},
            {title: '持续时间', dataIndex: 'realEndTime', key: 'realEndTime' ,width: 150},
            {title: '结束时间', dataIndex: 'contractEndTime', key: 'contractEndTime', width: 120},
            {title: '创建时间', dataIndex: 'createTime', key: 'createTime' ,width: 150},
            {title: '操作人', dataIndex: 'register', key: 'register', width: 70}
        ];
        
        let data = eventList&&eventList.map((item,index)=>{
            return {
                key: index,
                mainOrderId: item.mainOrderId,
                nameRegister: item.nameRegister,
                matchStatus: item.matchStatus,
                name:item.name,
                loanAmount: item.loanAmount,
                bidRate: item.bidRate,
                cycle: item.cycle,
                cycleType: item.cycleType,
                migrated: item.migrated,
                matchTime:item.matchTime,
                transferTime: item.strTransferTime,
                contractEndTime:item.contractEndTime,
                realEndTime:item.realEndTime,
                createTime: item.createTime,
                register:item.register
            }
        });
        //翻页器配置
        let pagination = {
            // size:"small",
            pageSize: pageSize,
            defaultCurrent: 1,
            total: total,
            onChange: (page) => {
                alert(page)
            }
        };
        return(
            <div className="EventUnusal">
                <BreadcrumbCustom first="事件诊断" second="统计报告"/>
                <Form style={{marginBottom:20,marginTop:20}}>
                    <Row>
                        <Col>
                            <span style={{paddingRight:10}}>发生时间：</span>
                            <RangePicker format="YYYY-MM-DD" placeholder={['开始时间', '结束时间']} onChange={this.handleRangePickerChange.bind(this)} style={{paddingRight:10}}/>
                            <Button type="primary" icon="search" onClick={this.handleButtonClick.bind(this)}>搜索</Button>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns} dataSource={data} scroll={{ x: 1600, y:350}}  pagination={pagination}/>
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
    fetchEventUnusual: bindActionCreators(fetchEventUnusual, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventUnusal));