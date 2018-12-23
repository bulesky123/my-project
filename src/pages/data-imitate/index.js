import React,{Component} from 'react';
import { Table ,Button,Input, Form, Row, Col,DatePicker,Menu,Icon} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const {RangePicker} = DatePicker;
const FormItem = Form.Item;

class DataImitate extends Component{
    constructor(){
        super();
        this.inputData = {
            startTimeVal: null,      //开始时间
            endTimeVal: null,         //结束时间
        };
    }
    componentDidMount(){

    }
    handleRangePickerChange(moment, date) {
        this.inputData.startTimeVal = date[0];
        this.inputData.endTimeVal = date[1];
    }
    handleButtonClick(){
         
    }
    render(){
        return(
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="数据管理" second="数据模拟"/>
                <Form style={{marginBottom:20,marginTop:20}}>
                    <Row>
                        <Col>
                            <span style={{paddingRight:10}}>开始时间：</span>
                            <RangePicker format="YYYY-MM-DD" placeholder={['开始时间', '结束时间']} onChange={this.handleRangePickerChange.bind(this)} style={{paddingRight:10}}/>
                            <Button type="primary"  onClick={this.handleButtonClick.bind(this)}><Icon type="play-circle" />运行</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
export default DataImitate;