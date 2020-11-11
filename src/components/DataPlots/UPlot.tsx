import React from 'react';
import Store from '../../interfaces/Store';
import Plot from '../Plot/Plot';
import { connect } from 'react-redux';
import { range } from 'lodash';
import Point from '../../interfaces/Point';


interface PostProps {
    state: Store;
}
const UPlot = (props: PostProps) => {
    const rodsLength = props.state.rodsData.map((val) => val.L);
    const solution = props.state.solution;
    const dataU: Point[] = [];
    if (solution) {
        let sumLen = 0;
        rodsLength.forEach((val, ind) => {
            const points: Point[] = [];
            for (let i of range(0, val + 1, 0.1)) {
                const point: Point = {
                    x: i + sumLen,
                    y: solution.U[ind](i),
                    y0: 0,
                };
                dataU.push(point);
                // points.push(point);
            }
            //dataN.push(points);
            sumLen += val;
        });
    }

    return (
        <div>
            
                <div>
                    <Plot data={dataU} type='U' />
                </div>
        
        </div>
    );
};

const mapStateToProps = (state: Store) => ({
    state: state,
});

export default connect(mapStateToProps)(UPlot);
