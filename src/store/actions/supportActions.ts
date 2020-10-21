import updateLeft from '../actionCreators/updateLeft';
import updateRight from '../actionCreators/updateRight';
import store from '../store';

export const updateLeftSup = (value: boolean) => {

    store.dispatch(updateLeft(value));
};
export const updateRightSup = (value: boolean) => {
    
    store.dispatch(updateRight(value));
};
