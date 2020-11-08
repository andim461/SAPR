import updateRods from '../actionCreators/updateRods';
import updateNodes from '../actionCreators/updateNodes';
import { Dispatch } from 'redux';
import RodsData from '../../interfaces/RodsData';
import NodesData from '../../interfaces/NodesData';
import validRods from '../actionCreators/validRods';
import validNodes from '../actionCreators/validNodes';
import store from '../store';
import updateSolution from '../actionCreators/updateSolution';
import { range, isEqual, sortBy } from 'lodash';

export const updateDataRods = (data: Array<RodsData>) => (
    dispatch: Dispatch<any>
): void => {
    data = sortBy(data, ({ i }) => i);
    dispatch(updateRods(data));

    const sortedIndexes = data.map(({ i }) => i);
    const isGood = isEqual(sortedIndexes, range(1, data.length + 1));

    dispatch(validRods(isGood));
    const nodes = store.getState().nodesData;
    const lastNode = nodes[nodes.length - 1];
    if (lastNode) {
        const isGood = store.getState().rodsData.length + 1 >= lastNode.j && store.getState().rodsData.length !== 0;
        dispatch(validNodes(isGood));
    }
    else{
        dispatch(validNodes(true));
    }
    dispatch(updateSolution(null));
};
export const updateDataNodes = (data: Array<NodesData>) => (
    dispatch: Dispatch<any>
): void => {
    data = sortBy(data, ({ j }) => j);
    dispatch(updateNodes(data));

    // const sortedIndexes = data.map(({j}) => j);
    //const isGood = (new Set(sortedIndexes).size === sortedIndexes.length);
    const lastNode = data[data.length - 1];
    if (lastNode) {
        const isGood = store.getState().rodsData.length + 1 >= lastNode.j && store.getState().rodsData.length !== 0;
        dispatch(validNodes(isGood));
    }
    else{
        dispatch(validNodes(true));
    }
    dispatch(updateSolution(null));
    
};
