import React, { useState } from 'react';

import { Container } from "@mui/system";
import CustomTextField from "../components/CustomTextfield";
import { Button } from "@mui/material";
import { Typography } from '@mui/material';
import '../css/Login.css';
import apiCall from '../server/ApiCall'; 
import ServerConstants from '../server/ServerConstants';


const loginBg = '/assets/loginbg.png';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });

     

      const handleSuccess = (data) =>{
        console.log('success')
      }

      const handleError = (e) =>{
        console.log('error ',e)
      }

      
      const handleLogin = () => {
        console.log(formData.email);
        console.log(formData.password);
        apiCall({
            url: ServerConstants.baseUrl+ServerConstants.loginUrl,
            method: 'POST',
            data: formData,      // Send form data (email & password)
            headers: {},    // Pass custom headers
            onSuccess: handleSuccess,
            onError: handleError,
          });
      }

     

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };

    return (
        <div className='login-page'>

            <Container maxWidth="md" disableGutters className='login-center-container'>

            <div className="login-illustration">
                <img
                    src={loginBg}
                    alt="Login Background"
                    className="login-background-image"
                />
            </div>

            <Container className='login-container'>

                
                <form className="login-form">
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>

                <CustomTextField
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    color = 'secondary'
                    name='email'/>

                <CustomTextField
                    type="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    color="secondary"
                    name='password'/>

                <Button color="secondary" variant="contained" className="login-button" onClick={handleLogin}>
                    Login
                </Button>

                </form>


            </Container>

            </Container>

        </div>
    );
}


export default Login;