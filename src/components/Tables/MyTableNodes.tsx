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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { AddCircle } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './Tables.css';
import Store from '../../interfaces/Store';
import { connect } from 'react-redux';
import { updateDataNodes } from '../../store/actions/tableActions';

interface TableProps {
    state: Store;
    updateDataNodes: (data: Array<NodesData>) => void;
}

const MyTableNodes = (props: TableProps) => {
    const [num, setNum] = useState<string>('');
    const [nag, setNag] = useState<string>('');
    const [isNumOkay, setNumOkay] = useState<boolean>(true);
    const [isNagOkay, setNagOkay] = useState<boolean>(true);

    const handleDelete = (key: number) => {
        const dataDelete = [...props.state.nodesData];
        dataDelete.splice(key, 1);
        props.updateDataNodes([...dataDelete]);
    };
    const handleEdit = (key: number) => {
        const dataDelete = [...props.state.nodesData];
        const deleted = dataDelete.splice(key, 1);
        props.updateDataNodes([...dataDelete]);
        setNum(String(deleted[0].j));
        setNag(String(deleted[0].F));
    };
    const handleAdd = () => {
        let isGood: boolean = true;

        if (num === undefined || num === '' || isNaN(Number(num))) {
            setNumOkay(false);
            isGood = false;
        }
        if (nag === undefined || nag === '') {
            setNagOkay(false);
            isGood = false;
        }

        if (isGood && isNumOkay && isNagOkay) {
            const newData: NodesData = {
                j: Number(num),
                F: Number(nag),
            };
            props.updateDataNodes([...props.state.nodesData, newData]);
            setNum('');
            setNag('');

            setNumOkay(true);
            setNagOkay(true);
        }
    };

    const onNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numb = Number(e.target.value);
        setNum(e.target.value);

        if (isNaN(numb) || numb <= 0) {
            setNumOkay(false);
        } else setNumOkay(true);
    };
    const onNagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numb = Number(e.target.value);
        setNag(e.target.value);
        if (isNaN(numb)) {
            setNagOkay(false);
        } else setNagOkay(true);
    };

    return (
        <Paper className="tableNodes">
            <Typography
                className="tableTitle"
                variant="h5"
                id="tableTitle"
                component="div"
            >
                Нагрузки в узлах
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>№ узла</TableCell>
                            <TableCell align="center">Нагрузка&nbsp;(Н)</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.state.nodesData.map((row, ind) => (
                            <TableRow key={ind}>
                                <TableCell component="th" scope="row">
                                    {row.j}
                                </TableCell>
                                <TableCell align="center">{row.F}</TableCell>
                                <TableCell align="center">
                                    <div className="action">
                                        <IconButton
                                            color="secondary"
                                            size="small"
                                            onClick={(e) => handleDelete(ind)}
                                        >
                                            <DeleteIcon
                                                style={{ fontSize: 20 }}
                                            />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            size="small"
                                            onClick={(e) => handleEdit(ind)}
                                        >
                                            <EditIcon
                                                style={{ fontSize: 20 }}
                                            />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <TextField
                                    id="outlined-basic"
                                    error={!isNumOkay}
                                    label="№ узла"
                                    variant="outlined"
                                    size="small"
                                    value={num}
                                    onChange={onNumChange}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    id="outlined-basic"
                                    error={!isNagOkay}
                                    label="Нагрузка"
                                    variant="outlined"
                                    size="small"
                                    value={nag}
                                    onChange={onNagChange}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    color="secondary"
                                    size="small"
                                    onClick={(e) => handleAdd()}
                                >
                                    <AddCircle style={{ fontSize: 25 }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

const mapStateToProps = (state: Store) => ({
    state: state,
});

export default connect(mapStateToProps, { updateDataNodes })(MyTableNodes);
