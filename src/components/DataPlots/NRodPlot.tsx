import React from 'react';
import Store from '../../interfaces/Store';
import SinglePlot from '../Plot/SinglePlot';
import { connect } from 'react-redux';
import { range } from 'lodash';
import Point from '../../interfaces/Point';

interface NRodProps {
    state: Store;
    index: number;
}
const NRodPlot = (props: NRodProps) => {
    const solution = props.state.solution;
    const len = props.state.rodsData[props.index].L;
    const Nx = solution?.N[props.index];
    const dataN: Point[] = [];
    if (Nx) {
        for (let i of range(0, len + 0.1, 0.1)) {
            const point: Point = {
                x: Number(i.toFixed(1)),
                y: Nx(i),
                y0: 0,
            };
            dataN.push(point);
        }
    }

    return (
        <div>
            <SinglePlot data={dataN} type="N" />
        </div>
    );
};

const mapStateToProps = (state: Store) => ({
    state: state,
});

export default connect(mapStateToProps)(NRodPlot);
