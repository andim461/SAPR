import { UPDATE_NODES } from '../actions/types';
import NodesData from '../../interfaces/NodesData';

function updateRods(value: Array<NodesData>) {
    return {
        type: UPDATE_NODES,
        value: value,
    };
}
export default updateRods;
