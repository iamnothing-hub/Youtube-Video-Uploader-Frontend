
import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import Home from './component/Home'
import Login from './pages/Login'
import Upload from './pages/Upload'
import Navbar from './component/Navbar'
import { useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import { getTheme } from './helper/Theme'
import { CssBaseline, IconButton } from '@mui/material'
import { Brightness1, Brightness4, Brightness7 } from '@mui/icons-material'

function App() {

  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () =>{
    setThemeMode((prevMode) => (prevMode ==='light' ? 'dark' : 'light'))
  }

  return (
    <>



    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />

    <Navbar />
    
      <Routes>
        
        <Route path='/' element={<Home />}>
          <Route path='' element={<Navigate to={'/login'} />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/upload' element={<Upload />} />
      </Routes>

      <IconButton 
       onClick={toggleTheme}
       color='inherit'
       sx={{
        position: "absolute",
        top: 12,
         right: 80       
        }}
      >
        {themeMode ==='light' ? <Brightness4 /> : <Brightness7 />}

      </IconButton>
    </ThemeProvider>
    </>
  )
}

export default App
