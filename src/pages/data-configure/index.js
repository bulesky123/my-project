import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal,Table ,Button,Input, Select,Form, Row, Col} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import NormalLoginForm from './components/modal'
import fetchEventUnusual  from '../../action/event-unusual';

const FormItem = Form.Item;
const { Option } = Select;
class DataConfigure extends Component{
    constructor(){
        super();
        this.state={
            visible:false
        }
    }
    componentDidMount(){
        this.props.fetchEventUnusual()   
    }
    handleButton(orderId){
        this.props.history.push(`/app/event/echart/${orderId}`);
    }
    showModal(){
        this.setState({visible:true})
    }
    hideModal(){
        this.setState({visible:false})
    }
    render(){
        const {eventList,a=30,b=20,pageSize=20,total=50} = this.props.FetchList
        const columns = [
            {title: '数据id', dataIndex: 'mainOrderId', key: 'mainOrderId',fixed: 'left', width: 160 },
            {title: '传感器id', dataIndex: 'matchStatus', key: 'matchStatus', width: 100},
            {title: '传感器名称', dataIndex: 'name', key: 'name', width: 70},
            {title: '传感器类型', dataIndex: 'loanAmount', key: 'loanAmount', width: 100},
            {title: '均值', dataIndex: 'cycleType', key: 'cycleType', width: 100},
            {title: '方差', dataIndex: 'migrated', key: 'migrated', width: 70},
            {title: '操作人', dataIndex: 'register', key: 'register', width: 70},
            {title: '创建时间', dataIndex: 'matchTime', key: 'matchTime', width:150},
            {title: '更新时间', dataIndex: 'realEndTime', key: 'realEndTime' ,width: 150},
            {title: '操作', dataIndex: 'operation', key: 'operation', fixed: 'right',align:'center'},
        ];
        
        let data = eventList&&eventList.map((item,index)=>{
            return {
                key: index,
                mainOrderId: item.mainOrderId,
                matchStatus: item.matchStatus,
                name:item.name,
                loanAmount: item.loanAmount,
                cycleType: item.cycleType,
                migrated: item.migrated,
                matchTime:item.matchTime,
                realEndTime:item.realEndTime,
                register:item.register,
                operation:<div><Button onClick={this.handleButton.bind(this,item.mainOrderId)}>详情</Button><Button onClick={this.handleButton.bind(this,item.mainOrderId)}>修改</Button><Button onClick={this.handleButton.bind(this,item.mainOrderId)}>删除</Button></div>
            }
        });
        //翻页器配置
        let pagination = {
            // size:"small",
            pageSize: pageSize,
            defaultCurrent: 1,
            total: total,
            onChange: (page) => {
                alert(page)
            }
        };
        return(
            <div>
                <BreadcrumbCustom first="数据管理" second="参数配置" />
                <Form style={{marginBottom:20,marginTop:20}} layout="inline">
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
                        <Button type="primary" onClick={this.showModal.bind(this)}>查询</Button>
                    </Col>
                    <Col md={2} sm={24}>
                        <Button type="primary" onClick={this.showModal.bind(this)}>添加</Button>
                    </Col>
                    <Col md={2} sm={24}>
                        <Button type="primary" onClick={this.showModal.bind(this)}>批量导入</Button>
                    </Col>
                </Row>    
                </Form>
                <Table columns={columns} dataSource={data} scroll={{ x:1000, y:300}}  pagination={pagination}/>
                <Modal
                title="添加传感器"
                visible={this.state.visible}
                onOk={this.hideModal.bind(this)}
                onCancel={this.hideModal.bind(this)}
                okText="添加"
                cancelText="取消"
                footer={null}
                >
                <NormalLoginForm hideModal={this.hideModal.bind(this)} />
                </Modal>
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
    fetchEventUnusual: bindActionCreators(fetchEventUnusual, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DataConfigure));