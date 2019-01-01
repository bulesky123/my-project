import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table ,Button,Input, Form, Row, Col,DatePicker,Menu} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {post,get} from '../../axios/tools';
import config from '../../axios/config';

import fetchEnentReport  from '../../action/event-report';

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
        this.props.fetchEnentReport(this.inputData)   
    }

    handleRangePickerChange(moment, date) {
        this.inputData.start_time = date[0];
        this.inputData.end_time = date[1];
    }
    handleButtonClick(){
        this.props.fetchEnentReport(this.inputData)  
    }
    render(){
        const {eventReportList,totalCount=0} = this.props.FetchEventReportList;
        const columns = [
            {title: '传感器类型', dataIndex: 'sensor_type', key: 'sensor_type',fixed: 'left'},
            {title: '系统异常事件(次)', dataIndex: 'sys_abnormal_num', key: 'sys_abnormal_num'},
            {title: '红色预警(次)', dataIndex: 'red_alarm_num', key: 'red_alarm_num',},
            {title: '橙色预警(次)', dataIndex: 'orange_alarm_num', key: 'orange_alarm_num',},
            {title: '黄色预警(次)', dataIndex: 'yellow_alarm_num', key: 'yellow_alarm_num',},
        ];
        
        let data = eventReportList&&eventReportList.map((item,index)=>{
            return {
                key: index,
                sensor_type: item.sensor_type,
                sys_abnormal_num: item.sys_abnormal_num,
                red_alarm_num: item.red_alarm_num,
                orange_alarm_num:item.orange_alarm_num,
                yellow_alarm_num: item.yellow_alarm_num,
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
                <BreadcrumbCustom first="事件诊断" second="统计报告"/>
                <Form style={{marginBottom:20,marginTop:20}}>
                    <Row>
                        <Col>
                            <span style={{paddingRight:10}}>发生时间：</span>
                            <RangePicker format="YYYY-MM-DD HH:mm:ss" placeholder={['开始时间', '结束时间']} onChange={this.handleRangePickerChange.bind(this)} style={{paddingRight:10}}/>
                            <Button type="primary" icon="search" onClick={this.handleButtonClick.bind(this)}>搜索</Button>
                        </Col>
                    </Row>
                </Form>
                <div style={{"marginBottom":10}}>总共<span style={{"color":'red'}}>{totalCount}</span>条：</div>
                <Table columns={columns} dataSource={data} />
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
    fetchEnentReport: bindActionCreators(fetchEnentReport, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventUnusal));