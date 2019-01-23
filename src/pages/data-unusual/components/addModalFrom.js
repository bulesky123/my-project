import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {post} from '../../../axios/tools'
import config from '../../../axios/config'
import fetchImitateUnusual  from '../../../action/imitate-unusual';
import {
    queryAllSensorList , 
}
  from '../../../action/data-monitor';
import {fetchQueryAbnormalSensorIdInfoo}  from '../../../action/event-unusual';
import {
  Form, Input, message,Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button,DatePicker,
} from 'antd';

const { Option } = Select;


class AddModalForm extends React.Component {
  constructor(){
        super();
        this.state={
            visible:false,
            sensor_name:'',
            sensor_id:'',
        }
    }
    componentWillMount(){
        this.props.queryAllSensorList({})
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
        post({url:config.BASEURL+'addAbnormalConf',data:submitObj}).then((data)=>{
          if(data.status !== '200'){
            message.error('添加失败');
            return; 
          }
            this.props.form.resetFields() ;
            this.props.hideModal();
            this.props.fetchImitateUnusual({"event_name":'s001_002_08'});
            message.success('添加成功');
        })
        
      }
    });
  }
  onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  selectChange(value){
        const sensor_id = value.split('#')[0];
        this.props.fetchQueryAbnormalSensorIdInfoo({sensor_id:sensor_id},(data)=>{
          this.setState({
            sensor_name:data.sensor_name,
            sensor_type:data.sensor_type
          })
        })    
  }
  onOk(value) {
    console.log('onOk: ', value);
  }
  onCancel(){
    this.props.form.resetFields() 
    this.props.hideModal()
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { sensorList } = this.props.FetchSensorList
    const { sensor_name, sensor_type } = this.state
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
    //this.props.form.setFieldsValue({})
    return (
      <div>
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label='事件名称&nbsp;'
        >
          {getFieldDecorator('event_name', {
            rules: [{ required: true, message: '事件名称!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="传感器id"
        >
        {getFieldDecorator('sensor_id', {})
        (
            <Select
              onChange={this.selectChange.bind(this)}
            >
            {
              sensorList&&sensorList.map((item,i)=>{
              return <Option key={i+1} value={item}>{item}</Option>
            })
          }
          </Select> 
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='传感器名称&nbsp;'
        >
          {getFieldDecorator('sensor_type', {
            rules: [{ required: true, message: '传感器名称!', whitespace: true }],
            initialValue:sensor_type
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='传感器类型&nbsp;'
        >
          {getFieldDecorator('sensor_name', {
            rules: [{ required: true, message: '传感器类型!', whitespace: true }],
            initialValue:sensor_name
          })(
            <Input/>
          )}
        </Form.Item>
        {/*<Form.Item
          {...formItemLayout}
          label='功能名称&nbsp;'
        >
            {getFieldDecorator('from_id', {})(
            <Input/>
          )}

        </Form.Item>*/}
        <Form.Item
          {...formItemLayout}
          label='设备名称&nbsp;'
        >
            {getFieldDecorator('dev_name', {})(
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
        <Form.Item
          {...formItemLayout}
          label='均值&nbsp;'
        >
          {getFieldDecorator('mean_val', {
            rules: [{ required: true, message: '请输入均值!', whitespace: true }],
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='方差&nbsp;'
        >
          {getFieldDecorator('mse_val', {
            rules: [{ required: true, message: '请输入方差!', whitespace: true }],
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="趋势"
        >
          {getFieldDecorator('trend_flg', {
            rules: [{ required: true, message: '请选择结束时间!', whitespace: true }],
            initialValue:'上升'
          })(
                  <Select>
                      <Option value="上升">上升</Option>
                      <Option value="下降">下降</Option>
                  </Select>
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
    fetchImitateUnusual: bindActionCreators(fetchImitateUnusual, dispatch),
    queryAllSensorList:bindActionCreators(queryAllSensorList, dispatch),
    fetchQueryAbnormalSensorIdInfoo:bindActionCreators(fetchQueryAbnormalSensorIdInfoo, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedAddModalForm);