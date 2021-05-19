import processing from '../../math/processing';
import store from '../store';
import dispatch from '../dispatcher';

export const solve = () => {
    const solution = processing(store.getState());
    dispatch.updateSolution(solution);
};
