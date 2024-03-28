import { SET_LOADING } from "../actions/actions";

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