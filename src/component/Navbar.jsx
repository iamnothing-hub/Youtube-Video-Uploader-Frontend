import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from './Logo';
import { useAuth } from '../helper/AuthContext';
import { useNavigate } from 'react-router';


const Navbar = () => {

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const { loginUser, logoutUser, token } = useAuth();
    const navigate = useNavigate();

    const loggedout = () => {
        logoutUser();
        navigate('/login')
    }


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };



    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: "space-between" }}>

                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Logo />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'sans-serif',
                                fontWeight: 700,

                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Youtube Video Uploader
                        </Typography>
                    </Box>




                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >


                            <Box textAlign={'left'} justifyContent={'left'}>
                                <Typography
                                    sx={{
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        padding: '8px',
                                        // borderRadius: '4px',
                                        '&:hover': {
                                            backgroundColor: '#f0f0f0',
                                            color: '#1976d2',
                                        },
                                        '&:focus': {
                                            outline: '2px solid #1976d2',
                                            outlineOffset: '2px',
                                        },
                                    }}
                                >
                                    Profile
                                </Typography>
                                <Typography
                                    sx={{
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        padding: '8px',
                                        // borderRadius: '4px',
                                        '&:hover': {
                                            backgroundColor: '#f0f0f0',
                                            color: '#1976d2',
                                        },
                                        '&:focus': {
                                            outline: '2px solid #1976d2',
                                            outlineOffset: '2px',
                                        },
                                    }}
                                >
                                    Dashboard
                                </Typography>
                                {token == null ? (
                                    <Typography
                                        onClick={loginUser}
                                        sx={{
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            padding: '8px',
                                            // borderRadius: '4px',
                                            '&:hover': {
                                                backgroundColor: '#f0f0f0',
                                                color: '#1976d2',
                                            },
                                            '&:focus': {
                                                outline: '2px solid #1976d2',
                                                outlineOffset: '2px',
                                            },
                                        }}
                                    >
                                        Login
                                    </Typography>
                                ) : (
                                    <Typography
                                        onClick={loggedout}
                                        sx={{
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            padding: '8px',
                                            // borderRadius: '4px',
                                            '&:hover': {
                                                backgroundColor: '#f0f0f0',
                                                color: '#1976d2',
                                            },
                                            '&:focus': {
                                                outline: '2px solid #1976d2',
                                                outlineOffset: '2px',
                                            },
                                        }}
                                    >
                                        Logout
                                    </Typography>
                                )}
                            </Box>

                            {/* <Box textAlign={'left'} margin={1} justifyContent={'left'} >
                                <Typography sx={{ textAlign: 'center', cursor: 'pointer', }}>Profile</Typography>
                                <Typography sx={{ textAlign: 'center', cursor: 'pointer', }}>Dashboard</Typography>
                                {!token ?
                                    <Typography onClick={loginUser} sx={{ textAlign: 'center', cursor: 'pointer', }}>Login</Typography>
                                    : <Typography onClick={loggedout} sx={{ textAlign: 'center', cursor: 'pointer', }}>Logout</Typography>
                                }
                            </Box> */}

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar
