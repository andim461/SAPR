import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NodesData from '../../interfaces/NodesData';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { AddCircle } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './Tables.css';
import Store from '../../interfaces/Store';
import { connect } from 'react-redux';
import { updateDataNodes } from '../../store/actions/tableActions';
import Data from '../../interfaces/Data';

interface TableProps {
    data: Data[];
}

const PostTable = (props: TableProps) => {
    
    return (
        <Paper className='tablePost' >
            <Typography
                className="tableTitle"
                variant="h5"
                id="tableTitle"
                component="div"
            >
                Табличное представление данных
            </Typography>
            <TableContainer>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">X</TableCell>
                            <TableCell align="center">N(x)</TableCell>
                            <TableCell align="center">U(x)</TableCell>
                            <TableCell align="center">S(x)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((val) => (<TableRow>
                            <TableCell align='center'>
                                {val.x}
                            </TableCell>
                            <TableCell align='center'>
                                {val.Nx}
                            </TableCell>
                            <TableCell align='center'>
                                {val.Ux}
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant='subtitle2' color={val.red ? 'error' : 'initial'}>{val.Sx}
                                </Typography>
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

const mapStateToProps = (state: Store) => ({
    state: state,
});

export default connect(mapStateToProps)(PostTable);
