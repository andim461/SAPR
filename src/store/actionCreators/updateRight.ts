import { UPDATE_RIGHT_SUPPORT } from '../actions/types';

function updateRight(value: boolean) {
    return {
        type: UPDATE_RIGHT_SUPPORT,
        value: value,
    };
}
export default updateRight;
