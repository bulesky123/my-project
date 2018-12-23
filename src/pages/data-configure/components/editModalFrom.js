import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {post} from '../../../axios/tools'
import config from '../../../axios/config'
import fetchEventUnusual  from '../../../action/event-unusual';
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationForm extends React.Component {
  constructor(){
        super();
        this.state={
            visible:false
        }
    }
    componentWillMount(){
        //this.props.form.resetFields();
        //this.props.form.setFieldsValue({"sensor_name":"111","sensor_id":"eee","sensor_type":"2","function_id":"222","dev_id":"qww","from_id":"234","to_id":"1234","logic_position":"22","space_cordinate_x":"2","space_cordinate_y":"2","space_cordinate_z":"50","mean_val":"23","mse_val":"12.3","smooth_m":"2","smooth_n":"23","abnormal_a1":"234","abnormal_b1":"23","abnormal_a2":"33","abnormal_b2":"33","abnormal_a3":"33","abnormal_b3":"44"})
    }
    componentDidMount(){
        //this.props.form.resetFields();
        const defaultValue = this.props.defaultValue
        //const obj = {"sensor_name":"111","sensor_id":"eee","sensor_type":"2","function_id":"222","dev_id":"qww","from_id":"234","to_id":"1234","logic_position":"22","space_cordinate_x":"2","space_cordinate_y":"2","space_cordinate_z":"50","mean_val":"23","mse_val":"12.3","smooth_m":"2","smooth_n":"23","abnormal_a1":"234","abnormal_b1":"23","abnormal_a2":"33","abnormal_b2":"33","abnormal_a3":"33","abnormal_b3":"44"}
        this.props.form.setFieldsValue(defaultValue)
    
    }

  handleSubmit = (e) => {
    e.preventDefault(); 
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {  
        console.log('Received values of form: ', values);
        post({url:config.BASEURL+'addSensorConf',data:values}).then((data)=>{
          this.props.form.resetFields() ;
          this.props.hideModal();
          this.props.fetchEventUnusual();
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
    const { isEditModal } = this.props;
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
          label='传感器名称&nbsp;'
        >
          {getFieldDecorator('sensor_name', {
            rules: [{ required: true, message: '请输入传感器名称!', whitespace: true }],
          })(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='传感器id&nbsp;'
        >
          {getFieldDecorator('sensor_id', {
            rules: [{ required: true, message: '请输入传感器id!', whitespace: true }],
          })(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="传感器类型"
        >
        {getFieldDecorator('sensor_type', {initialValue:'1'})
        (
            <Select>
            <Option key='1' value="1">温度</Option>
            <Option key='2' value="2">气压</Option>
            <Option key='3' value="3">电力</Option>
            <Option key='4' value="3">湿度</Option>
          </Select> 
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='功能id&nbsp;'
        >
          {getFieldDecorator('function_id', {
            rules: [{ required: true, message: '请输入功能id!', whitespace: true }],
          })(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='设备id&nbsp;'
        >
          {getFieldDecorator('dev_id', {
            rules: [{ required: true, message: '请输入设备id!', whitespace: true }],
          })(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='上游传感器id&nbsp;'
        >
            {getFieldDecorator('from_id', {})(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}

        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='下游传感器id&nbsp;'
        >
            {getFieldDecorator('to_id', {})(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='逻辑位置&nbsp;'
        >
            {getFieldDecorator('logic_position', {})(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='空间坐标&nbsp;'
        >
            <Row>
              <Col span='8'>
              <Form.Item
                {...formItemLayout}
                label='X&nbsp;'
              >
                  {getFieldDecorator('space_cordinate_x', {})(
                  <Input readOnly={isEditModal?"":"readOnly"}/>
              )}
              </Form.Item>
              </Col>
              <Col span='8'>
              <Form.Item
                {...formItemLayout}
                label='Y&nbsp;'
              >
                  {getFieldDecorator('space_cordinate_y', {})(
                  <Input readOnly={isEditModal?"":"readOnly"}/>
              )}
              </Form.Item>
              </Col>
              <Col span='8'>
              <Form.Item
                {...formItemLayout}
                label='Z&nbsp;'
              >
                  {getFieldDecorator('space_cordinate_z', {})(
                  <Input readOnly={isEditModal?"":"readOnly"}/>
              )}
              </Form.Item>
              </Col>
            </Row>           
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='均值&nbsp;'
        >
          {getFieldDecorator('mean_val', {
            rules: [{ required: true, message: '请输入均值!', whitespace: true }],
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
          })(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='数据平滑&nbsp;'
        >
            <Row>
              <Col span='6'>
              <Form.Item
                {...formItemLayout}
                label='m&nbsp;'
              >
                {getFieldDecorator('smooth_m', {
                  rules: [{ required: true, message: '请输入m!', whitespace: true }],
                })(
                <Input readOnly={isEditModal?"":"readOnly"}/>
                )}
              </Form.Item>
              </Col>
              <Col span='6'>
              <Form.Item
                {...formItemLayout}
                label='n&nbsp;'
              >
                {getFieldDecorator('smooth_n', {
                  rules: [{ required: true, message: '请输入n!',whitespace: true }],
                })(
                <Input readOnly={isEditModal?"":"readOnly"}/>
                )}
              </Form.Item>
              </Col>
              <Col span='12'>
                <span>备注：I(t)= m*I(t) + n*I(t-1)</span>
              </Col>
            </Row>           
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='异常定义&nbsp;'
        >
            <Row>
              <Col span='4'>
              <span>红色预警</span>
              </Col>
              <Col span='10'>
              <Form.Item
                {...formItemLayout}
                label='a1&nbsp;'
              >
                  {getFieldDecorator('abnormal_a1', {
                  rules: [{ required: true, message: '请输入a1!', whitespace: true }],
                  })(
                    <Input readOnly={isEditModal?"":"readOnly"}/>
                  )}
              </Form.Item>
              </Col>
              <Col span='10'>
              <Form.Item
                {...formItemLayout}
                label='b1&nbsp;'
              >
                  {getFieldDecorator('abnormal_b1', {
                  rules: [{ required: true, message: '请输入b1!', whitespace: true }],
                  })(
                    <Input readOnly={isEditModal?"":"readOnly"}/>
                  )}
              </Form.Item>
              </Col>
            </Row>           
        </Form.Item>
        <Form.Item>
            <Row>
              <Col span='8'></Col>
              <Col span='16'>
                <Col span='4'>
                <span>橙色预警</span>
                </Col>
                <Col span='10'>
                <Form.Item
                  {...formItemLayout}
                  label='a2&nbsp;'
                >
                    {getFieldDecorator('abnormal_a2', {
                    rules: [{ required: true, message: '请输入a2!', whitespace: true }],
                    })(
                      <Input readOnly={isEditModal?"":"readOnly"}/>
                    )}
                </Form.Item>
                </Col>
                <Col span='10'>
                <Form.Item
                  {...formItemLayout}
                  label='b2&nbsp;'
                >
                    {getFieldDecorator('abnormal_b2', {
                    rules: [{ required: true, message: '请输入b2!', whitespace: true }],
                    })(
                      <Input readOnly={isEditModal?"":"readOnly"}/>
                    )}
                </Form.Item>
                </Col>
              </Col>
            </Row>           
        </Form.Item>
        <Form.Item>
            <Row>
              <Col span='8'></Col>
              <Col span='16'>
                <Col span='4'>
                <span>黄色预警</span>
                </Col>
                <Col span='10'>
                <Form.Item
                  {...formItemLayout}
                  label='a3&nbsp;'
                >
                    {getFieldDecorator('abnormal_a3', {
                    rules: [{ required: true, message: '请输入a3!', whitespace: true }],
                    })(
                      <Input readOnly={isEditModal?"":"readOnly"}/>
                    )}
                </Form.Item>
                </Col>
                <Col span='10'>
                <Form.Item
                  {...formItemLayout}
                  label='b3&nbsp;'
                >
                    {getFieldDecorator('abnormal_b3', {
                    rules: [{ required: true, message: '请输入b3!', whitespace: true }],
                    })(
                      <Input readOnly={isEditModal?"":"readOnly"}/>
                    )}
                </Form.Item>
                </Col>
              </Col>
            </Row>          
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="传感器类型"
        >
          {getFieldDecorator('space_cordinate_z', {initialValue:'5'})(
                  <Select>
                      <Option key='5' value="5">5min</Option>
                      <Option key='10' value="10">10min</Option>
                      <Option key='30' value="30">30min</Option>
                      <Option key='100' value="100">1h</Option>
                      <Option key='40' value="40">12h</Option>
                      <Option key='50'value="50">24h</Option>
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
    fetchEventUnusual: bindActionCreators(fetchEventUnusual, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(EditModalFrom);