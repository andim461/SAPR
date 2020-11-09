import React, { useState } from 'react';
import Store from '../../interfaces/Store';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Pro.css';
import {solve} from '../../store/actions/solutionAction';

interface ProProps {
    state: Store;
}

const Pro = (props: ProProps) => {
    const valid =
        props.state.isNodesValid &&
        props.state.isRodsValid &&
        !!props.state.rodsData.length;
    const haveSups = props.state.rightSupport || props.state.leftSupport;
    const initText = !valid
        ? 'Проверьте правильность данных  в препроцессоре'
        : !haveSups
        ? 'Конструкция должна иметь хотя бы одну заделку'
        : props.state.solution? 'Расчет уже был успешно выполнен. Выполнить ещё раз?' : '';
    const [text, setText] = useState<string>(initText);

    const execute = () => {
        solve();
        setText('Расчет выполнен успешно');
    };

    return (
        <div className="proField">
            <Button
                onClick={execute}
                variant="contained"
                color="secondary"
                disabled={!(valid && haveSups)}
            >
                {' '}
                Вычислить{' '}
            </Button>

            <Typography
                align="center"
                color={valid && haveSups ? 'textPrimary' : 'error'}
            >
                {text}
            </Typography>
        </div>
    );
};
const mapStateToProps = (state: Store) => ({
    state: state,
});
export default connect(mapStateToProps, {solve})(Pro);
