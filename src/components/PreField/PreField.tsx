import React, { useState } from 'react';
import Canvas from '../Canvas/Canvas';
import CheckBox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Store from '../../interfaces/Store';
import { connect } from 'react-redux';
import {
    updateLeftSup,
    updateRightSup,
} from '../../store/actions/supportActions';
import RodsData from '../../interfaces/RodsData';
import './PreField.css';

interface FieldProps {
    state: Store;
    updateLeftSup: (val: boolean) => void;
    updateRightSup: (val: boolean) => void;
}
const PreField = (props: FieldProps) => {
    const [zoomRate, setZoomRate] = useState<number>(1);
    const onLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateLeftSup(e.target.checked);
    };
    const onRightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateRightSup(e.target.checked);
    };
    const handlePlus = () => {
        if (zoomRate < 1.9) {
            setZoomRate(zoomRate + 0.25);
        }
    };
    const handleMinus = () => {
        if (zoomRate >= 0.3) {
            setZoomRate(zoomRate - 0.25);
        }
    };
    return (
        <div>
            <div className='line'>
                <div className='line'>
                    <Typography variant='h6'>Левая заделка</Typography>
                <CheckBox
                    checked={props.state.leftSupport}
                    onChange={onLeftChange}
                />
                </div>
                <div className='line'>
                    
                    <IconButton
                        color="secondary"
                        size="small"
                        onClick={handleMinus}
                    >
                        <ZoomOutIcon style={{ fontSize: 30 }} />
                    </IconButton>
                    <Typography>x {zoomRate.toFixed(2)}</Typography>
                    <IconButton
                        color="secondary"
                        size="small"
                        onClick={handlePlus}
                    >
                        <ZoomInIcon style={{ fontSize: 30 }} />
                    </IconButton>
                    
                    
                </div>
                <div className='line'>
                    <Typography variant='h6'> Правая заделка</Typography>
                <CheckBox
                    checked={props.state.rightSupport}
                    onChange={onRightChange}
                />
                </div>
            </div>
            <Canvas dataRods={props.state.rodsData} zoomRate={zoomRate} />
        </div>
    );
};
const mapStateToProps = (state: Store) => ({
    state: state,
});
export default connect(mapStateToProps, { updateLeftSup, updateRightSup })(
    PreField
);
