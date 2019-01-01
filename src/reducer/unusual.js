import type from '../constants/actionType';

const FetchUnusualList = (state = {}, action) => {
    switch (action.type) {
        case type.FETCHUNUSUAL:
            return { ...state,UnusalData:action.Unusual.abnormalCaseList,totalCount:action.Unusual.totalCount};
        default:
            return {...state};
    }
};
export default  FetchUnusualList