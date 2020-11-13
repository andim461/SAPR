import React from 'react';
import Store from '../../interfaces/Store';
import SinglePlot from '../Plot/SinglePlot';
import { connect } from 'react-redux';
import { range } from 'lodash';
import Point from '../../interfaces/Point';

interface URodProps {
    state: Store;
    index: number;
}
const URodPlot = (props: URodProps) => {
    const solution = props.state.solution;
    const len = props.state.rodsData[props.index].L;
    const Ux = solution?.U[props.index];
    const dataN: Point[] = [];
    if (Ux) {
        for (let i of range(0, len + 0.01, 0.01)) {
            const point: Point = {
                x: Number(i.toFixed(2)),
                y: Ux(i),
                y0: 0,
            };
            dataN.push(point);
        }
    }

    return (
        <div>
            <SinglePlot data={dataN} type="U" />
        </div>
    );
};

const mapStateToProps = (state: Store) => ({
    state: state,
});

export default connect(mapStateToProps)(URodPlot);
