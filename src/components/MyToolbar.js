import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import UserToolTip from './UserToolTip';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { useState } from 'react';



const logo = '/assets/logo.png';

const MyToolbar = ({handleLogout}) =>{

    const [openPopover, setOpenPopover] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);


    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget); 
        setOpenPopover(true);
    }

    const handleClose = () => {
        setOpenPopover(false); // Close the popover
        setAnchorEl(null); // Reset the anchor element
      };

    return (
        <AppBar position="static" elevation={0}>
            <Toolbar sx={{ minHeight: '48px !important' }}>
            <Box sx={{display:'flex', flexGrow:1}}>
                <img 
                    alt="TaskrPro Logo"
                    width={22}
                    height={22}
                    src={logo}
                    style={{ marginRight: 8 }}
                />
                <Typography  >
                    TaskrPro
                </Typography>
            </Box>


                <IconButton color='secondary' onClick={handleClick} disableRipple>
                    <AccountCircleOutlinedIcon />
                </IconButton>
            
            <UserToolTip 
                open={openPopover}
                anchorEl={anchorEl}
                handleClose={handleClose}
                handleLogout={handleLogout}
            />

               
            
               
            
        </Toolbar>
        </AppBar>
        
    );
}

export default MyToolbar;