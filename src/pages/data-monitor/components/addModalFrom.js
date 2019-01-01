import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {post} from '../../../axios/tools'
import config from '../../../axios/config'
//import fetchDataMonitor  from '../../../action/data-monitor';
import {
  Form, Input, message,Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button,DatePicker,
} from 'antd';

const { Option } = Select;


class AddModalForm extends React.Component {
  constructor(){
        super();
        this.state={
            visible:false
        }
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        //this.props.form.resetFields() 
    }

  handleSubmit = (e) => {
    e.preventDefault(); 
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {  
        console.log('Received values of form: ', values);
        let submitObj = Object.assign({"start_time":values['start_time_obj'].format('YYYY-MM-DD HH:mm:ss'),"end_time":values['end_time_obj'].format('YYYY-MM-DD HH:mm:ss')}, values);
       /* post({url:config.BASEURL+'addAbnormalConf',data:submitObj}).then((data)=>{
          if(data.status !== '200'){
            message.error('添加失败');
            return; 
          }
            this.props.form.resetFields() ;
            this.props.hideModal();
            this.props.fetchImitateUnusual({"event_name":'s001_002_08'});
            message.success('添加成功');
        })*/
        
      }
    });
  }
  onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  onOk(value) {
    console.log('onOk: ', value);
  }
  onCancel(){
    this.props.form.resetFields() 
    this.props.hideModal()
  }
  handleChange(value) {
        console.log(`Selected: ${value}`);
}
  render() {
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
    return (
      <div>
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label="传感器id"
        >
        {getFieldDecorator('sensor_id', {
            rules: [{ required: true, message: '请选择传感器id!', }],
            // initialValue:'1'
        })
        (
            <Select
            mode="multiple"
            size='default'
            placeholder="传感器id"
            onChange={this.handleChange}
            >
            <Option value="1">c000001_A传感器</Option>
            <Option value="2">c000002_B传感器</Option>
            <Option value="3">c000003_C传感器</Option>
            <Option value="4">c000004_C传感器</Option>
            <Option value="5">c000005_C传感器</Option>
            <Option value="6">c000006_C传感器</Option>
            </Select> 
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='异常事件名称&nbsp;'
        >
          {getFieldDecorator('sensor_type', {
            rules: [{ required: true, message: '请输入异常事件名称!', whitespace: true }],
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='开始时间&nbsp;'
        >
            {getFieldDecorator('start_time_obj', {
              rules: [{ required: true, message: '请选择开始时间!' }],
            })(
            <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Time"
            onChange={this.onChange}
            onOk={this.onOk}
            />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='结束时间&nbsp;'
        >
            {getFieldDecorator('end_time_obj', {
              rules: [{ required: true, message: '请选择结束时间!' }],
            })(
            <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Time"
            onChange={this.onChange}
            onOk={this.onOk}
            />
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
    );
  }
}
const WrappedAddModalForm = Form.create()(AddModalForm);

//要state什么属性放到props里面
const mapStateToProps = (state) => { 
    return state;
};
//要什么方法，放到props里面,自动dispath
const mapDispatchToProps = (dispatch) => ({
    // fetchDataMonitor: bindActionCreators(fetchDataMonitor, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedAddModalForm);