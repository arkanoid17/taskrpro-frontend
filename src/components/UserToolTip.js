import { Popover, Typography, Box, Avatar, Divider, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import BusinessIcon from '@mui/icons-material/Business';

import { useEffect, useState } from "react";
import '../css/UserToolTip.css';

const UserToolTip = ({ open, anchorEl, handleClose, handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usr = JSON.parse(localStorage.getItem('user'));
    setUser(usr);
  }, []);

  
  const getFirstLetter = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {user ? (
        <Box display="flex" flexDirection="row" alignItems="center" className="user-details">
          
          {/* Circle Avatar with first letter */}
          <Avatar sx={{ bgcolor: 'primary.secondary', width: 36, height: 36 }}>
            {getFirstLetter(user.name)}
          </Avatar>

          <Box  alignItems="left" className="name-role-box">
          {/* Name and below details */}
          <Typography className="user-name">
            {user.name}
          </Typography>

          <Box display="flex" flexDirection="row" alignItems="left">
            <Typography
             className="role-subtitle">
                {user.employeeId || ''}
            </Typography>
            &nbsp;
            <Typography className="role-subtitle"> | </Typography>
            &nbsp;
            <Typography className="role-subtitle">
            {user.role || ''}
            </Typography>
          </Box>
          </Box>

        </Box>
      ) : (
        <Typography>No user data available</Typography>
      )}

      <Divider className="divider"/>

     <MenuItem disableRipple disableTouchRipple className="menu-item">
        <ListItemIcon>
            <AccountCircleOutlinedIcon className="menu-item-icon" />
        </ListItemIcon>
      <ListItemText primary="Profile"
        slotProps = {{
            primary: {
                className: 'menu-item-text',
              },
        }}
      />
      </MenuItem>

      <MenuItem disableRipple disableTouchRipple className="menu-item">
        <ListItemIcon>
            <BusinessIcon className="menu-item-icon" />
        </ListItemIcon>
      <ListItemText primary="Company Details"
        slotProps = {{
            primary: {
                className: 'menu-item-text',
              },
        }}
      />
      </MenuItem>

      <MenuItem disableRipple disableTouchRipple className="menu-item"
      onClick={handleLogout}>
        <ListItemIcon>
            <LogoutIcon className="menu-item-icon" />
        </ListItemIcon>
      <ListItemText primary="Sign Out"
        slotProps = {{
            primary: {
                className: 'menu-item-text',
              },
        }}
      />
      </MenuItem>

    </Popover>
  );
};

export default UserToolTip;
