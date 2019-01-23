import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchEventUnusual}  from '../../../action/event-unusual';
import {
  Form, Input, Select, Row, Col,  Button,
} from 'antd';

const { Option } = Select;
const FormItem = Form.Item

class AddModalForm extends React.Component {
  constructor(){
        super();
        this.state={
            
        }
    }

  searchTable = (e) => {
    e.preventDefault(); 
    
  }
  render() {
    return (
      <div>
          <Form onSubmit={this.searchTable.bind(this)} style={{marginBottom:20,marginTop:20}} layout="inline">
                <Row > 
                    <Col md={6} sm={24} >
                        <FormItem label="传感器类型">
                            <Select placeholder="请选择传感器类型" style={{ minWidth: 100,width: '100%' }}>
                                <Option value="0">温度</Option>
                                <Option value="1">气压</Option>
                                <Option value="2">电力</Option>
                                <Option value="3">湿度</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem key="name" label="传感器ID">
                           <Input placeholder="请输入传感器ID" />
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="传感器名称">
                            <Input placeholder="请输入传感器名称" />
                        </FormItem>
                    </Col>
                    <Col md={2} sm={24}>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Col>
                    <Col md={2} sm={24}>
                        <Button type="primary" onClick={this.addTable.bind(this)}>添加</Button>
                    </Col>
                    <Col md={2} sm={24}>
                        <Button type="primary" onClick={this.importTable.bind(this)}>批量导入</Button>
                    </Col>
                </Row>    
                </Form>
      </div>
    );
  }
}
const SearchForm = Form.create()(AddModalForm);

//要state什么属性放到props里面
const mapStateToProps = (state) => {
    
    return state;
};
//要什么方法，放到props里面,自动dispath
const mapDispatchToProps = (dispatch) => ({
    fetchEventUnusual: bindActionCreators(fetchEventUnusual, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);