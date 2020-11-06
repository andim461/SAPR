/**
 * Return solve of SLAU
 *
 * @param {Array<Array<number>>} matrix
 * @param {Array<number>} solve
 */
const gaussJordan = (
    matrix: Array<Array<number>>,
    solve: Array<number>
): Array<number> => {
    const matr = matrix.map((val) => val.map((val) => val));

    const n = matr.length;
    const matrixBig = [];

    for (let i = 0; i < n; i++) {
        const arr = [];
        for (let k = 0; k <= n; k++) {
            arr.push(0);
        }
        matrixBig.push(arr);
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrixBig[i][j] = matr[i][j];
        }
        matrixBig[i][n] = solve[i];
    }

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n + 1; i++)
            matrixBig[k][i] = matrixBig[k][i] / matr[k][k];

        for (let i = k + 1; i < n; i++) {
            let K = matrixBig[i][k] / matrixBig[k][k];

            for (let j = 0; j < n + 1; j++)
                matrixBig[i][j] = matrixBig[i][j] - matrixBig[k][j] * K;
        }

        for (let i = 0; i < n; i++)
            for (let j = 0; j < n; j++) matr[i][j] = matrixBig[i][j];
    }

    for (let k = n - 1; k > -1; k--) {
        for (let i = n; i > -1; i--)
            matrixBig[k][i] = matrixBig[k][i] / matr[k][k];

        for (let i = k - 1; i > -1; i--) {
            let K = matrixBig[i][k] / matrixBig[k][k];

            for (let j = n; j > -1; j--)
                matrixBig[i][j] = matrixBig[i][j] - matrixBig[k][j] * K;
        }
    }
    const solvetion = [];
    for (let i = 0; i < solve.length; i++) {
        solvetion.push(matrixBig[i][solve.length]);
    }
    return solvetion;
};

export default gaussJordan;
