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
    const execute = () =>{
        const Nx = solution?.N[rod - 1];
        const Ux = solution?.U[rod - 1];
        const Sx = solution?.S[rod - 1];
        let isGood: boolean = true;
        if (delt === undefined || delt === '' || isNaN(Number(delt))) {
            setDeltOkay(false);
            isGood = false;
        }
        if(Nx && Ux && Sx && isGood ){
            const dataTemp: Data[] = [];
            for(let i = 0; i <= props.state.rodsData[rod].L; i += Number(delt)){
                dataTemp.push({x: i, Nx: Nx(i), Ux: Ux(i), Sx: Sx(i)});
            }
            setData(dataTemp);
        }
        
    };
    const onDeltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numb = Number(e.target.value);
        setDelt(e.target.value);
        const len = props.state.rodsData[rod - 1].L;

        if (isNaN(numb) || numb < 0 || numb > len) {
            setDeltOkay(false);
        } else setDeltOkay(true);
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRod(Number(event.target.value));
    };

    return (
        <div>
        <div>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Стержень</InputLabel>
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
                label="№ узла"
                variant="outlined"
                size="small"
                value={delt}
                onChange={onDeltChange}
            />
            <Button
                onClick={execute}
                variant="contained"
                color="secondary"
            >
                Получить
            </Button>
        </div>
        <div>
                {data ? <PostTable data={data}/> : null}
        </div>
        </div>
    );
};

const mapStateToProps = (state: Store) => ({
    state: state,
});

export default connect(mapStateToProps)(TableField);
