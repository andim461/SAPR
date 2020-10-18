import { VALID_NODES } from '../actions/types';

function validNodes(isGood: boolean) {
    return {
        type: VALID_NODES,
        value: isGood,
    };
}
export default validNodes;
