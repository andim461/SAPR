import updateState from '../actionCreators/updateState';

import { Dispatch } from 'redux';

export const uploadFileProject = (fd: FormData) => (
    dispatch: Dispatch<any>
): void => {
    fetch('/upload', {
        method: 'POST',
        body: fd,
    }).then((res) => {
        res.json().then(myresponse => {
            console.log(myresponse.state);
            
            dispatch(updateState(JSON.parse(myresponse.state)));
            
        
        });
        
    });
};
