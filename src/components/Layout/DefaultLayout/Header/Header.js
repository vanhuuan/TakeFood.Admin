import LogoTurquoise from '../../../../assets/images/LogoTurquoise.png'
import React, { useState } from 'react';
import '../../../../css/header.css'
import {
    NavLink,
    Link,
    useNavigate
} from "react-router-dom";
import { Button, Typography } from '@mui/material';


function Header() {
    let activeStyle = {
        color: "#FF8357",
        paddingBottom: '15px',
        borderBottom: 'solid 5px #FF8357'
    };
    let navigate = useNavigate()
    // const [isLogin, setIsLogin] = useState(false)
    let isLogin = false
    const userName = localStorage.getItem("Name")
    // const token = localStorage.getItem("AccessToken")

    if (userName) {
        isLogin = true
    }

    const logout = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <header>
            <div className='container'>
                <img src={LogoTurquoise} style={{ width: 60 }} alt="Logo" />
                <Link exact="true" to="/"><span className='brand'>Foorder</span></Link>
            </div>
            {isLogin ? <><Typography>{userName}</Typography> <Button onClick={logout}>Đăng xuất</Button></> : <Link to="/login">Đăng nhập</Link>}


        </header>
    );
}

export default Header;
