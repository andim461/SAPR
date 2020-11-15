import Store from '../interfaces/Store';
import { range } from 'lodash';
import gaussJordan from './gaussJordan';
import Solution from '../interfaces/Solution';

const calc = (store: Store): Solution => {
    const rodsData = store.rodsData;
    const nodesData = store.nodesData;
    const left = store.leftSupport;
    const right = store.rightSupport;

    const rods = rodsData.map((val) => [val.E, val.A, val.L]);
    console.log(`rods: ${rods}`);

    const nodesLoads = [];
    for (let i = 0; i < rodsData.length + 1; i++) {
        const loadsSum = nodesData
            .filter((val) => val.j === i + 1)
            .map((val) => val.F)
            .reduce((prev, curr) => prev + curr, 0);
        nodesLoads.push(loadsSum);
    }
    console.log(`nodesLoads: ${nodesLoads}`);

    const rodsLoads = rodsData.map((val) => val.q);
    console.log(`rodsLoads: ${rodsLoads}`);

    const matrixA: Array<Array<number>> = [];
    for (let i = 0; i < rods.length + 1; i++) {
        const append = [];
        for (let j = 0; j < rods.length + 1; j++) {
            append.push(0);
        }
        matrixA.push(append);
    }

    const minors: Array<Array<Array<number>>> = [];

    rods.forEach((rod) => {
        let tempMinor = [];
        for (let i = 0; i < 2; i++) {
            tempMinor.push([0, 0]);
        }
        tempMinor = tempMinor.map((val, ind) =>
            val.map(() => (rod[0] * rod[1]) / rod[2])
        );
        tempMinor[0][1] *= -1;
        tempMinor[1][0] *= -1;
        minors.push(tempMinor);
    });
    console.log('minors:');
    minors.forEach((val) => console.log(val));

    minors.forEach((val, ind) => {
        for (let i of range(ind, ind + 2)) {
            for (let k of range(ind, ind + 2)) {
                if (i === k) {
                    if (i === 0 || i === matrixA.length - 1) {
                        matrixA[i][k] = val[i - ind][k - ind];
                    } else {
                        matrixA[i][k] += val[i - ind][k - ind];
                    }
                } else {
                    matrixA[i][k] = val[i - ind][k - ind];
                }
            }
        }
    });
    console.log(`matrixA(without support): ${matrixA}`);

    if (left) {
        for (let i = 0; i < matrixA.length; i++) {
            for (let k = 0; k < matrixA.length; k++) {
                if (i !== k && (i === 0 || k === 0)) {
                    matrixA[i][k] = 0;
                }
            }
        }
    }
    if (right) {
        for (let i = 0; i < matrixA.length; i++) {
            for (let k = 0; k < matrixA.length; k++) {
                if (
                    i !== k &&
                    (i === matrixA.length - 1 || k === matrixA.length - 1)
                ) {
                    matrixA[i][k] = 0;
                }
            }
        }
    }
    console.log(`matrixA: `);
    matrixA.forEach((val) => console.log(val));

    const vectorB = [];

    for (let i of range(0, matrixA.length)) {
        if ((left && i === 0) || (right && i === matrixA.length - 1)) {
            vectorB.push(0);
        } else if (i !== 0 && i !== matrixA.length - 1) {
            vectorB.push(
                nodesLoads[i] +
                    rodsLoads[i] * (rods[i][2] / 2) +
                    rodsLoads[i - 1] * (rods[i - 1][2] / 2)
            );
        } else if (i === 0) {
            vectorB.push(nodesLoads[i] + rodsLoads[i] * (rods[i][2] / 2));
        } else if (i === matrixA.length - 1) {
            vectorB.push(
                nodesLoads[i] + rodsLoads[i - 1] * (rods[i - 1][2] / 2)
            );
        }
    }
    console.log(`b: ${vectorB}`);

    const deltas = gaussJordan(matrixA, vectorB).map((val) =>
        Number(val.toFixed(14))
    );

    console.log(`deltas: ${deltas}`);

    const U: Array<(x: number) => number> = [];
    rods.forEach((val, ind) => {
        const Ux = (x: number) =>
            Number(
                (
                    deltas[ind] +
                    (x / val[2]) * (deltas[ind + 1] - deltas[ind]) +
                    ((rodsLoads[ind] * val[2] * val[2]) /
                        (2 * val[0] * val[1])) *
                        (x / val[2]) *
                        (1 - x / val[2])
                ).toFixed(12)
            );
        U.push(Ux);
    });


    const N: Array<(x: number) => number> = [];
    const S: Array<(x: number) => number> = [];
    rods.forEach((val, ind) => {
        const Nx = (x: number) =>
            Number(
                (
                    ((val[0] * val[1]) / val[2]) *
                        (deltas[ind + 1] - deltas[ind]) +
                    ((rodsLoads[ind] * val[2]) / 2) * (1 - 2 * (x / val[2]))
                ).toFixed(12)
            );
        N.push(Nx);
        S.push((x: number) => Nx(x) / val[1]);
    });

    const solution: Solution = {
        U: U,
        N: N,
        S: S,
    };

    console.log('Solution: ');
    rods.forEach((val, ind) => {
        
        console.log(`N${ind + 1}(0) = ${solution.N[ind](0)}`);
        console.log(`U${ind + 1}(0) = ${solution.U[ind](0)}`);
        console.log(`S${ind + 1}(0) = ${solution.S[ind](0)}`);
        
        console.log(`N${ind + 1}(${val[2]}) = ${solution.N[ind](val[2])}`);
        console.log(`U${ind + 1}(${val[2]}) = ${solution.U[ind](val[2])}`);
        console.log(`S${ind + 1}(${val[2]}) = ${solution.S[ind](val[2])}`);
    });
    return solution;
};
export default calc;
