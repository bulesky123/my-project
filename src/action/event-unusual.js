import types from '../constants/actionType'
import config from '../axios/config';
import {post,get} from '../axios/tools';
import rows from '../api/event-unusual'

function fetchEventUnusual(opts = {}) {
    return dispatch => {
        //const api = config.BASEURL+'querySensorConfList';
        const api = config.LOGIN_URL
        get({url:api,data:opts}).then((res)=>{
             //if(res.status ==0){
                dispatch(
                pushUnusual(rows)
            )
                //}
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