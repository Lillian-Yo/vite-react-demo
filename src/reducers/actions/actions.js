/**
 * @name action type
*/

export const SET_LOADING = 'SET_LOADING';

/**
 * @name action fuction
*/

export const setLoading = (flag) => ({
    type: SET_LOADING,
    flag
})