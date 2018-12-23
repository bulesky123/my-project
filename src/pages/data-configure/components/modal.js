import React,{Component} from 'react';
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
    componentDidMount(){
        //this.props.form.resetFields() 
    }

  handleSubmit = (e) => {
    e.preventDefault(); 
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {  
        console.log('Received values of form: ', values);
        this.props.form.resetFields() 
        this.props.hideModal()
      }
    });
  }
  onCancel(){
    this.props.form.resetFields() 
    this.props.hideModal()
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
          label='传感器名称&nbsp;'
        >
          {getFieldDecorator('sensor_name', {
            rules: [{ required: true, message: '请输入传感器名称!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='传感器id&nbsp;'
        >
          {getFieldDecorator('sensor_id', {
            rules: [{ required: true, message: '请输入传感器id!', whitespace: true }],
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="传感器类型"
        >
        {getFieldDecorator('sensor_type', {initialValue:'1'})
        (
            <Select>
            <Option value="1">温度</Option>
            <Option value="2">气压</Option>
            <Option value="3">电力</Option>
            <Option value="3">湿度</Option>
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
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='设备id&nbsp;'
        >
          {getFieldDecorator('dev_id', {
            rules: [{ required: true, message: '请输入设备id!', whitespace: true }],
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='上游传感器id&nbsp;'
        >
            {getFieldDecorator('from_id', {})(
            <Input/>
          )}

        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='下游传感器id&nbsp;'
        >
            {getFieldDecorator('to_id', {})(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='逻辑位置&nbsp;'
        >
            {getFieldDecorator('logic_position', {})(
            <Input/>
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
                  <Input/>
              )}
              </Form.Item>
              </Col>
              <Col span='8'>
              <Form.Item
                {...formItemLayout}
                label='Y&nbsp;'
              >
                  {getFieldDecorator('space_cordinate_y', {})(
                  <Input/>
              )}
              </Form.Item>
              </Col>
              <Col span='8'>
              <Form.Item
                {...formItemLayout}
                label='Z&nbsp;'
              >
                  {getFieldDecorator('space_cordinate_z', {})(
                  <Input/>
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
                <Input />
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
                <Input/>
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
                    <Input/>
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
                    <Input/>
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
                      <Input/>
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
                      <Input/>
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
                      <Input/>
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
                      <Input/>
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
          {getFieldDecorator('space_cordinate_z', {initialValue:'1'})(
                  <Select>
                      <Option  value="1">5min</Option>
                      <Option value="2">10min</Option>
                      <Option value="3">30min</Option>
                      <Option value="3">1h</Option>
                      <Option value="4">12h</Option>
                      <Option value="5">24h</Option>
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

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm