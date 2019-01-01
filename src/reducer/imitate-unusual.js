import type from '../constants/actionType';

const FetchImitateList = (state = {}, action) => {
    switch (action.type) {
        case type.FETCHIMITATE_DATA:
            return { ...state,imitateList:action.imitateList.sensorConfList,totalCount:action.imitateList.totalCount};
        default:
            return {...state};
    }
};
export default  FetchImitateList