import types from '../constants/actionType'
import config from '../axios/config';
import {post} from '../axios/tools';

function queryAllSensorList(opts = {},callback) {
    return dispatch => {
        const api = config.BASEURL+'queryAllSensorList';
        post({url:api,data:opts}).then((res)=>{
         if(res&&res.status === '200'){
            dispatch(
                pushAllSensorList(res)
                )
            callback && callback(res.sensorList)
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