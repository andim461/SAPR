import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import './Canvas.css';
import RodsData from '../../interfaces/RodsData';

interface CanvasProps {
    dataRods: Array<RodsData>;
}
const Canvas = (props: CanvasProps) => {
    return (
        <div className="field">
            {(props.dataRods || []).map((val, index) => (
                <Stage width={val.L + 1} height={val.A * 5 + 1}>
                    <Layer>
                        <Rect
                            x={0}
                            y={0}
                            height={val.A * 5}
                            width={val.L}
                            stroke="black"
                            closed
                        />
                    </Layer>
                </Stage>
            ))}
        </div>
    );
};

export default Canvas;
