import React,{Component} from 'react';
import { Table ,Button,Input, Select, Row, Col,DatePicker} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';

const {Option} = Select;
const {RangePicker} = DatePicker;



class Menu extends Component{
    constructor(){
        super();
        this.inputData = {
            startTimeVal: null,      //开始时间
            endTimeVal: null,         //结束时间
        };
    }
    componentDidMount(){

    }
    handleButton(orderId){
        alert(orderId)
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
    handleButtonClick(){
        alert('搜索')
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
                operation:<Button onClick={this.handleButton.bind(this,item.mainOrderId)}>查看</Button>
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
        return(
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="菜单管理" />
                <h2>数据监控...</h2>
                <form className="content-search">
                <Row>
                    <Col span={6}>
                        <Select defaultValue="借款时间" onChange={this.handleSelectChange.bind(this, 'timeType')} style={{minWidth: 100}}>
                            <Option value="loanTime">借款时间</Option>
                            <Option value="createTime">接收时间</Option>
                            <Option value="contractEndTime">合同到期时间</Option>
                            <Option value="transferTime">起息时间</Option>
                        </Select>
                    </Col>
                    <Col span={14}>
                        <RangePicker format="YYYY-MM-DD" placeholder={['Start Time', 'End Time']} onChange={this.handleRangePickerChange.bind(this)} />
                    </Col>
                    <Col span={4}>
                        <Button type="primary" icon="search" onClick={this.handleButtonClick.bind(this)}>搜索</Button>
                    </Col>         
                </Row>
                </form>
                <Table columns={columns} dataSource={data} scroll={{ x: 1600, y:350}}  pagination={pagination}/>
            </div>
        )
    }
}
export default Menu;