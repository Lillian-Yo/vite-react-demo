import { SET_LOADING } from "../actions/actions";

/**
 * @name Loading 页面加载状态
 * @desc Redux reducer for changing the loading state of the app.
 * @param {boolean} state - The current loading state of the app.
 * @param {object} action - The action containing the new loading state.
 * @returns {boolean} - The new loading state of the app.
*/

const initState = {
    isLoading: false
};

function changeLoading(state = initState, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.flag
            }
        default:
            return { ...state };
    }
}

export default changeLoading