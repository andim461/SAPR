import updateRods from '../actionCreators/updateRods';
import { Dispatch } from 'redux';
import RodsData from '../../interfaces/RodsData';
import updateQuality from '../actionCreators/updateQuality';
import { range, isEqual, sortBy } from 'lodash';

export const updateDataRods = (data: Array<RodsData>) => (
    dispatch: Dispatch<any>
): void => {
    data = sortBy(data, ({ i }) => i);
    dispatch(updateRods(data));

    const sortedIndexes = data.map(({ i }) => i);
    const isGood = isEqual(sortedIndexes, range(1, data.length + 1));

    dispatch(updateQuality(isGood));
};
