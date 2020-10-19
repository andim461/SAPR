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
    const [nap, setNap] = useState<string>('');
    const [isNumOkay, setNumOkay] = useState<boolean>(true);
    const [isNapOkay, setNapOkay] = useState<boolean>(true);

    const handleDelete = (key: number) => {
        const dataDelete = [...props.state.nodesData];
        dataDelete.splice(key, 1);
        props.updateDataNodes([...dataDelete]);
    };
    const handleAdd = () => {
        let isGood: boolean = true;

        if (num === undefined || num === '' || isNaN(Number(num))) {
            setNumOkay(false);
            isGood = false;
        }
        if (nap === undefined || nap === '') {
            setNapOkay(false);
            isGood = false;
        }

        if (isGood && isNumOkay && isNapOkay) {
            const newData: NodesData = {
                j: Number(num),
                F: Number(nap),
            };
            props.updateDataNodes([...props.state.nodesData, newData]);
            setNum('');
            setNap('');

            setNumOkay(true);
            setNapOkay(true);
        }
    };

    const onNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numb = Number(e.target.value);
        setNum(e.target.value);

        if (isNaN(numb) || numb <= 0) {
            setNumOkay(false);
        } else setNumOkay(true);
    };
    const onNapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numb = Number(e.target.value);
        setNap(e.target.value);
        if (isNaN(numb) || numb <= 0) {
            setNapOkay(false);
        } else setNapOkay(true);
    };

    return (
        <Paper className="tableNodes">
            <Typography variant="h6" id="tableTitle" component="div">
                Нагрузки в узлах
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>№ узла</TableCell>
                            <TableCell align="center">Напряжение</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.state.nodesData.map((row, ind) => (
                            <TableRow key={ind}>
                                <TableCell component="th" scope="row">
                                    {row.j}
                                </TableCell>
                                <TableCell align="center">{row.F}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        onClick={(e) => handleDelete(ind)}
                                    >
                                        {' '}
                                        Удалить{' '}
                                    </Button>
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
                                    error={!isNapOkay}
                                    label="Напряжение"
                                    variant="outlined"
                                    size="small"
                                    value={nap}
                                    onChange={onNapChange}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                    onClick={(e) => handleAdd()}
                                >
                                    {' '}
                                    Добавить{' '}
                                </Button>
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