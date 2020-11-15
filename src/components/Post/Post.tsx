import React from 'react';
import Store from '../../interfaces/Store';
import NPlot from '../DataPlots/NPlot';
import UPlot from '../DataPlots/UPlot';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PlotsField from './PlotsField';
import './Post.css';
import TableField from './TableField';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface PostProps {
    state: Store;
}
const Post = (props: PostProps) => {
    const len = props.state.rodsData.reduce((prev, curr) => prev + curr.L, 0);
    const solution = props.state.solution;
    const [value, setValue] = React.useState('Dist');
    const [x, setX] = React.useState<String>('');
    const [isXOkay, setXOkay] = React.useState<boolean>(true);
    const [Nx, setNx] = React.useState<String[]>([]);
    const [Sx, setSx] = React.useState<String[]>([]);
    const [Ux, setUx] = React.useState<String[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const onXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numb = Number(e.target.value);
        setX(e.target.value);

        if (isNaN(numb) || numb < 0 || numb > len) {
            setXOkay(false);
        } else setXOkay(true);
    };
    const execute = () => {
        let isGood: boolean = true;
        if (x === undefined || x === '' || isNaN(Number(x))) {
            setXOkay(false);
            isGood = false;
        }
        if (isXOkay && isGood && solution) {
            let summ = props.state.rodsData[0].L;
            let rodNum = 0;
            for (let i = 1; summ < Number(x); i++) {
                summ += props.state.rodsData[i].L; 
                rodNum++;
            }
            const num = rodNum === 0 ? Number(x) : Number(x) - props.state.rodsData.slice(0, rodNum).reduce((prev, curr) => prev + curr.L, 0);
            if (Number(x) !== len && Number(x) !== 0 && num === 0) {
                const N1 = solution.N[rodNum];
                const N2 = solution.N[rodNum + 1];
                const U1 = solution.U[rodNum];
                const S1 = solution.S[rodNum];
                const S2 = solution.S[rodNum + 1];
                setNx([N1(num).toString(), N2(0).toString()]);
                setUx([U1(num).toString()]);
                setSx([S1(num).toString(), S2(0).toString()]);
            } else {
                const N1 = solution.N[rodNum];
                const U1 = solution.U[rodNum];
                const S1 = solution.S[rodNum];
                setNx([N1(num).toString()]);
                setUx([U1(num).toString()]);
                setSx([S1(num).toString()]);
            }
        }
    };

    return (
        <div>
            {solution ? (
                <div>
                    <RadioGroup
                        aria-label="data"
                        name="data"
                        value={value}
                        onChange={handleChange}
                    >
                        <div className="radio">
                            <FormControlLabel
                                value="Dist"
                                control={<Radio />}
                                label="Эпюра"
                            />
                            <FormControlLabel
                                value="Plots"
                                control={<Radio />}
                                label="Графики стержней"
                            />
                            <FormControlLabel
                                value="Table"
                                control={<Radio />}
                                label="Таблица"
                            />
                        </div>
                    </RadioGroup>
                    {value === 'Dist' ? (
                        <div className="plotsField">
                            <NPlot />
                            <UPlot />
                            <div>
                                <div className='pointFind'>
                                <TextField
                                    id="outlined-basic"
                                    error={!isXOkay}
                                    label="X"
                                    variant="outlined"
                                    size="small"
                                    value={x}
                                    onChange={onXChange}
                                />
                                <Button
                                    onClick={execute}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Получить
                                </Button>
                                </div>
                                
                                <Typography>
                                    {' '}
                                    N(x) = {Nx.map((val) => val + '; ')}
                                </Typography>
                                <Typography>
                                    {' '}
                                    S(x) = {Sx.map((val) => val + '; ')}
                                </Typography>
                                <Typography>
                                    {' '}
                                    U(x) = {Ux.map((val) => val + '; ')}
                                </Typography>
                                
                            </div>
                        </div>
                    ) : value === 'Plots' ? (
                        <div>
                            <PlotsField />
                        </div>
                    ) : value === 'Table' ? (
                        <div>
                            <TableField />
                        </div>
                    ) : null}
                </div>
            ) : (
                <Typography align="center" color="textPrimary">
                    Необходимо произвести расчет в процессоре
                </Typography>
            )}
        </div>
    );
};

const mapStateToProps = (state: Store) => ({
    state: state,
});

export default connect(mapStateToProps)(Post);
