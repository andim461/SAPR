import React from 'react';
import './Header.css';
import {Button} from '@material-ui/core';


interface Iprops {
    currentWindow: string,
    handleChange: (newWindow: string) => void,
}

export default function Header (props:Iprops){
    const onPreClick = (): void => {
        props.handleChange('pre');
    };
    const onProClick = (): void => {
        props.handleChange('pro');        
    };
    const onPostClick = (): void => {
        props.handleChange('post');
    };
    
    
    return (
        <header className='header'>
            <Button disabled={props.currentWindow === 'pre' ? undefined : true} variant='outlined' color='primary' size='medium' onClick={onPreClick} >Препроцессор</Button>
            <Button disabled={props.currentWindow === 'pro' ? undefined : true} variant='outlined' color='primary' size='medium' onClick={onProClick} >Процессор</Button>
            <Button disabled={props.currentWindow === 'post' ? undefined : true} variant='outlined' color='primary' size='medium' onClick={onPostClick} >Постпроцессор</Button>
        </header>
    );
}