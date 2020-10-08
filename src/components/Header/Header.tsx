import React from 'react';
import './Header.css';
import {Button} from '@material-ui/core';
import {Link, useLocation} from "react-router-dom";
  


const Header = () =>{
    let location = useLocation();
    
    
    return (
        <header className='header'>
            <Button disabled={location.pathname !== '/pre' ? undefined : true} variant='outlined' color='secondary' size='large'  > <Link className='link' to='/pre'>Препроцессор</Link> </Button>
            <Button disabled={location.pathname !== '/pro' ? undefined : true} variant='outlined' color='secondary' size='large'  > <Link className='link' to='/pro'>Процессор</Link> </Button>
            <Button disabled={location.pathname !== '/post' ? undefined : true} variant='outlined' color='secondary' size='large' > <Link className='link' to='/post'>Постпроцессор</Link> </Button>
        </header>
    );
}
export default Header;