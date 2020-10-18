import {UPDATE_RODS} from '../actions/types';
import RodsData from '../../interfaces/RodsData';

function updateRods(value:Array<RodsData>){
    return {
        type: UPDATE_RODS,
        value: value,
    };
}
export default updateRods;

