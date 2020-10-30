import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RodsData from '../../interfaces/RodsData';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './Tables.css';
import IconButton from '@material-ui/core/IconButton';
import { AddCircle } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Store from '../../interfaces/Store';
import { connect } from 'react-redux';
import { updateDataRods } from '../../store/actions/tableActions';

interface TableProps {
    state: Store;
    updateDataRods: (data: Array<RodsData>) => void;
}
const MyTableRods = (props: TableProps) => {
    const [num, setNum] = useState<string>('');
    const [len, setLen] = useState<string>('');
    const [squ, setSqu] = useState<string>('');
    const [mod, setMod] = useState<string>('');
    const [nap, setNap] = useState<string>('');
    const [nag, setNag] = useState<string>('');
    const [isNumOkay, setNumOkay] = useState<boolean>(true);
    const [isLenOkay, setLenOkay] = useState<boolean>(true);
    const [isSquOkay, setSquOkay] = useState<boolean>(true);
    const [isModOkay, setModOkay] = useState<boolean>(true);
    const [isNapOkay, setNapOkay] = useState<boolean>(true);
    const [isNagOkay, setNagOkay] = useState<boolean>(true);

    const handleDelete = (key: number) => {
        const dataDelete = [...props.state.rodsData];
        dataDelete.splice(key, 1);
        props.updateDataRods([...dataDelete]);
    };
    const handleEdit = (key: number) => {
        const dataDelete = [...props.state.rodsData];
        const deleted = dataDelete.splice(key, 1);
        props.updateDataRods([...dataDelete]);
        setNum(String(deleted[0].i));
        setLen(String(deleted[0].L));
        setSqu(String(deleted[0].A));
        setMod(String(deleted[0].E));
        setNap(String(deleted[0].S));
        setNag(String(deleted[0].q));
    };

    const handleAdd = () => {
        let isGood: boolean = true;
        if (num === undefined || num === '' || isNaN(Number(num))) {
            setNumOkay(false);
            isGood = false;
        }
        if (len === undefined || len === '') {
            setLenOkay(false);
            isGood = false;
        }
        if (squ === undefined || squ === '') {
            setSquOkay(false);
            isGood = false;
        }
        if (mod === undefined || mod === '') {
            setModOkay(false);
            isGood = false;
        }
        if (nap === undefined || nap === '') {
            setNapOkay(false);
            isGood = false;
        }
        if (nag === undefined || nag === '') {
            setNagOkay(false);
            isGood = false;
        }

        if (
            isGood &&
            isNagOkay &&
            isNumOkay &&
            isNapOkay &&
            isLenOkay &&
            isModOkay &&
            isSquOkay
        ) {
            const newData: RodsData = {
                i: Number(num),
                L: Number(len),
                A: Number(squ),
                E: Number(mod),
                S: Number(nap),
                q: Number(nag),
            };
            props.updateDataRods([...props.state.rodsData, newData]);
            setLen('');
            setNum('');
            setNag('');
            setNap('');
            setMod('');
            setSqu('');
            setLenOkay(true);
            setModOkay(true);
            setNumOkay(true);
            setNagOkay(true);
            setNapOkay(true);
            setSquOkay(true);
        }
    };

    const onNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numb = Number(e.target.value);
        setNum(e.target.value);

        if (isNaN(numb) || numb <= 0) {
            setNumOkay(false);
        } else setNumOkay(true);
    };
    const onLenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numb = Number(e.target.value);
        setLen(e.target.value);
        if (isNaN(numb) || numb <= 0) {
            setLenOkay(false);
        } else setLenOkay(true);
    };
    const onSquChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numb = Number(e.target.value);
        setSqu(e.target.value);
        if (isNaN(numb) || numb <= 0) {
            setSquOkay(false);
        } else setSquOkay(true);
    };
    const onModChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numb = Number(e.target.value);
        setMod(e.target.value);
        if (isNaN(numb) || numb <= 0) {
            setModOkay(false);
        } else setModOkay(true);
    };
    const onNapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numb = Number(e.target.value);
        setNap(e.target.value);
        if (isNaN(numb) || numb <= 0) {
            setNapOkay(false);
        } else setNapOkay(true);
    };
    const onNagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numb = Number(e.target.value);
        setNag(e.target.value);
        if (isNaN(numb)) {
            setNagOkay(false);
        } else setNagOkay(true);
    };

    return (
        <Paper className="tableRods">
            <Typography
                className="tableTitle"
                variant="h5"
                id="tableTitle"
                component="div"
            >
                Стержни
            </Typography>
            <TableContainer>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>№ стержня</TableCell>
                            <TableCell align="right">Длина&nbsp;(см)</TableCell>
                            <TableCell align="right">
                                Площадь сечения&nbsp;(см^2)
                            </TableCell>
                            <TableCell align="right">
                                Модуль упругости&nbsp;(Па)
                            </TableCell>
                            <TableCell align="right">
                                Допускаемое напряжение&nbsp;(МПа)
                            </TableCell>
                            <TableCell align="right">
                                Распределенные нагрузки&nbsp;(Н/м)
                            </TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.state.rodsData.map((row, ind) => (
                            <TableRow key={ind}>
                                <TableCell component="th" scope="row">
                                    {row.i}
                                </TableCell>
                                <TableCell align="right">{row.L}</TableCell>
                                <TableCell align="right">{row.A}</TableCell>
                                <TableCell align="right">{row.E}</TableCell>
                                <TableCell align="right">{row.S}</TableCell>
                                <TableCell align="right">{row.q}</TableCell>
                                <TableCell align="right">
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
                                    label="№ стержня"
                                    variant="outlined"
                                    size="small"
                                    value={num}
                                    onChange={onNumChange}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    id="outlined-basic"
                                    error={!isLenOkay}
                                    label="Длина"
                                    variant="outlined"
                                    size="small"
                                    value={len}
                                    onChange={onLenChange}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    id="outlined-basic"
                                    error={!isSquOkay}
                                    label="Площадь"
                                    variant="outlined"
                                    size="small"
                                    value={squ}
                                    onChange={onSquChange}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    id="outlined-basic"
                                    error={!isModOkay}
                                    label="Модуль"
                                    variant="outlined"
                                    size="small"
                                    value={mod}
                                    onChange={onModChange}
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
                            <TableCell align="center">
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

export default connect(mapStateToProps, { updateDataRods })(MyTableRods);
