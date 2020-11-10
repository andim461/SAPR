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
    type: 'N' | 'U' | 'S';
}
const Plot = (props: PlotProps) => {
    const [crosshairValues, setCrosshair] = useState<Point | null>(null);
    const onMouseLeave = () => {
        setCrosshair(null);
    };

    const setNearest = (value: any, { index }: any) => {
        //setCrosshair(props.data.map((val, ind) => val[index]));
        setCrosshair(props.data[index]);
    };
    const itemsFormat = (data: Point[]) => {
        return data.map((val) => ({ title: 'y', value: val.y }));
    };
    return (
        <XYPlot onMouseLeave={onMouseLeave} width={300} height={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            {/* {props.data.map((val) => (
                <AreaSeries
                    opacity={0.5}
                    fill="#757272"
                    onNearestX={setNearestX}
                    data={val}
                />
            ))} */}
            {props.type === 'N' || props.type === 'S' ? (
                <AreaSeries
                    opacity={0.5}
                    fill="#757272"
                    onNearestXY={setNearest}
                    data={props.data}
                />
            ) : (
                <AreaSeries
                    opacity={0.5}
                    fill="#757272"
                    onNearestX={setNearest}
                    data={props.data}
                />
            )}

            <Crosshair
                itemsFormat={itemsFormat}
                values={[crosshairValues]}
            ></Crosshair>
        </XYPlot>
    );
};

export default Plot;
