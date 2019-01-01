import types from '../constants/actionType'
import config from '../axios/config';
import {post} from '../axios/tools';

function fetchEnentReport(opts = {}) {
    return dispatch => {
        const api = config.BASEURL+'queryStatReport';
        post({url:api,data:opts}).then((res)=>{
         if(res&&res.status === '200'){
            dispatch(
                pushReport(res)
                )
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