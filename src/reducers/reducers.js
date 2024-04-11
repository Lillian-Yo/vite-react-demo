import { combineReducers } from "redux";

import loading from './module/loading';

/**
 * @name Reducer
 * type {Object}
 * @memberof Reducers
 * @desc The reducer that is the entry point for the application state.
 * It is a combination of all the reducers for each individual module.
*/

const reducers = combineReducers({
    loading
});

export default reducers