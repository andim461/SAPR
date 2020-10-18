import {UPDATE_RODS, UPDATE_DATA_QUALITY} from '../actions/types';
import Store from '../../interfaces/Store';
import initialState from '../initialState';

export default function (state = initialState, action: any): Store{
    
    switch(action.type){
        case UPDATE_RODS: return {...state, rodsData: action.value};
        case UPDATE_DATA_QUALITY: return {...state, isDataGood: action.value};
        default: return state;
    }
};