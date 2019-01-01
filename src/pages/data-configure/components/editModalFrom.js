import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {post} from '../../../axios/tools'
import config from '../../../axios/config'
import fetchEventUnusual  from '../../../action/event-unusual';
import {
  Form, Input, message, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
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
        let submitData = Object.assign({id:id}, values);
        post({url:config.BASEURL+'reviseSensorConf',data:submitData}).then((data)=>{
          if(data.status !== '200'){
            message.err('修改失败');
            return; 
          }
          this.props.form.resetFields() ;
          this.props.hideModal();
          this.props.fetchEventUnusual({"sensor_type":sensor_type});
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
          label='传感器名称&nbsp;'
        >
          {getFieldDecorator('sensor_name',{
            rules: [{ required: true, message: '请输入传感器名称!', whitespace: true }],
            initialValue:formValue.sensor_name
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
            initialValue:formValue.sensor_id
          })(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="传感器类型"
        >
        {getFieldDecorator('sensor_type', {initialValue:formValue.sensor_type})
        (
            <Select>
            <Option value="温度">温度</Option>
            <Option value="压强">压强</Option>
            <Option value="电压">电压</Option>
            <Option value="电流">电流</Option>
            <Option value="流量">流量</Option>
            <Option value="压力">压力</Option>
          </Select> 
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='功能id&nbsp;'
        >
          {getFieldDecorator('function_id', {
            rules: [{ required: true, message: '请输入功能id!', whitespace: true }],
            initialValue:formValue.function_id
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
            initialValue:formValue.dev_id
          })(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='上游传感器id&nbsp;'
        >
            {getFieldDecorator('from_id', {initialValue:formValue.from_id})(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}

        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='下游传感器id&nbsp;'
        >
            {getFieldDecorator('to_id', {initialValue:formValue.to_id})(
            <Input readOnly={isEditModal?"":"readOnly"}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='逻辑位置&nbsp;'
        >
            {getFieldDecorator('logic_position', {initialValue:formValue.logic_position})(
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
                  {getFieldDecorator('space_cordinate_x', {initialValue:formValue.space_cordinate_x})(
                  <Input readOnly={isEditModal?"":"readOnly"}/>
              )}
              </Form.Item>
              </Col>
              <Col span='8'>
              <Form.Item
                {...formItemLayout}
                label='Y&nbsp;'
              >
                  {getFieldDecorator('space_cordinate_y', {initialValue:formValue.space_cordinate_y})(
                  <Input readOnly={isEditModal?"":"readOnly"}/>
              )}
              </Form.Item>
              </Col>
              <Col span='8'>
              <Form.Item
                {...formItemLayout}
                label='Z&nbsp;'
              >
                  {getFieldDecorator('space_cordinate_z', {initialValue:formValue.space_cordinate_z})(
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
            initialValue:formValue.mean_val+""
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
                  initialValue:formValue.smooth_m+""
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
                  initialValue:formValue.smooth_n+""
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
                  initialValue:formValue.abnormal_a1
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
                  initialValue:formValue.abnormal_b1
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
                    initialValue:formValue.abnormal_a2
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
                    initialValue:formValue.abnormal_b2
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
                    initialValue:formValue.abnormal_a3
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
                    initialValue:formValue.abnormal_b3
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
          label="追溯时间"
        >
          {getFieldDecorator('time_scope', {initialValue:formValue.time_scope})(
                  <Select>
                      <Option value="5min">5min</Option>
                      <Option value="10min">10min</Option>
                      <Option value="30min">30min</Option>
                      <Option value="1h">1h</Option>
                      <Option value="12h">12h</Option>
                      <Option value="24h">24h</Option>
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