import { GROCERY_LOAD_SUCCESS, GROCERY_LOAD_FAIL } from '../contexts/constants';
export const partnerReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case GROCERY_LOAD_SUCCESS: {
            return {
                ...state, groceries: payload
            }
        }
        case GROCERY_LOAD_FAIL: {
            return {
                ...state, grocery: []
            }
        }
        case 'UNACCEPTED_LOAD_SUCCESS':
            return {
                ...state, unaccepted: payload
            }
        case 'UNACCEPTED_LOAD_FAIL':
            return {
                ...state, unaccepted: []
            }
        case 'ACCEPTED_LOAD_SUCCESS':
            return {
                ...state, accepted: payload
            }
        case 'ACCEPTED_LOAD_FAIL':
            return {
                ...state, accepted: []
            }
        case 'SHIPPER_LOAD_SUCCESS':
            return {
                ...state, shippers: payload
            }
        case 'SHIPPER_LOAD_FAIL':
            return {
                ...state, shippers: []
            }
        default:
            return state;
    }
}