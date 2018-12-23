import type from '../constants/actionType';

const FetchList = (state = {}, action) => {
    switch (action.type) {
        case type.USERENCRYPT:
            return { ...state,eventList:action.eventList};
        default:
            return {...state};
    }
};
export default  FetchList