import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal,Table ,Button,Input, Select, Row, Col,DatePicker,Icon,Upload ,message,Form} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import WrappedAddModalForm from './components/addModalFrom';
import EditModalFrom from './components/editModalFrom';
import fetchImitateUnusual  from '../../action/imitate-unusual'
import {post} from '../../axios/tools'
import config from '../../axios/config'
const {Option} = Select;
const FormItem = Form.Item;
const {RangePicker} = DatePicker;
const confirm = Modal.confirm;



class DataUnusual extends Component{
    constructor(){
        super();
        this.state = {
            addModalVisible:false,
            editModalVisible:false,
            isEditModal:true,//默认是修改弹窗
            event_name:'',
            sensor_name:'',
            dev_name:'',
            formValue:{}
        }
    }
    componentDidMount(){
        const defaultParam = {
            event_name:this.state.event_name,
            sensor_name:this.state.sensor_name,
            dev_name:this.state.dev_name,
        }
        this.props.fetchImitateUnusual(defaultParam)
    }
        //查看详情和修改
    handleButton(item,isEdit){
        console.log(item)
        this.setState({editModalVisible:true,isEditModal:isEdit?true:false,formValue:item})
    }
    //删除数据
    handleDelete(item){
        let _this = this;
        const param = {
            id:item.id,
            sensor_id:item.sensor_id,
            sensor_id:item.sensor_id,
            sensor_type:item.sensor_type
        }
        const formParam = {
            event_name:this.state.event_name,
            sensor_name:this.state.sensor_name,
            dev_name:this.state.dev_name,
        }
        confirm({
            title: '您想好了，确定删除它?',
            // content: '删除此条配置',
            okText: '想好了',
            okType: 'danger',
            cancelText: '再想想',
            onOk() {
              post({url:config.BASEURL+'removeAbnormalConf',data:param}).then((data)=>{
                if(data.status !== '200'){
                    message.error('删除失败');
                    return; 
                }
                _this.props.fetchImitateUnusual(formParam)
                message.success('删除成功');
            })
          },
          onCancel() {
              console.log('Cancel');
          },
      });   
    }
    addTable(){
        this.setState({addModalVisible:true})
    }
        //关闭添加弹窗Modal
    hideAddModal(){
        this.setState({addModalVisible:false})
    }
    hideEditModal(){
        this.setState({editModalVisible:false})
    }
    searchTable(){
        const defaultParam = {
            event_name:this.state.event_name,
            sensor_name:this.state.sensor_name,
            dev_name:this.state.dev_name,
        }
        this.props.fetchImitateUnusual(defaultParam)
    }
    render(){
        const {imitateList,totalCount=0} = this.props.FetchImitateList;
        const { isEditModal ,formValue} =this.state
        const columns = [
            {title: '事件id', dataIndex: 'id', key: 'id',fixed: 'left', width: 80 },
            {title: '事件名称', dataIndex: 'event_name', key: 'event_name', width: 120 },
            {title: '传感器id', dataIndex: 'sensor_id', key: 'sensor_id', width: 120},
            {title: '传感器名称', dataIndex: 'sensor_name', key: 'sensor_name', width: 120},
            {title: '设备名称', dataIndex: 'dev_name', key: 'dev_name', width: 120},
            {title: '趋势', dataIndex: 'trend_flg', key: 'trend_flg', width: 80},
            {title: '均值', dataIndex: 'mean_value', key: 'mean_value', width: 60},
            {title: '方差', dataIndex: 'mse_value', key: 'mse_value', width: 60},
            {title: '开始时间', dataIndex: 'start_time', key: 'start_time', width: 180},
            {title: '结束时间', dataIndex: 'end_time', key: 'end_time', width:180},
            {title: '操作人', dataIndex: 'operator', key: 'operator' ,width: 80},
            {title: '创建时间', dataIndex: 'create_time', key: 'create_time' ,width: 180},
            {title: '更新时间', dataIndex: 'update_time', key: 'update_time' ,width: 180},
            {title: '操作', dataIndex: 'operation', key: 'operation', fixed: 'right',align:'center'},
        ];
        let data = imitateList&&imitateList.map((item,index)=>{
            return {
                key: index,
                id: item.id,
                event_name: item.event_name,
                sensor_id: item.sensor_id,
                sensor_name:item.sensor_name,
                dev_name: item.dev_name,
                trend_flg: item.trend_flg,
                mean_value: item.mean_value,
                mse_value: item.mse_value,
                start_time: item.start_time,
                end_time:item.end_time,
                operator: item.operator,
                create_time:item.create_time,
                update_time:item.update_time,
                operation:<div>
                <Button onClick={this.handleButton.bind(this,item,'')}>详情</Button><Button onClick={this.handleButton.bind(this,item,'isEdit')}>修改</Button><Button onClick={this.handleDelete.bind(this,item)}>删除</Button></div>
            }
        });
        //翻页器配置
        /*let pagination = {
            size:"small",
            pageSize: 20,
            defaultCurrent: 1,
            total: 100,
            onChange: (page) => {
                alert(page)
            }
        };*/
        const uploadParam = {
          name: 'file',
          action: config.BASEURL+'getAbnormalConfFile',
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
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="数据管理" second='模拟异常'/>
                <Form style={{marginBottom:20,marginTop:20}} layout="inline">
                <Row > 
                    <Col md={6} sm={24} >
                        <FormItem label="事件名称">
                           <Input onChange={ (e)=>{this.setState({event_name:e.target.value})} } placeholder="事件名称" />
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem key="name" label="传感器名称">
                           <Input onChange={ (e)=>{this.setState({sensor_name:e.target.value})} } placeholder="传感器名称" />
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="设备名称">
                            <Input onChange={ (e)=>{this.setState({dev_name:e.target.value})} } placeholder="设备名称" />
                        </FormItem>
                    </Col>
                    <Col md={2} sm={24}>
                        <Button type="primary" onClick={this.searchTable.bind(this)}>查询</Button>
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
                <Table columns={columns} dataSource={data} scroll={{ x: 1750, y:300}} />
                <Modal
                title="添加事件"
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
                title={isEditModal?"修改事件":'事件详情'}
                visible={this.state.editModalVisible}
                onOk={this.hideEditModal.bind(this)}
                onCancel={this.hideEditModal.bind(this)}
                okText="确认修改"
                cancelText="取消"
                footer={null}
                >
                    <EditModalFrom formValue={formValue} isEditModal={isEditModal} hideModal={this.hideEditModal.bind(this)} />
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
    fetchImitateUnusual: bindActionCreators(fetchImitateUnusual, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DataUnusual);