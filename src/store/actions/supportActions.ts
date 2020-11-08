import updateLeft from '../actionCreators/updateLeft';
import updateRight from '../actionCreators/updateRight';
import updateSolution from '../actionCreators/updateSolution';
import store from '../store';

export const updateLeftSup = (value: boolean) => {

    store.dispatch(updateLeft(value));
    store.dispatch(updateSolution(null));
    
};
export const updateRightSup = (value: boolean) => {
    
    store.dispatch(updateRight(value));
    store.dispatch(updateSolution(null));
};
