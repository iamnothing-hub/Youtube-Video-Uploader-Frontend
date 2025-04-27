import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useAuth } from '../helper/AuthContext'
import { Box, Button, Typography } from '@mui/material';

const Home = () => {

  const {token} = useAuth();
  const navigate = useNavigate();

  if(!token){
    navigate('/login');
    
  }


  return (
    <>
    
    <Outlet/>
    </>
  )
}

export default Home