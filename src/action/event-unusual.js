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


function pushUnusual(eventList) {
    return {
        type: types.USERENCRYPT,
        eventList
    }
}
export default fetchEventUnusual