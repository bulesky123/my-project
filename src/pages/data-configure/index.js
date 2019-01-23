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
import { fetchEventUnusual, fetchQuerySensorTypeList }  from '../../action/event-unusual';

const FormItem = Form.Item;
const { Option } = Select;
const confirm = Modal.confirm;
class DataConfigure extends Component{
    constructor(){
        super();
        this.state={
            addModalVisible:false,
            editModalVisible:false,
            isEditModal:true,//默认是修改弹窗
            sensor_type:'温度',
            sensor_id:'',
            sensor_name:'',
            formValue:{}
        }
    }
    componentWillMount(){
        this.props.fetchQuerySensorTypeList({})
    }
    componentDidMount(){
        const searchParam = {
            sensor_type:this.state.sensor_type,
            sensor_id:this.state.sensor_id,
            sensor_name:this.state.sensor_name,
        }
        this.props.fetchEventUnusual(searchParam)   
    }
    //查看详情和修改
    handleButton(item,isEdit){
        this.setState({editModalVisible:true,isEditModal:isEdit?true:false,formValue:item})
    }
    //删除数据
    handleDelete(item){
        let _this = this;
        const param = {
            id:item.id,
            sensor_id:item.sensor_id,
            sensor_name:item.sensor_name,
            sensor_type:item.sensor_type
        }
        const formParam = {
            sensor_type:this.state.sensor_type,
            sensor_id:this.state.sensor_id,
            sensor_name:this.state.sensor_name,
        }
        confirm({
            title: '您想好了，确定删除它?',
            // content: '删除此条配置',
            okText: '想好了',
            okType: 'danger',
            cancelText: '再想想',
            onOk() {
              post({url:config.BASEURL+'removeSensorConf',data:param}).then((data)=>{
                if(data.status !== '200'){
                    message.error('删除失败');
                    return; 
                }
                _this.props.fetchEventUnusual(formParam)
                message.success('删除成功');
            })
          },
          onCancel() {
              console.log('Cancel');
          },
      });   
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
    //关闭添加弹窗Modal
    hideAddModal(){
        this.setState({addModalVisible:false})
    }
    hideEditModal(){
        this.setState({editModalVisible:false})
    }
    render(){
        const {eventList,SensorTypeList,totalCount=0} = this.props.FetchList;
        const { isEditModal ,formValue} =this.state
        const columns = [
            {title: '数据id', dataIndex: 'id', key: 'id',fixed: 'left', width: 100 },
            {title: '传感器id', dataIndex: 'sensor_id', key: 'sensor_id', width: 100},
            {title: '传感器名称', dataIndex: 'sensor_name', key: 'sensor_name', width: 70},
            {title: '传感器类型', dataIndex: 'sensor_type', key: 'sensor_type', width: 100},
            {title: '均值', dataIndex: 'mean_val', key: 'mean_val', width: 100},
            {title: '方差', dataIndex: 'mse_val', key: 'mse_val', width: 70},
            {title: '操作人', dataIndex: 'operator', key: 'operator', width: 70},
            {title: '创建时间', dataIndex: 'create_time', key: 'create_time', width:180},
            {title: '更新时间', dataIndex: 'update_time', key: 'update_time' ,width: 180},
            {title: '操作', dataIndex: 'operation', key: 'operation', fixed: 'right',align:'center'},
        ];
        
        let data = eventList&&eventList.map((item,index)=>{
            return {
                key: index,
                id: item.id,
                sensor_id: item.sensor_id,
                sensor_name: item.sensor_name,
                sensor_type:item.sensor_type,
                mean_val: item.mean_val,
                mse_val: item.mse_val,
                migrated: item.migrated,
                create_time:item.create_time,
                update_time:item.update_time,
                operator:item.operator,
                operation:<div><Button onClick={this.handleButton.bind(this,item,'')}>详情</Button><Button onClick={this.handleButton.bind(this,item,'isEdit')}>修改</Button><Button onClick={this.handleDelete.bind(this,item)}>删除</Button></div>
            }
        });
        //翻页器配置
        /*let pagination = {
            // size:"small",
            pageSize: pageSize,
            defaultCurrent: 1,
            total: total,
            onChange: (page) => {
                alert(page)
            }
        };*/
        const uploadParam = {
          name: 'file',
          action: config.BASEURL+'getSensorConfFile',
          /*headers: {
            authorization: 'authorization-text',
        },*/
        beforeUpload(file) {
            console.log(file.type)
              const isXLS = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
              if (!isXLS) {
                message.error('You can only upload .xls file!');
            }
            return isXLS;
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
                            <Select  onChange={ (e)=>{this.setState({sensor_type:e})} } placeholder="请选择传感器类型" style={{ minWidth: 100,width: '100%' }}>
                                {
                                    SensorTypeList&&SensorTypeList.map((item,i)=>{
                                        return <Option key={i} value={item}>{item}</Option>
                                    })
                                }
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
                            <Button type="primary"><Icon type="upload" />批量导入</Button>
                        </Upload>
                        
                    </Col>
                </Row>    
                </Form>
                <div style={{"marginBottom":10}}>总共<span style={{"color":'red'}}>{totalCount}</span>条：</div>
                <Table columns={columns} dataSource={data} scroll={{ x:1200, y:300}}  />
                <Modal
                title="添加传感器"
                visible={this.state.addModalVisible}
                onOk={this.hideAddModal.bind(this)}
                onCancel={this.hideAddModal.bind(this)}
                okText="添加"
                cancelText="取消"
                footer={null}
                >
                    <WrappedAddModalForm SensorTypeList={SensorTypeList} hideModal={this.hideAddModal.bind(this)} />
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
                    <EditModalFrom SensorTypeList={SensorTypeList} formValue={formValue} isEditModal={isEditModal} hideModal={this.hideEditModal.bind(this)} />
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
    fetchEventUnusual: bindActionCreators(fetchEventUnusual, dispatch),
    fetchQuerySensorTypeList:bindActionCreators(fetchQuerySensorTypeList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DataConfigure));