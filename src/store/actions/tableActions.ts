import RodsData from '../../interfaces/RodsData';
import NodesData from '../../interfaces/NodesData';
import store from '../store';
import { range, isEqual, sortBy } from 'lodash';
import dispatch from '../dispatcher';

export const updateDataRods = (data: Array<RodsData>) => {
    data = sortBy(data, ({ i }) => i);
    dispatch.updateRods(data);

    const sortedIndexes = data.map(({ i }) => i);
    const isGood = isEqual(sortedIndexes, range(1, data.length + 1));

    dispatch.validRods(isGood);
    const nodes = store.getState().nodesData;
    const lastNode = nodes[nodes.length - 1];
    if (lastNode) {
        const isGood =
            store.getState().rodsData.length + 1 >= lastNode.j &&
            store.getState().rodsData.length !== 0;
        dispatch.validNodes(isGood);
    } else {
        dispatch.validNodes(true);
    }
    dispatch.updateSolution(null);
};
export const updateDataNodes = (data: Array<NodesData>) => {
    data = sortBy(data, ({ j }) => j);
    dispatch.updateNodes(data);

    const lastNode = data[data.length - 1];
    if (lastNode) {
        const isGood =
            store.getState().rodsData.length + 1 >= lastNode.j &&
            store.getState().rodsData.length !== 0;
        dispatch.validNodes(isGood);
    } else {
        dispatch.validNodes(true);
    }
    dispatch.updateSolution(null);
};
