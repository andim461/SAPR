import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    AreaSeries,
} from 'react-vis';
import 'react-vis/dist/style.css';
import Point from '../../interfaces/Point';
interface PlotProps {
    data: Point[][];
    type: 'N' | 'U';
}
const Plot = (props: PlotProps) => {
    const titleY = props.type + ' (x)';

    return (
        <XYPlot width={800} height={200}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="X" />
            <YAxis title={titleY} />

            {props.data.map((val) => (
                <AreaSeries opacity={0.7} data={val} />
            ))}
        </XYPlot>
    );
};

export default Plot;
