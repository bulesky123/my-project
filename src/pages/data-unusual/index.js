import React,{Component} from 'react';
import { Table ,Button,Input, Select, Row, Col,DatePicker,Icon,Upload ,message,Form} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {post} from '../../axios/tools'
import config from '../../axios/config'
const {Option} = Select;
const FormItem = Form.Item;
const {RangePicker} = DatePicker;



class DataUnusual extends Component{
    constructor(){
        super();
        this.inputData = {
            startTimeVal: null,      //开始时间
            endTimeVal: null,         //结束时间
        };
    }
    componentDidMount(){

    }
    handleSelectChange(option, value) {
        if (value == -1) {
            this.inputData[option] = null;
        } else {
            this.inputData[option] = value;
        }
    }

    handleRangePickerChange(moment, date) {
        this.inputData.startTimeVal = date[0];
        this.inputData.endTimeVal = date[1];
    }
    handleButton(orderId){
        alert(orderId)
    }
    addTable(){
        alert('搜索')
    }
    searchTable(){

    }
    importTable(){

    }
    render(){
        const columns = [
            {title: '异常事件id', dataIndex: 'mainOrderId', key: 'mainOrderId',fixed: 'left', width: 160 },
            {title: '异常事件名称', dataIndex: 'nameRegister', key: 'nameRegister', width: 70},
            {title: '传感器id', dataIndex: 'matchStatus', key: 'matchStatus', width: 100},
            {title: '传感器名称', dataIndex: 'name', key: 'name', width: 70},
            {title: '设备名称', dataIndex: 'loanAmount', key: 'loanAmount', width: 100},
            {title: '功能名称', dataIndex: 'bidRate', key: 'bidRate', width: 100},
            {title: '趋势', dataIndex: 'cycle', key: 'cycle', width: 100},
            {title: '均值', dataIndex: 'cycleType', key: 'cycleType', width: 100},
            {title: '方差', dataIndex: 'migrated', key: 'migrated', width: 70},
            {title: '开始时间', dataIndex: 'matchTime', key: 'matchTime', width:150},
            {title: '持续时间', dataIndex: 'realEndTime', key: 'realEndTime' ,width: 150},
            {title: '结束时间', dataIndex: 'contractEndTime', key: 'contractEndTime', width: 120},
            {title: '创建时间', dataIndex: 'createTime', key: 'createTime' ,width: 150},
            {title: '操作人', dataIndex: 'register', key: 'register', width: 70},
            {title: '操作', dataIndex: 'operation', key: 'operation', fixed: 'right',align:'center'},
        ];
        const rows = [{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        },{
            "mainOrderId": "15f8b935-b589-4b29-8471-c86a2375a431",
            "nameRegister": "李四",
            "matchStatus": '15f8b935-b589-4b29-8471',
            "name": '设备',
            "loanAmount": "300.00",
            "bidRate": "36.00%",
            "cycle": 50,
            "cycleType": 1,
            "migrated": 0,           
            "matchTime": 1545221951,
            "contractEndTime": 1549468799,
            "realEndTime": 1549468799,
            "createTime":1549468734,
            "register":'张三'
        }];
        let data = rows.map((item,index)=>{
            return {
                key: index,
                mainOrderId: item.mainOrderId,
                nameRegister: item.nameRegister,
                matchStatus: item.matchStatus,
                name:item.name,
                loanAmount: item.loanAmount,
                bidRate: item.bidRate,
                cycle: item.cycle,
                cycleType: item.cycleType,
                migrated: item.migrated,
                matchTime:item.matchTime,
                transferTime: item.strTransferTime,
                contractEndTime:item.contractEndTime,
                realEndTime:item.realEndTime,
                createTime: item.createTime,
                register:item.register,
                operation:<div><Button onClick={this.handleButton.bind(this,item)}>详情</Button><Button onClick={this.handleButton.bind(this,item)}>修改</Button><Button onClick={this.handleButton.bind(this,item)}>删除</Button></div>
            }
        });
        //翻页器配置
        let pagination = {
            size:"small",
            pageSize: 20,
            defaultCurrent: 1,
            total: 100,
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
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="数据管理" second='模拟异常'/>
                <Form style={{marginBottom:20,marginTop:20}} layout="inline">
                <Row > 
                    <Col md={6} sm={24} >
                        <FormItem label="事件名称">
                           <Input onChange={ (e)=>{this.setState({sensor_id:e.target.value})} } placeholder="请输入传感器ID" />
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem key="name" label="传感器名称">
                           <Input onChange={ (e)=>{this.setState({sensor_id:e.target.value})} } placeholder="请输入传感器ID" />
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="设备名称">
                            <Input onChange={ (e)=>{this.setState({sensor_name:e.target.value})} } placeholder="请输入传感器名称" />
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
                            <Button type="primary" onClick={this.importTable.bind(this)}><Icon type="upload" />批量导入</Button>
                        </Upload>
                        
                    </Col>
                </Row>    
                </Form>
                <Table columns={columns} dataSource={data} scroll={{ x: 1600, y:350}}  pagination={pagination}/>
            </div>
        )
    }
}
export default DataUnusual;