import React from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useAuth } from '../helper/AuthContext';

const Login = () => {

  const navigate = useNavigate();

  const {loginUser} = useAuth();

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/youtube.upload",
    onSuccess: (response) =>{
      console.log(response);
      loginUser(response.access_token);
      navigate("/upload");
    },
    onError: (error)=>{
      toast.error("Login Failed!");
      console.log(error);
    }
  })

  return (
   <Box
   component={'section'}
   sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
   }}
   >
    <Button variant='contained' color='primary' startIcon={<GoogleIcon />} onClick={() => login()} >Login with Google</Button>
   </Box>
  )
}

export default Login