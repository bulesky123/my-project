import React,{Component} from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';

class Menu extends Component{
    constructor(){
        super();
    }
    componentDidMount(){

    }

    render(){
        return(
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="数据管理" second='模拟异常'/>
                <h2>模拟异常...</h2>
            </div>
        )
    }
}
export default Menu;