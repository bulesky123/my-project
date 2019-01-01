import types from '../constants/actionType'
import config from '../axios/config';
import {post} from '../axios/tools';

function fetchImitateUnusual(opts = {}) {
    return dispatch => {
        const api = config.BASEURL+'queryAbnormalConfList';
        post({url:api,data:opts}).then((res)=>{
         if(res.status === '200'){
            res = res.sensorConfList.length || {"sensorConfList":[{"abnormal_a1":"30%","abnormal_a2":"20%","abnormal_a3":"10%","abnormal_b1":"30%","abnormal_b2":"20%","abnormal_b3":"10%","create_time":"2018-12-31 16:06:40","dev_id":"d010","extend_info":null,"from_id":"s001_002_08","function_id":"f009","id":3,"logic_position":"102","mean_val":10.0,"mse_val":5.0,"operator":null,"sensor_id":"s001_002_08","sensor_name":"zhoufei","sensor_type":"\u6e29\u5ea6","smooth_m":4.0,"smooth_n":5.0,"space_cordinate_x":"12","space_cordinate_y":"23","space_cordinate_z":"34","time_scope":"30min","to_id":"s001_002_01","update_time":null},{"abnormal_a1":"234","abnormal_a2":"33","abnormal_a3":"3","abnormal_b1":"2","abnormal_b2":"2","abnormal_b3":"222","create_time":"2018-12-31 16:41:03","dev_id":"wer","extend_info":null,"from_id":"234","function_id":"222","id":4,"logic_position":"22","mean_val":123.0,"mse_val":12.3,"operator":null,"sensor_id":"eee","sensor_name":"zhoufei111","sensor_type":"\u6e29\u5ea6","smooth_m":2.0,"smooth_n":23.0,"space_cordinate_x":"12","space_cordinate_y":"34","space_cordinate_z":"156","time_scope":"24h","to_id":" www","update_time":null}],"status":"200","totalCount":2}

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