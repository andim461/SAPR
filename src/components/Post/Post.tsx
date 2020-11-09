import React from 'react';
import Store from '../../interfaces/Store';
import Plot from '../Plot/Plot';
import { connect } from 'react-redux';
import { range } from 'lodash';
import Point from '../../interfaces/Point';
import Typography from '@material-ui/core/Typography';

interface PostProps {
    state: Store;
}
const Post = (props: PostProps) => {
    const rodsLength = props.state.rodsData.map((val) => val.L);
    const solution = props.state.solution;
    const dataN: Point[] = [];
    if (solution) {
        let sumLen = 0;
        rodsLength.forEach((val, ind) => {
            const points: Point[] = [];
            for (let i of range(0, val)) {
                const point: Point = {
                    x: i + sumLen,
                    y: solution.N[ind](i),
                    y0: 0,
                };
                dataN.push(point);
                // points.push(point);
            }
            //dataN.push(points);
            sumLen += val;
        });
    }

    return (
        <div>
            {solution ? (
                <div>
                    <Plot data={dataN} />
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
