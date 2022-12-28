import React, { useState } from 'react'
// import './login.css'
import LogoOrange from '../../assets/images/LogoOrange.png'
import { Box, Button, TextField, } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { Typography } from '@mui/material';
import { authService } from '../../services/auth.services';
import { useNavigate } from "react-router-dom"

const Login = () => {
  let navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [notifyText, setNotifyText] = useState('')

  const validate = (key, values) => {
    const EMAIL_FORMAT = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const PASSWORD_FORMAT = /^(?=.*\d)(?=.*[a-zA-Z]).{10,}$/
    if (key === 'email' && !EMAIL_FORMAT.test(values)) {
      setNotifyText('Email không hợp lệ')
      return true
    }
    if (key === 'password' && !PASSWORD_FORMAT.test(values)) {
      setNotifyText('Mật khẩu phải có ít nhất 10 ký tự, có ký tự chữ, ký tự số và ký tự đặc biệt')
      return true
    }
    return false
  }


  async function handleLogin() {
    let account = {
      userName: email,
      password: password
    }
    if (!email || !password) {
      setNotifyText('Hãy nhập đầy đủ thông tin')
      return
    }
    if (validate('email', email)) {
      return
    }
    if (validate('password', password)) {
      return
    }
    try {
      const login = await authService.login(account);
      if (login.data) {
        console.log("Login data: ", login.data)
        localStorage.setItem("UserId", login.data.id)
        localStorage.setItem("AccessToken", login.data.accessToken)
        localStorage.setItem("RefreshToken", login.data.refreshToken)
        localStorage.setItem("Name", login.data.name)
        localStorage.setItem("Roles", login.data.roles)
        var role = localStorage.getItem("Roles")
        if (role.includes("Admin")) {
          navigate("/dashboard")
        } else {
          localStorage.clear()
          navigate("/login")
        }

      }
    } catch (error) {
      console.log(error.response.data)
    }
  }
  return (
    <div>
      <form>
        <Box display="flex"
          flexDirection={"column"}
          maxWidth={350}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          backgroundColor='white'
          boxShadow={'0px 0px 10px #7D7D7E'}>

          <Typography variant='h5' padding={1}>ĐĂNG NHẬP CHO WEB ADMIN</Typography>
          <TextField
            fullWidth
            size='small' margin="normal" type={'email'} variant='outlined' placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#89D5C9" }} />
                </InputAdornment>
              ),
            }}></TextField>
          <TextField
            fullWidth
            size='small' margin="normal" type={'password'} variant='outlined' placeholder='Mật khẩu'
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon sx={{ color: "#89D5C9" }} />
                </InputAdornment>
              ),
            }}></TextField>
          <Button sx={{ marginTop: 2, borderRadius: 5, backgroundColor: "#89D5C9", fontSize: 16, fontStyle: "bold" }} variant="contained" onClick={handleLogin} >ĐĂNG NHẬP</Button>
          <Typography color='error'>{notifyText}</Typography>
        </Box>
      </form>
    </div >
  )
}

export default Login
