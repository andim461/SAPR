import React, { useState } from 'react';
import MyTableRods from '../Tables/MyTableRods';
import MyTableNodes from '../Tables/MyTableNodes';
import './Pre.css';
import { connect } from 'react-redux';
import Canvas from '../Canvas/Canvas';
import { Alert, AlertTitle } from '@material-ui/lab';
import Store from '../../interfaces/Store';
import PreField from '../PreField/PreField';

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
                <MyTableRods />
                <MyTableNodes />
            </div>
            {whereProblem ? (
                <Alert className="alert" severity="error">
                    {' '}
                    <AlertTitle>Ошибка!</AlertTitle> Неправильная нумерация
                    {' ' + whereProblem}{' '}
                </Alert>
            ) : (
                <PreField />
            )}
        </div>
    );
};
const mapStateToProps = (state: Store) => ({
    state: state,
});
export default connect(mapStateToProps)(Pre);
