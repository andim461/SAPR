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

interface PostProps {
    state: Store;
}
const Post = (props: PostProps) => {
    const solution = props.state.solution;
    const [value, setValue] = React.useState('Dist');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <div>
            {solution ? (
                <div className="plotsField">
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
                        <div>
                            <NPlot />
                            <UPlot />
                        </div>
                    ) : value === 'Plots' ? (
                        <div>
                            <PlotsField />
                        </div>
                    ) : value === 'Table' ? (
                        <div></div>
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
