//多个reducers合并


import {combineReducers} from 'redux'
import httpData from './home'
import FetchList from './event-unusual'
import FetchImitateList from './imitate-unusual'
import FetchEventReportList from './event-report'
import FetchUnusualList from './unusual'
/*
 combineReducers() 所做的只是生成一个函数，这个函数来调用你的一系列 reducer，
 每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理，
 然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象。
 */
const rootReducer = combineReducers({
    httpData,
    FetchList,
    FetchImitateList,
    FetchEventReportList,
    FetchUnusualList,
});
export default rootReducer
