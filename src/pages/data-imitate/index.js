import React,{Component} from 'react';
import { Table ,Button,Input, Form, Row, Col,DatePicker,Menu,Icon,message} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {post} from '../../axios/tools';
import config from '../../axios/config';
const {RangePicker} = DatePicker;
const FormItem = Form.Item;

class DataImitate extends Component{
    constructor(){
        super();
        this.inputData = {
            start_time: null,      //开始时间
            end_time: null,         //结束时间
        };
    }
    componentDidMount(){

    }
    handleRangePickerChange(moment, date) {
        this.inputData.start_time = date[0];
        this.inputData.end_time = date[1];
    }
    handleButtonClick(){
        const param = this.inputData
          post({url:config.BASEURL+'simulationDataRun',data:param}).then((data)=>{
                if(data.status !== '200'){
                    message.error('运行失败');
                    return; 
                }
                message.success('运行成功');
            })
    }
    render(){
        return(
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="数据管理" second="数据模拟"/>
                <Form style={{marginBottom:20,marginTop:20}}>
                    <Row>
                        <Col>
                            <span style={{paddingRight:10}}>开始时间：</span>
                            <RangePicker format="YYYY-MM-DD HH:mm:ss" placeholder={['开始时间', '结束时间']} onChange={this.handleRangePickerChange.bind(this)} style={{paddingRight:10}}/>
                            <Button type="primary"  onClick={this.handleButtonClick.bind(this)}><Icon type="play-circle" />运行</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
export default DataImitate;