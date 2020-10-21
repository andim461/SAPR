import React, {useState} from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import './Canvas.css';
import RodsData from '../../interfaces/RodsData';

interface CanvasProps {
    dataRods: Array<RodsData>;
    zoomRate: number;
}
const Canvas = (props: CanvasProps) => {
    const getZoom = (rods: Array<RodsData>) => {
        const rodsLen = rods.map((val) => val.L);
        const rate = rodsLen.reduce((prev, cur)=> prev+cur ,0) / (window.screen.width - 100) + 1;
        console.log(rate);
        return rate;   
    };
    const rate = (getZoom(props.dataRods));
    return (
        <div>
        <div> </div>
        <div className="field">
            {(props.dataRods || []).map((val, index) => (
                <Stage width={(val.L) * props.zoomRate / rate + 1} height={(val.A * 5 ) * props.zoomRate / rate + 1}>
                    <Layer>
                        <Rect
                            x={0}
                            y={0}
                            height={(val.A * 5) * props.zoomRate / rate}
                            width={val.L * props.zoomRate / rate}
                            stroke="black"
                            closed
                        />
                    </Layer>
                </Stage>
            ))}
        </div>
        </div>
    );
};

export default Canvas;
