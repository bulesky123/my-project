import types from '../constants/actionType'
import config from '../axios/config';
import {post,get} from '../axios/tools';
import { message } from 'antd';

function fetchEventUnusual(opts = {}) {
    return dispatch => {
        const api = config.BASEURL+'querySensorConfList';
        post({url:api,data:opts}).then((res)=>{
         if(res&&res.status === '200'){
            dispatch(
                pushUnusual(res)
                )
        }else{
            message.warn(res&&res.message)
        }
    })
    }
}

function fetchQueryAbnormalSensorIdInfoo(opts = {},callback) {
    return dispatch => {
        const api = config.BASEURL+'queryAbnormalSensorIdInfo';
        post({url:api,data:opts}).then((res)=>{
         if(res&&res.status === '200'){
            callback&&callback(res.sensorInfo)
        }else{
            message.warn(res&&res.message)
        }
    })
    }
}

function fetchQuerySensorTypeList(opts = {},callback) {
    return dispatch => {
        const api = config.BASEURL+'querySensorTypeList';
        post({url:api,data:opts}).then((res)=>{
         if(res&&res.status === '200'){
            dispatch(
                pushSensorType(res)
                )
            callback&&callback(res)
        }else{
            message.warn(res&&res.message)
        }
    })
    }
}

function pushUnusual(eventList) {
    return {
        type: types.USERENCRYPT,
        eventList
    }
}

function pushSensorType(SensorType) {
    return {
        type: types.SENSORTYPE,
        SensorType
    }
}
export {
    fetchEventUnusual,
    fetchQueryAbnormalSensorIdInfoo,
    fetchQuerySensorTypeList,
} 