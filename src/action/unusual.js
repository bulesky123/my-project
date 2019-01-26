import types from '../constants/actionType'
import config from '../axios/config';
import {post} from '../axios/tools';
import { message } from 'antd';

function fetchUnusual(opts = {}) {
    return dispatch => {
        const api = config.BASEURL+'queryAbnormalCaseList';
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


function pushUnusual(Unusual) {
    return {
        type: types.FETCHUNUSUAL,
        Unusual
    }
}
export default fetchUnusual