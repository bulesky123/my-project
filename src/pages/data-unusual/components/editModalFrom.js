import React,{Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import {post} from '../../../axios/tools'
import config from '../../../axios/config'
import fetchImitateUnusual  from '../../../action/imitate-unusual';
import {
  Form, Input, DatePicker, message, Icon, Select, Row, Col, Button,
} from 'antd';

const { Option } = Select;


class RegistrationForm extends React.Component {
  constructor(){
        super();
        this.state={
            visible:false
        }
    }
    componentWillMount(){
        this.props.form.resetFields();
    }
    componentDidMount(){
    
    }

  handleSubmit = (e) => {
    const sensor_type = this.props.formValue.sensor_type
    const id = this.props.formValue.id
    e.preventDefault(); 
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {  
        console.log('Received values of form: ', values);
        let submitObj = Object.assign({id:id,"start_time":values['start_time_obj'].format('YYYY-MM-DD HH:mm:ss'),"end_time":values['end_time_obj'].format('YYYY-MM-DD HH:mm:ss')}, values);
        post({url:config.BASEURL+'reviseAbnormalConf',data:submitObj}).then((data)=>{
          if(data.status !== '200'){
            message.error('修改失败');
            return; 
          }
            this.props.form.resetFields() ;
            this.props.hideModal();
            this.props.fetchImitateUnusual({});
            message.success('修改成功');
        })
        
      }
    });
  }
  onCancel(){
    this.props.form.resetFields() 
    this.props.hideModal()
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isEditModal ,formValue} = this.props;
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
          label='事件名称&nbsp;'
        >
          {getFieldDecorator('event_name',{
            rules: [{ required: true, message: '事件名称!', whitespace: true }],
            initialValue:formValue.event_name
          })(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="传感器id"
        >
        {getFieldDecorator('sensor_id', {
          initialValue:formValue.sensor_id
        })
        (
            <Select disabled={isEditModal?false:true}>
            <Option value="s001_002_08">s001_002_08</Option>
            <Option value="s001_002_09">s001_002_09</Option>
          </Select> 
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='传感器名称&nbsp;'
        >
          {getFieldDecorator('sensor_type', {
            rules: [{ required: true, message: '传感器名称!', whitespace: true }],
            initialValue:formValue.sensor_type
          })(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='传感器类型&nbsp;'
        >
          {getFieldDecorator('sensor_name', {
            rules: [{ required: true, message: '传感器类型!', whitespace: true }],
            initialValue:formValue.sensor_name
          })(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='设备名称&nbsp;'
        >
            {getFieldDecorator('dev_name', {initialValue:formValue.dev_name})(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='开始时间&nbsp;'
        >
            {getFieldDecorator('start_time_obj', {
              rules: [{ required: true, message: '请选择开始时间!' }],
              initialValue:formValue&&moment(formValue.start_time)
            })(
            <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Time"
            onChange={this.onChange}
            onOk={this.onOk}
            disabled={isEditModal?false:true}
            />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='结束时间&nbsp;'
        >
            {getFieldDecorator('end_time_obj', {
              rules: [{ required: true, message: '请选择结束时间!' }],
              initialValue:formValue&&moment(formValue.end_time)
            })(
            <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Time"
            onChange={this.onChange}
            onOk={this.onOk}
            disabled={isEditModal?false:true}
            />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='均值&nbsp;'
        >
          {getFieldDecorator('mean_val', {
            rules: [{ required: true, message: '请输入均值!', whitespace: true }],
            initialValue:formValue.mean_val+''
          })(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='方差&nbsp;'
        >
          {getFieldDecorator('mse_val', {
            rules: [{ required: true, message: '请输入方差!', whitespace: true }],
            initialValue:formValue.mse_val+""
          })(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="趋势"
        >
          {getFieldDecorator('trend_flg', {
            rules: [{ required: true, message: '请选择结束时间!', whitespace: true }],
            initialValue:formValue.trend_flg
          })(
                  <Select disabled={isEditModal?false:true}>
                      <Option value="上升">上升</Option>
                      <Option value="下降">下降</Option>
                  </Select>
              )}
          
        </Form.Item>
        {
            isEditModal?(
                <Form.Item>
        <Row>
            <Col  push='5' span='12'>
              <Button  type="primary" htmlType="submit">确认修改</Button>
            </Col>
            <Col push='5' span='12'>
              <Button onClick={()=>this.onCancel()}>取消</Button>
            </Col>
          </Row>
          </Form.Item>
              ):null
        }
        
      </Form>
      </div>
    );
  }
}
const EditModalFrom = Form.create()(RegistrationForm);

//要state什么属性放到props里面
const mapStateToProps = (state) => {
    
    return state;
};
//要什么方法，放到props里面,自动dispath
const mapDispatchToProps = (dispatch) => ({
    fetchImitateUnusual: bindActionCreators(fetchImitateUnusual, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(EditModalFrom);