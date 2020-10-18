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
    dataNodes: Array<Object>;
    changeNodes: (data: Array<Object>) => void;
}
const Pre = (props: PreProps) => {
    return (
        <div className="preBody">
            <div className="tables">
                <TableRods />
                <TableNodes
                    data={props.dataNodes}
                    setData={props.changeNodes}
                />
            </div>
            {props.state.isDataGood ? (
                <Canvas dataRods={props.state.rodsData} />
            ) : (
                <Alert className="alert" severity="error">
                    {' '}
                    <AlertTitle>Ошибка!</AlertTitle> Неправильная нумерация
                    стержней{' '}
                </Alert>
            )}
        </div>
    );
};
const mapStateToProps = (state: Store) => ({
    state: state,
});
export default connect(mapStateToProps)(Pre);
