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
    const [crosshair, setCrosshair] = useState<Point | null>(null);
    const onMouseLeave = ()=>{
        setCrosshair(null);
    }
    const onNearestX = (value: any, {index}: any) => {
        setCrosshair(props.data[index]);
    };
    const valueFormat = (list: Point[]) =>{
        return {title: props.type + '(x)', value: list[0].y};
    };
    return (
        <XYPlot onMouseLeave={onMouseLeave} width={500} height={230}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="X" />
            <YAxis title={titleY} />
            <AreaSeries onNearestX={onNearestX} opacity={0.7} data={props.data} />
            <Crosshair valueFormat={valueFormat} values={[crosshair]} />
        </XYPlot>
    );
};

export default SinglePlot;
