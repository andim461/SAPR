import React, { useState } from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    AreaSeries,
    Crosshair,
    LineSeries,
} from 'react-vis';
import 'react-vis/dist/style.css';
import Point from '../../interfaces/Point';
interface PlotProps {
    data: Point[];
    type: 'N' | 'U';
}
const SinglePlot = (props: PlotProps) => {
    const titleY = props.type + ' (x)';

    return (
        <XYPlot width={500} height={230}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="X" />
            <YAxis title={titleY} />
            <AreaSeries opacity={0.7} data={props.data} />
        </XYPlot>
    );
};

export default SinglePlot;
