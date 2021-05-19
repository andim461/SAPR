import dispatch from '../dispatcher';

export const updateLeftSup = (value: boolean) => {
    dispatch.updateLeft(value);
    dispatch.updateSolution(null);
};
export const updateRightSup = (value: boolean) => {
    dispatch.updateRight(value);
    dispatch.updateSolution(null);
};
