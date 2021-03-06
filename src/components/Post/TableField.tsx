import React, { useState } from 'react';
import Store from '../../interfaces/Store';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Data from '../../interfaces/Data';
import PostTable from '../Tables/PostTable';
import './Post.css';
import GetAppIcon from '@material-ui/icons/GetApp';

interface TableFieldProps {
    state: Store;
}
const TableField = (props: TableFieldProps) => {
    const solution = props.state.solution;
    const rodsIndex = props.state.rodsData.map((val) => val.i);
    const [rod, setRod] = useState<number>(1);
    const [delt, setDelt] = useState<string>('');
    const [isDeltOkay, setDeltOkay] = useState<boolean>(true);
    const [data, setData] = useState<Data[] | null>(null);

    const handleDownload = async () => {
        if (data) {
            const download = require('downloadjs');
            download(JSON.stringify({rod, data}), 'result.res');
        }
    };

    const execute = () => {
        const Nx = solution?.N[rod - 1];
        const Ux = solution?.U[rod - 1];
        const Sx = solution?.S[rod - 1];
        let isGood: boolean = true;
        const len = props.state.rodsData[rod - 1].L;
        if (delt === undefined || delt === '' || Number(delt) === 0 || isNaN(Number(delt)) || len < Number(delt)) {
            setDeltOkay(false);
            isGood = false;
        }
        if (Nx && Ux && Sx && isGood && isDeltOkay) {
            const dataTemp: Data[] = [];

            for (
                let i = 0;
                i <= len;
                i += Number(delt)
            ) {
                i = Number(i.toFixed(10));
                const Si = Sx(i);
                const isRed = props.state.rodsData[rod - 1].S < Si || (-props.state.rodsData[rod - 1].S) > Si;
                dataTemp.push({ x: i, Nx: Nx(i), Ux: Ux(i), Sx: Si, red: isRed });
            }
            setData(dataTemp);
        }
    };
    const onDeltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numb = Number(e.target.value);
        setDelt(e.target.value);
        const len = props.state.rodsData[rod - 1].L;

        if (isNaN(numb) || numb <= 0 || numb > len) {
            setDeltOkay(false);
        } else setDeltOkay(true);
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDelt('');
        setDeltOkay(true);
        setData(null);
        setRod(Number(event.target.value));
    };

    return (
        <div className="tableField">
            <div className="tableTop">
                <FormControl>
                    <InputLabel id="demo-simple-select-label">
                        Стержень
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rod}
                        onChange={handleChange}
                    >
                        {rodsIndex.map((val) => (
                            <MenuItem value={val}>{val}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    id="outlined-basic"
                    error={!isDeltOkay}
                    label="Шаг"
                    variant="outlined"
                    size="small"
                    value={delt}
                    onChange={onDeltChange}
                />
                <Button onClick={execute} variant="contained" color="secondary">
                    Получить
                </Button>
            </div>
            <div className='downloadButton'>
            <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<GetAppIcon />}
                    onClick={handleDownload}
                >
                    Скачать
                </Button>
            </div>
            <div className="table">
                {data ? <PostTable data={data} /> : null}
            </div>
        </div>
    );
};

const mapStateToProps = (state: Store) => ({
    state: state,
});

export default connect(mapStateToProps)(TableField);
