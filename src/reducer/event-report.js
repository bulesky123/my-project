import type from '../constants/actionType';

const FetchEventReportList = (state = {}, action) => {
    switch (action.type) {
        case type.FETCHEVENTREPORT:
            return { ...state,eventReportList:action.eventReortList.reportList,totalCount:action.eventReortList.totalCount};
        default:
            return {...state};
    }
};
export default  FetchEventReportList