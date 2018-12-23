import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal,Table ,Button,Input, Select,Form, Row, Col,Upload,Icon,message} from 'antd';
import {post} from '../../axios/tools'
import config from '../../axios/config'
import BreadcrumbCustom from '../BreadcrumbCustom';
import WrappedAddModalForm from './components/addModalFrom';
import EditModalFrom from './components/editModalFrom';
import fetchEventUnusual  from '../../action/event-unusual';

const FormItem = Form.Item;
const { Option } = Select;
class DataConfigure extends Component{
    constructor(){
        super();
        this.state={
            addModalVisible:false,
            editModalVisible:false,
            isEditModal:true,//默认是修改弹窗
            sensor_type:'',
            sensor_id:'',
            sensor_name:'',
            defaultValue:{}
        }
    }
    componentDidMount(){
        this.props.fetchEventUnusual()   
    }
    //查看详情和修改
    handleButton(item,isEdit){
        this.setState({editModalVisible:true,isEditModal:isEdit?true:false,defaultValue:item})
    }
    //删除数据
    handleDelete(item){
        const param = {
            id:item.id,
            sensor_id:item.sensor_id,
            sensor_name:item.sensor_name,
            sensor_type:item.sensor_type
        }
        post({url:config.BASEURL+'removeSensorConf',data:param}).then((data)=>{
            this.props.fetchEventUnusual()
        })
    }
    //添加数据
    addTable(){
        this.setState({addModalVisible:true})
    }
    //查询表格
    searchTable(){
        const searchParam = {
            sensor_type:this.state.sensor_type,
            sensor_id:this.state.sensor_id,
            sensor_name:this.state.sensor_name,
        }
        this.props.fetchEventUnusual(searchParam)
    }
    //批量导入
    importTable(){

    }
    //关闭添加弹窗Modal
    hideAddModal(){
        this.setState({addModalVisible:false})
    }
    hideEditModal(){
        this.setState({editModalVisible:false})
    }
    render(){
        const {eventList,a=30,b=20,pageSize=20,total=50} = this.props.FetchList;
        const { isEditModal ,defaultValue} =this.state
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
                operation:<div><Button onClick={this.handleButton.bind(this,item,'')}>详情</Button><Button onClick={this.handleButton.bind(this,item,'isEdit')}>修改</Button><Button onClick={this.handleDelete.bind(this,item)}>删除</Button></div>
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
        const uploadParam = {
          name: 'file',
          action: config.BASEURL+'getSensorConfFile',
          /*headers: {
            authorization: 'authorization-text',
        },*/
        beforeUpload(file) {
            console.log(file)
              /*const isxls = file.type === 'file/xls';
              if (!isxls) {
                message.error('You can only upload JPG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
            }
            return isJPG && isLt2M;*/
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
          }
      },

  };
        return(
            <div>
                <BreadcrumbCustom first="数据管理" second="参数配置" />
                <Form onSubmit={this.searchTable.bind(this)} style={{marginBottom:20,marginTop:20}} layout="inline">
                <Row > 
                    <Col md={6} sm={24} >
                        <FormItem label="传感器类型">
                            <Select onChange={ (e)=>{this.setState({sensor_type:e})} } placeholder="请选择传感器类型" style={{ minWidth: 100,width: '100%' }}>
                                <Option value="0">温度</Option>
                                <Option value="1">气压</Option>
                                <Option value="2">电力</Option>
                                <Option value="3">湿度</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem key="name" label="传感器ID">
                           <Input onChange={ (e)=>{this.setState({sensor_id:e.target.value})} } placeholder="请输入传感器ID" />
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="传感器名称">
                            <Input onChange={ (e)=>{this.setState({sensor_name:e.target.value})} } placeholder="请输入传感器名称" />
                        </FormItem>
                    </Col>
                    <Col md={2} sm={24}>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Col>
                    <Col md={2} sm={24}>
                        <Button type="primary" onClick={this.addTable.bind(this)}>添加</Button>
                    </Col>
                    <Col md={2} sm={24}>
                        <Upload {...uploadParam}>
                            <Button type="primary" onClick={this.importTable.bind(this)}><Icon type="upload" />批量导入</Button>
                        </Upload>
                        
                    </Col>
                </Row>    
                </Form>
                <Table columns={columns} dataSource={data} scroll={{ x:1200, y:300}}  pagination={pagination}/>
                <Modal
                title="添加传感器"
                visible={this.state.addModalVisible}
                onOk={this.hideAddModal.bind(this)}
                onCancel={this.hideAddModal.bind(this)}
                okText="添加"
                cancelText="取消"
                footer={null}
                >
                    <WrappedAddModalForm hideModal={this.hideAddModal.bind(this)} />
                </Modal>
                <Modal
                title={isEditModal?"修改传感器":'传感器详情'}
                visible={this.state.editModalVisible}
                onOk={this.hideEditModal.bind(this)}
                onCancel={this.hideEditModal.bind(this)}
                okText="确认修改"
                cancelText="取消"
                footer={null}
                >
                    <EditModalFrom defaultValue={defaultValue} isEditModal={isEditModal} hideModal={this.hideEditModal.bind(this)} />
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