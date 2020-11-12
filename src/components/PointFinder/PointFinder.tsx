import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Store from '../../interfaces/Store';
import NPlot from '../DataPlots/NPlot';
import UPlot from '../DataPlots/UPlot';
import { connect } from 'react-redux';
import { isNumber } from 'lodash';
interface PointFinderProps {
    index: number;
    state: Store;
    type: 'N' | 'S' | 'U';
}

const PointFinder = (props: PointFinderProps) => {
    const func = 
        props.type === 'N'
            ? props.state.solution?.N[props.index]
            : props.type === 'U'
            ? props.state.solution?.U[props.index]
            : props.type === 'S'
            ? props.state.solution?.S[props.index]
            : null;
    const leftX = 0;
    const rightX = props.state.rodsData[props.index].L;
    const [x, setX] = useState<string>('');
    const [y, setY] = useState<string>('');
    const [isXOkay, setXOkay] = useState<boolean>(true);
    const [helper, setHelper] = useState<string>('Введите значение x');
    const onXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setY('');
        const value = e.target.value;
        const num = Number(value);
        setX(e.target.value);
        if (isNaN(num)) {
            setXOkay(false);
            setHelper('Значение x должно быть числом');
        } else if (num < leftX || num > rightX) {
            setXOkay(false);
            setHelper('Значение x находится вне интервала');
        } else if (value && func) {
            setXOkay(true);
            setHelper('Введите значение x');
            setY(func(num).toFixed(6));
        }
    };

    return (
        <div>
            <TextField
                id="outlined-basic"
                error={!isXOkay}
                helperText={helper}
                defaultValue=''
                label="x"
                variant="outlined"
                size="small"
                value={x}
                onChange={onXChange}
            />
            <Typography variant="h6">{props.type + '(x) = ' + y}</Typography>
        </div>
    );
};

const mapStateToProps = (state: Store) => ({
    state: state,
});
export default connect(mapStateToProps)(PointFinder);
