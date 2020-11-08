import Store from '../interfaces/Store';

const initState: Store = {
    rodsData: [],
    nodesData: [],
    isRodsValid: true,
    isNodesValid: true,
    leftSupport: false,
    rightSupport: false,
    solution: null,
};

export default initState;
