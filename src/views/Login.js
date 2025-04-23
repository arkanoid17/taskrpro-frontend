import React, { useState } from 'react';

import { Container } from "@mui/system";
import CustomTextField from "../components/CustomTextfield";
import { Button, CircularProgress } from "@mui/material";
import { Typography } from '@mui/material';
import '../css/Login.css';
import apiCall from '../server/ApiCall'; 
import ServerConstants from '../server/ServerConstants';
import Toast from '../components/Toast';
import { useNavigate } from 'react-router-dom';



const loginBg = '/assets/loginbg.png';



const Login = () => {

  const navigate = useNavigate(); // Use the navigate function

    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });

      const [isLoading, setIsLoading] = useState(false);

      const [toastOpen, setToastOpen] = useState(false);
      const [toastMsg, setToastMsg] = useState('');
      const [toastSeverity, setToastSeverity] = useState('success');


      const showToast = (message, severity ) => {
        setToastMsg(message);
        setToastSeverity(severity);
        setToastOpen(true);
      };
     

      const handleSuccess = (data) =>{
        console.log('success')
        setIsLoading(false);
        const token = data.token
        if(token!=null){
          localStorage.setItem("token",token);
          navigate('/dashboard');
        }else{
          showToast("Service not available at the moment!", "error");
        }
      }

      const handleError = (e) =>{
        console.log('error ',e.message)
        setIsLoading(false);
        showToast(e.message,"error");
      }

      
      const handleLogin = () => {
        console.log(formData.email);
        console.log(formData.password);

        setIsLoading(true);

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

                {
                  isLoading?
                  (<CircularProgress color='secondary' className='login-loader' thickness={8}/>):
                  (<Button color="secondary" variant="contained" className="login-button" onClick={handleLogin}>
                      Login
                  </Button>)
                }

                </form>

                <Toast
                  open={toastOpen}
                  message={toastMsg}
                  severity={toastSeverity}
                  onClose={() => setToastOpen(false)}
                />

            </Container>

            </Container>

        </div>
    );
}


export default Login;