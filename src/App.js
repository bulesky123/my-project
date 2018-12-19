import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Layout } from 'antd';
import SiderCustom from './pages/SiderCustom';
import HeaderCustom from './pages/HeaderCustom';
import { receiveData } from './action';
import CRouter from './routes';
import config from '@/axios/config';
import {menus_old} from './constants/menus';
import './style/index.less';
const { Content, Footer } = Layout;

class App extends Component {
    state = {
        collapsed: false,
        auths:null,
        menus:[{key: '/data-monitor', title: '首页', icon: 'mobile'}]
    };
    componentWillMount() {
        const { receiveData } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        user && receiveData(user, 'auth');
        this.getClientWidth();
        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClientWidth();
        }
    }
    componentDidMount() {
        this.setState({menus:menus_old})
    }
    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const { receiveData } = this.props;
        const clientWidth = document.body.clientWidth;
        receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { responsive } = this.props;
        const { menus } = this.state;
        return (
            <Layout>
                {!responsive.data.isMobile && <SiderCustom menus={menus} collapsed={this.state.collapsed} />}
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={{}} />
                    <Content style={{ margin: '0 16px', overflow: 'initial',display: 'flex',flexDirection: 'column' }}>
                        <CRouter />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

//要state什么属性放到props里面
const mapStateToProps = (state) => {
    const { auth = {data: {}}, responsive = {data: {}} } = state.httpData;
    return {auth, responsive};
};
//要什么方法，放到props里面,自动dispath
const mapDispatchToProps = (dispatch) => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);