import {
    UPDATE_RODS,
    VALID_NODES,
    VALID_RODS,
    UPDATE_NODES,
    UPDATE_LEFT_SUPPORT,
    UPDATE_RIGHT_SUPPORT,
    UPDATE_STATE,
} from '../actions/types';
import Store from '../../interfaces/Store';
import initialState from '../initialState';

export default function (state = initialState, action: any): Store {
    switch (action.type) {
        case UPDATE_RODS:
            return { ...state, rodsData: action.value };
        case UPDATE_NODES:
            return { ...state, nodesData: action.value };
        case VALID_RODS:
            return { ...state, isRodsValid: action.value };
        case VALID_NODES:
            return { ...state, isNodesValid: action.value };
        case UPDATE_LEFT_SUPPORT:
            return { ...state, leftSupport: action.value };
        case UPDATE_RIGHT_SUPPORT:
            return { ...state, rightSupport: action.value };
        case UPDATE_STATE:
            return {...state, ...action.value};
        default:
            return state;
    }
}
