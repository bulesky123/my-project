import types from '../constants/actionType'
import config from '../axios/config';
import {post,get} from '../axios/tools';
import rows from '../api/event-unusual'

function fetchEventUnusual(opts = {}) {
    return dispatch => {
        const api = config.BASEURL+'querySensorConfList';
        post({url:api,data:opts}).then((res)=>{
         if(res.status === '200'){
            dispatch(
                pushUnusual(res)
                )
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