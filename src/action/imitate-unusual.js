import types from '../constants/actionType'
import config from '../axios/config';
import {post} from '../axios/tools';
import { message } from 'antd';

function fetchImitateUnusual(opts = {}) {
    return dispatch => {
        const api = config.BASEURL+'queryAbnormalConfList';
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


function pushUnusual(imitateList) {
    return {
        type: types.FETCHIMITATE_DATA,
        imitateList
    }
}
export default fetchImitateUnusual