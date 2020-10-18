import { VALID_RODS } from '../actions/types';

function validRods(isGood: boolean) {
    return {
        type: VALID_RODS,
        value: isGood,
    };
}
export default validRods;
