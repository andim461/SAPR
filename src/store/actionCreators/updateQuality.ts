import { UPDATE_DATA_QUALITY } from '../actions/types';

function updateQuality(isGood: boolean) {
    return {
        type: UPDATE_DATA_QUALITY,
        value: isGood,
    };
}
export default updateQuality;
