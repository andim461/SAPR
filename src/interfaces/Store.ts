import RodsData from './RodsData';
import NodesData from './NodesData';
interface Store {
    rodsData: Array<RodsData>;
    nodesData: Array <NodesData>,
    isRodsValid: boolean;
    isNodesValid: boolean;
}

export default Store;
