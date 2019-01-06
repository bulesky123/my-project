import types from '../constants/actionType'
import config from '../axios/config';
import {post} from '../axios/tools';

function fetchImitateUnusual(opts = {}) {
    return dispatch => {
        const api = config.BASEURL+'queryAbnormalConfList';
        post({url:api,data:opts}).then((res)=>{
         if(res.status === '200'){
            dispatch(
                pushUnusual(res)
                )
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