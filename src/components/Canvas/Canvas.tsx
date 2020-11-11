import React, { useState } from 'react';
import { Stage, Layer, Rect, Arrow, Line } from 'react-konva';
import './Canvas.css';
import RodsData from '../../interfaces/RodsData';
import NodesData from '../../interfaces/NodesData';


interface CanvasProps {
    dataRods: Array<RodsData>;
    zoomRate: number;
    dataNodes: Array<NodesData>;
    leftSup: boolean;
    rightSup: boolean;
}
interface Point {
    x: number;
    y: number;
}
const Canvas = (props: CanvasProps) => {
    const rodsLen = props.dataRods.map((val) => val.L * 100);
    const getZoom = (rods: Array<number>) => {
        const rate =
            Number(
                (
                    rods.reduce((prev, cur) => prev + cur, 0) /
                    (window.screen.width - 100)
                ).toFixed(0)
            ) + 1;
        return rate;
    };
    const rate = getZoom(rodsLen);
    const widthWindow =
        (rodsLen
            .reduce((prev, curr) => prev + curr, 0) *
            props.zoomRate) /
        rate;
    const heightWindow =
        ((props.dataRods
            .map((val) => val.A)
            .sort((a, b) => a - b)
            .pop() || 0) *
            30 *
            props.zoomRate) /
        rate;
    let accum = 50;
    const nodes: Array<Point> = [];
    const leftSups = (y: number, height: number) => {
        const lines = [];
        for (let h = y; h <= y + height; h += 5) {
            lines.push(
                <Line points={[accum, h, accum - 20, h + 5]} stroke={'black'} />
            );
        }
        return lines;
    };
    const rightSups = (y: number, height: number) => {
        const lines = [];
        for (let h = y; h <= y + height; h += 5) {
            lines.push(
                <Line points={[accum, h, accum + 20, h + 5]} stroke={'black'} />
            );
        }
        return lines;
    };
    return (
        <div className="top">
            <div> </div>
            <div className="field">
                <Stage width={widthWindow + 100} height={heightWindow + 10}>
                    <Layer>
                        {props.leftSup && props.dataRods.length
                            ? leftSups(
                                  heightWindow / 2 -
                                      (props.dataRods[0].A *
                                          30 *
                                          props.zoomRate) /
                                          rate /
                                          2,
                                  (props.dataRods[0].A * 30 * props.zoomRate) /
                                      rate
                              )
                            : null}

                        {(props.dataRods || []).map((val, ind) => {
                            const arrows = [];
                            const length = (val.L * 100 * props.zoomRate) / rate;

                            if (val.q > 0) {
                                for (
                                    let x = accum + 1;
                                    x < accum + 1 + length;
                                    x += (40 * props.zoomRate) 
                                ) {
                                    const arrow = (
                                        <Arrow
                                            key={'arrow' + x}
                                            strokeWidth={
                                                (2 * props.zoomRate) 
                                            }
                                            stroke="red"
                                            fill="red"
                                            points={[
                                                x,
                                                heightWindow / 2,
                                                x +
                                                    (20 * props.zoomRate) ,
                                                heightWindow / 2,
                                            ]}
                                        />
                                    );
                                    arrows.push(arrow);
                                }
                            } else if (val.q < 0) {
                                for (
                                    let x = accum + 1;
                                    x < accum + 1 + length;
                                    x += (40 * props.zoomRate)
                                ) {
                                    const arrow = (
                                        <Arrow
                                            strokeWidth={
                                                (2 * props.zoomRate)
                                            }
                                            stroke="red"
                                            fill="red"
                                            points={[
                                                x +
                                                    (20 * props.zoomRate),
                                                heightWindow / 2,
                                                x,
                                                heightWindow / 2,
                                            ]}
                                        />
                                    );
                                    arrows.push(arrow);
                                }
                            }

                            const rect = (
                                <Rect
                                    key={'rect' + val.i}
                                    x={accum + 1}
                                    y={
                                        heightWindow / 2 -
                                        (val.A * 30 * props.zoomRate) /
                                            rate /
                                            2 +
                                        1
                                    }
                                    height={(val.A * 30 * props.zoomRate) / rate}
                                    width={length}
                                    stroke="black"
                                />
                            );
                            nodes.push({ x: accum + 1, y: heightWindow / 2 });
                            if (ind === props.dataRods.length - 1) {
                                nodes.push({
                                    x: accum + 1 + length,
                                    y: heightWindow / 2,
                                });
                            }
                            accum += length;
                            return [rect, ...arrows];
                        })}
                        {props.rightSup && props.dataRods.length
                            ? rightSups(
                                  heightWindow / 2 -
                                      (props.dataRods[props.dataRods.length - 1]
                                          .A *
                                          30 *
                                          props.zoomRate) /
                                          rate /
                                          2,
                                  (props.dataRods[props.dataRods.length  - 1].A *
                                      30 *
                                      props.zoomRate) /
                                      rate
                              )
                            : null}
                    </Layer>
                    <Layer>
                        {(props.dataNodes || []).map((val) => {
                            const node = nodes[val.j - 1];
                            if (val.F > 0) {
                                return (
                                    <Arrow
                                        strokeWidth={
                                            (8 * props.zoomRate)
                                        }
                                        opacity={0.6}
                                        fill="blue"
                                        stroke="blue"
                                        points={[
                                            node.x,
                                            node.y,
                                            node.x +
                                                (40 * props.zoomRate),
                                            node.y,
                                        ]}
                                    />
                                );
                            } else if (val.F < 0) {
                                return (
                                    <Arrow
                                        strokeWidth={
                                            (8 * props.zoomRate)
                                        }
                                        fill="blue"
                                        stroke="blue"
                                        opacity={0.6}
                                        points={[
                                            node.x,
                                            node.y,
                                            node.x -
                                                (40 * props.zoomRate),
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