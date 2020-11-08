import RodsData from './RodsData';
import NodesData from './NodesData';
import Solution from './Solution';
interface Store {
    rodsData: Array<RodsData>;
    nodesData: Array<NodesData>;
    isRodsValid: boolean;
    isNodesValid: boolean;
    leftSupport: boolean; 
    rightSupport: boolean;
    solution: Solution | null;
}

export default Store;
