import types from '../constants/actionType'
import config from '../axios/config';
import {post} from '../axios/tools';
import { message } from 'antd';

function queryAllSensorList(opts = {},callback) {
    return dispatch => {
        const api = config.BASEURL+'queryAllSensorList';
        post({url:api,data:opts}).then((res)=>{
         if(res&&res.status === '200'){
            dispatch(
                pushAllSensorList(res)
                )
            callback && callback(res.sensorList)
        }else{
            message.warn(res&&res.message)
        }
    })
    }
}

function queryKeySensorList(opts={}){
    return dispatch => {
        const api = config.BASEURL+'queryKeySensorList';
        post({url:api,data:opts}).then((res)=>{
           if(res&&res.status === '200'){
            dispatch(
                pushAllSensorList(res)
                )
        }else{
            message.warn(res&&res.message)
        }
    })
    } 
}

function queryMonitorDataSensorListInitial(opts={},callback){
    return dispatch => {
        const api = config.BASEURL+'queryMonitorDataSensorListInitial';
        post({url:api,data:opts}).then((res)=>{
         if(res&&res.status === '200'){
            dispatch(
                pushQueryMonitorData(res)
                )
            callback && callback(res.sensorList)
        }else{
            message.warn(res&&res.message)
        }
    })
    } 
}


function queryMonitorDataSensorFilter(opts={},callback){
    return dispatch => {
        const api = config.BASEURL+'queryMonitorDataSensorFilter';
        post({url:api,data:opts}).then((res)=>{
         if(res&&res.status === '200'){
            dispatch(
                pushQueryMonitorDataFilter(res)
                )
            callback && callback(res.sensorList)
        }else{
            message.warn(res&&res.message)
        }
    })
} 
}

function pushQueryMonitorDataFilter(QueryMonitorDataFilter) {
    return {
        type: types.FETCHQUERYMONITORFILTER,
        QueryMonitorDataFilter
    }
}


function pushQueryMonitorData(queryMonitorData) {
    return {
        type: types.FETCHQUERYMONITOR,
        queryMonitorData
    }
}



function pushAllSensorList(allSensorList) {
    return {
        type: types.FETCHAllSENSORLIST,
        allSensorList
    }
}

/*function pushQueryKeySensorList(queryKeySensorList) {
    return {
        type: types.FETCHQUERYSENSORLIST,
        queryKeySensorList
    }
}*/

export {
    queryAllSensorList,
    queryKeySensorList,
    queryMonitorDataSensorListInitial,
    queryMonitorDataSensorFilter
}