import React, { useState } from 'react';
import { Stage, Layer, Rect, Arrow } from 'react-konva';
import './Canvas.css';
import RodsData from '../../interfaces/RodsData';
import NodesData from '../../interfaces/NodesData';
import { Portal } from '@material-ui/core';

interface CanvasProps {
    dataRods: Array<RodsData>;
    zoomRate: number;
    dataNodes: Array<NodesData>;
}
interface Point {
    x: number;
    y: number;
}
const Canvas = (props: CanvasProps) => {
    const getZoom = (rods: Array<RodsData>) => {
        const rodsLen = rods.map((val) => val.L);
        const rate =
            Number(
                (
                    rodsLen.reduce((prev, cur) => prev + cur, 0) /
                    (window.screen.width - 100)
                ).toFixed(0)
            ) + 1;
        console.log(rate);
        return rate;
    };
    const rate = getZoom(props.dataRods);
    const widthWindow =
        (props.dataRods
            .map((val) => val.L)
            .reduce((prev, curr) => prev + curr, 0) *
            props.zoomRate) /
        rate;
    const heightWindow =
        ((props.dataRods
            .map((val) => val.A)
            .sort((a, b) => a - b)
            .pop() || 0) *
            5 *
            props.zoomRate) /
        rate;
    let accum = 50;
    const nodes: Array<Point> = [];

    return (
        <div className="top">
            <div> </div>
            <div className="field">
                <Stage width={widthWindow + 100} height={heightWindow + 5}>
                    <Layer>
                        {(props.dataRods || []).map((val, ind) => {
                            const ret = (
                                <Rect
                                    key={val.i}
                                    x={accum + 1}
                                    y={
                                        heightWindow / 2 -
                                        (val.A * 5 * props.zoomRate) /
                                            rate /
                                            2 +
                                        1
                                    }
                                    height={(val.A * 5 * props.zoomRate) / rate}
                                    width={(val.L * props.zoomRate) / rate}
                                    stroke="black"
                                />
                            );
                            nodes.push({ x: accum + 1, y: heightWindow / 2 });
                            if (ind === props.dataRods.length - 1) {
                                nodes.push({
                                    x:
                                        accum +
                                        1 +
                                        (val.L * props.zoomRate) / rate,
                                    y: heightWindow / 2,
                                });
                            }
                            accum += (val.L * props.zoomRate) / rate;
                            return ret;
                        })}
                    </Layer>
                    <Layer>
                        {(props.dataNodes || []).map((val) => {
                            const node = nodes[val.j - 1];
                            if (val.F > 0) {
                                return (
                                    <Arrow
                                        strokeWidth={
                                            (8 * props.zoomRate) / rate
                                        }
                                        fill="blue"
                                        stroke="blue"
                                        points={[
                                            node.x,
                                            node.y,
                                            node.x +
                                                (40 * props.zoomRate) / rate,
                                            node.y,
                                        ]}
                                    />
                                );
                            } else if (val.F < 0) {
                                return (
                                    <Arrow
                                        strokeWidth={
                                            (8 * props.zoomRate) / rate
                                        }
                                        fill="blue"
                                        stroke="blue"
                                        points={[
                                            node.x,
                                            node.y,
                                            node.x -
                                                (40 * props.zoomRate) / rate,
                                            node.y,
                                        ]}
                                    />
                                );
                            }
                        })}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

export default Canvas;
