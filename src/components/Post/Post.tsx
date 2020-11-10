import React from 'react';
import Store from '../../interfaces/Store';
import NPlot from '../DataPlots/NPlot';
import UPlot from '../DataPlots/UPlot';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import './Post.css';

interface PostProps {
    state: Store;
}
const Post = (props: PostProps) => {
    const solution = props.state.solution;

    return (
        <div>
            {solution ? (
                <div className='plotsField'>
                    <NPlot />
                    <UPlot />
                </div>
            ) : (
                <Typography align="center" color="textPrimary">
                    Необходимо произвести расчет в процессоре
                </Typography>
            )}
        </div>
    );
};

const mapStateToProps = (state: Store) => ({
    state: state,
});

export default connect(mapStateToProps)(Post);
