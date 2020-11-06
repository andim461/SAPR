import React, {useState} from 'react';
import Store from '../../interfaces/Store';
import processing from './processing';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
interface ProProps{
    state: Store
}
const Pro = (props: ProProps) => {
    let solve;
    const execute = () =>{
        solve = processing(props.state);
    }
    
    return (<Button onClick={execute}> Вычислить </Button>);
    
}
const mapStateToProps = (state: Store) => ({
    state: state,
});
export default connect(mapStateToProps)(Pro);