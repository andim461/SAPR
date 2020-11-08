import updateSolution from '../actionCreators/updateSolution';
import Solution from '../../interfaces/Solution';
import processing from '../../math/processing';
import store from '../store';

export const solve = () => {
    const solution =  processing(store.getState());
    store.dispatch(updateSolution(solution));
    console.log(solution);
};


