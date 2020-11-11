import React, { useState } from 'react';
import MyTableRods from '../Tables/MyTableRods';
import MyTableNodes from '../Tables/MyTableNodes';
import './Pre.css';
import { connect } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import Store from '../../interfaces/Store';
import PreField from '../PreField/PreField';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import {uploadFileProject} from '../../store/actions/stateAction';


interface PreProps {
    state: Store;
    uploadFileProject: (fd: FormData) => void;
}
const Pre = (props: PreProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [file, setFile] = useState<any>(null);

      const handleClose = () => {
        setOpen(false);
      };
    
    const handleDownload = async () => {
        const data = {...props.state, solution: null}; 
        const download = require('downloadjs');
        download(JSON.stringify(data), 'project.sapr');
    };
    const handleUpload = () => {
        setOpen(true);
    };
    
    const upload = () => {

        if (file !== null && file.name.slice(-5) === '.sapr'){
            const fd = new FormData();
            fd.append('file', file);
            props.uploadFileProject(fd);
        }
        
    };
    const onFormSubmit = (e: any) => {
        e.preventDefault();
        console.log(file);
        upload();
        setFile(null);
        setOpen(false);
    };
    const onChange = (e:any) => {
        setFile(e.target.files[0]);
    };

    const whereProblem = !props.state.isNodesValid
        ? 'узлов'
        : !props.state.isRodsValid && 'стержней';
    return (
        <div className="preBody">
            <div className='buttons'>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<GetAppIcon />}
                    onClick={handleDownload}
                >
                    Скачать
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PublishIcon />}
                    onClick={handleUpload}
                >
                    Загрузить
                </Button>
            </div>
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
            <Modal open={open} onClose={handleClose}>
                <Paper className='modal' elevation={3} variant='outlined'>
                <div className='modalBody'>
                    <form onSubmit={onFormSubmit}>
                        <input type='file' onChange={onChange}/>
                        <button type='submit'>Загрузить</button>
                    </form>
                </div>
                </Paper>
            </Modal>
        </div>
    );
};
const mapStateToProps = (state: Store) => ({
    state: state,
});
export default connect(mapStateToProps, {uploadFileProject})(Pre);
