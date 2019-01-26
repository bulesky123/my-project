import types from '../constants/actionType'
import config from '../axios/config';
import {post} from '../axios/tools';
import { message } from 'antd';

function fetchEnentReport(opts = {}) {
    return dispatch => {
        const api = config.BASEURL+'queryStatReport';
        post({url:api,data:opts}).then((res)=>{
         if(res&&res.status === '200'){
            dispatch(
                pushReport(res)
                )
        }else{
            message.warn(res&&res.message)
        }
    })
    }
}


function pushReport(eventReortList) {
    return {
        type: types.FETCHEVENTREPORT,
        eventReortList
    }
}
export default fetchEnentReport