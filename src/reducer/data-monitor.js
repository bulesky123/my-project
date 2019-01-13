import type from '../constants/actionType';

const FetchSensorList = (state = {}, action) => {
    switch (action.type) {
        case type.FETCHAllSENSORLIST:
            return { ...state,sensorList:action.allSensorList.sensorList,totalCount:action.allSensorList.totalCount};
/*            case type.FETCHQUERYSENSORLIST:
            return { ...state,sensorList:action.queryKeySensorList.sensorList,totalCount:action.queryKeySensorList.totalCount};*/
        case type.FETCHQUERYMONITOR:
            return { ...state,dataSensorListInitial:action.queryMonitorData.sensorList.data,alarm_level:action.queryMonitorData.sensorList.alarm_level,totalCount:action.queryMonitorData.totalCount};
               case type.FETCHQUERYMONITORFILTER:
            return { ...state,QueryMonitorDataFilter:action.QueryMonitorDataFilter.sensorList,totalCount:action.QueryMonitorDataFilter.totalCount};
        default:
            return {...state};
    }
};
export default  FetchSensorList