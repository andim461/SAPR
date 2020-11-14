import React from 'react';
import Store from '../../interfaces/Store';
import SinglePlot from '../Plot/SinglePlot';
import { connect } from 'react-redux';
import { range } from 'lodash';
import Point from '../../interfaces/Point';

interface SRodProps {
    state: Store;
    index: number;
}
const SRodPlot = (props: SRodProps) => {
    const solution = props.state.solution;
    const len = props.state.rodsData[props.index].L;
    const Sx = solution?.S[props.index];
    const dataN: Point[] = [];
    if (Sx) {
        for (let i of range(0, len + 0.1, 0.1)) {
            const point: Point = {
                x: Number(i.toFixed(1)),
                y: Sx(i),
                y0: 0,
            };
            dataN.push(point);
        }
    }

    return (
        <div>
            <SinglePlot data={dataN} type="S" />
        </div>
    );
};

const mapStateToProps = (state: Store) => ({
    state: state,
});

export default connect(mapStateToProps)(SRodPlot);
