import { UPDATE_LEFT_SUPPORT } from '../actions/types';

function updateLeft(value: boolean) {
    return {
        type: UPDATE_LEFT_SUPPORT,
        value: value,
    };
}
export default updateLeft;
