import { UPDATE_SOLUTION } from '../actions/types';
import Solution from '../../interfaces/Solution';

function updateSolve(value: Solution | null) {
    return {
        type: UPDATE_SOLUTION,
        value: value,
    };
}
export default updateSolve;
