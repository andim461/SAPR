import { UPDATE_STATE } from '../actions/types';
import Store from '../../interfaces/Store';

function updateState(value: Store) {
    return {
        type: UPDATE_STATE,
        value: value,
    };
}
export default updateState;
