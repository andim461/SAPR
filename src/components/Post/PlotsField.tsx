import React, {useState} from 'react';
import Store from '../../interfaces/Store';
import NPlot from '../DataPlots/NPlot';
import UPlot from '../DataPlots/UPlot';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Post.css';
import URodPlot from '../DataPlots/URodPlot';
import NRodPlot from '../DataPlots/NRodPlot';
import PointFinder from '../PointFinder/PointFinder';

interface PlotsFieldProps {
    state: Store;
}
const PlostField = (props: PlotsFieldProps) => {
    const rodsIndex = props.state.rodsData.map((val) => val.i);
    const [rod, setRod] = useState<number>(1);
    
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRod(Number(event.target.value));

    };

    return (
        <div>
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
            {props.state.solution?.N[rod - 1] &&
            props.state.solution?.N[rod - 1] ? (
                <div className='field'>
                    <div className='into'>
                        <NRodPlot index={rod - 1} />
                        <PointFinder
                            index={rod - 1}
                            type={'N'}
                        />
                    </div>
                    <div className='into'>
                        <URodPlot index={rod - 1} />
                        <PointFinder
                            index={rod - 1}
                            type={'U'}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
};

const mapStateToProps = (state: Store) => ({
    state: state,
});

export default connect(mapStateToProps)(PlostField);
