import { ACCOUNT_LOAD_SUCCESS, ACCOUNT_LOAD_FAIL, SET_AUTH, REMOVE_AUTH } from '../contexts/constants';

export const authReducer = (state, action) => {
    const {
        type,
        payload,
    } = action;
    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                isAuthenticated: payload.isAuthenticated,
                user: payload.user,
                userId: payload.userId,
                username: payload.username
            };
        case REMOVE_AUTH: {
            return {
                isAuthenticated: payload.isAuthenticated,
                user: payload.user
            }
        }
        case ACCOUNT_LOAD_SUCCESS:
            return { ...state, accounts: payload }
        case ACCOUNT_LOAD_FAIL:
            return { ...state, accounts: [] }
        default:
            return state;
    }
};