import React, { useState } from 'react';
import TableRods from '../Tables/TableRods';
import TableNodes from '../Tables/TableNodes';
import './Pre.css';
import { connect } from 'react-redux';
import Canvas from '../Canvas/Canvas';
import { Alert, AlertTitle } from '@material-ui/lab';
import Store from '../../interfaces/Store';

interface PreProps {
    state: Store;
}
const Pre = (props: PreProps) => {
    const whereProblem = !props.state.isNodesValid
        ? 'узлов'
        : !props.state.isRodsValid && 'стержней';
    return (
        <div className="preBody">
            <div className="tables">
                <TableRods />
                <TableNodes />
            </div>
            {whereProblem ? (
                <Alert className="alert" severity="error">
                    {' '}
                    <AlertTitle>Ошибка!</AlertTitle> Неправильная нумерация
                    {' ' + whereProblem}{' '}
                </Alert>
            ) : (
                <Canvas dataRods={props.state.rodsData} />
            )}
        </div>
    );
};
const mapStateToProps = (state: Store) => ({
    state: state,
});
export default connect(mapStateToProps)(Pre);
