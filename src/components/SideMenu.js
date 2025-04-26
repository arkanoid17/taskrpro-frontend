import { Drawer, List, ListItem, ListItemText, Divider, Box, IconButton, Tooltip } from "@mui/material";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import TaskIcon from '@mui/icons-material/Assignment';
import TaskOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import TimelineIcon from '@mui/icons-material/ViewTimeline';
import TimelineOutlinedIcon from '@mui/icons-material/ViewTimelineOutlined';
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import '../css/SideMenu.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";




const SideMenu = ({ open, collapsed, toggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedItem, setSelectedItem] = useState('tasks');

  const handleMenuClick = (route) => {
    setSelectedItem(route);  // update selected item
    navigate(`/dashboard/${route}`);  // navigate to route
  };

  useEffect(() => {
    const path = location.pathname.split('/')[2]; // e.g., dashboard/tasks => 'tasks'
    if (path) {
      setSelectedItem(path);
    }else{
      setSelectedItem('tasks');
      navigate('/dashboard/tasks')
    }
  }, [location.pathname]);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={collapsed ? 'drawer drawer-collapsed' : 'drawer drawer-expanded'}
    >
      <Box sx={{ overflow: 'auto' }}>
        {/* Collapse / Expand Button */}
        <Box sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', p: 1 }}>
          <IconButton onClick={toggleCollapse}>
            {collapsed ? <MenuIcon className="selected-icon" /> : <MenuOpenIcon className="unselected-icon" />}
          </IconButton>
        </Box>

        <List>

          {/* Tasks */}
          <ListItem 
            button 
            onClick={() => handleMenuClick('tasks')}
            selected={selectedItem === 'tasks'}
          >
            <Tooltip title={!collapsed ? "" : "Tasks"} placement="right">
              {selectedItem==='tasks'?<TaskIcon className="selected-icon" />:<TaskOutlinedIcon className="unselected-icon"/>}
            </Tooltip>
            {!collapsed && (
              <ListItemText primary="Tasks"  
              slotProps={{
                primary: {
                  className: selectedItem === 'tasks' ? 'selected-text' : 'unselected-text',
                },
              }}/>
            )}
          </ListItem>
          <Divider />

          {/* Timeline */}
          <ListItem 
            button 
            onClick={() => handleMenuClick('timeline')}
            selected={selectedItem === 'timeline'}
          >
            <Tooltip title={!collapsed ? "" : "Timeline"} placement="right">
            {selectedItem==='timeline'?<TimelineIcon className="selected-icon"/>:<TimelineOutlinedIcon className="unselected-icon"/>}
            </Tooltip>
            {!collapsed && (
              <ListItemText primary="Timeline" 
              slotProps={{
                primary: {
                  className: selectedItem === 'timeline' ? 'selected-text' : 'unselected-text',
                },
              }} />
            )}
          </ListItem>
          <Divider />

          {/* Users */}
          <ListItem 
            button 
            onClick={() => handleMenuClick('users')}
            selected={selectedItem === 'users'}
          >
            <Tooltip title={!collapsed ? "" : "Users"} placement="right">
            {selectedItem==='users'?<PeopleIcon className="selected-icon" />:<PeopleOutlinedIcon  className="unselected-icon"/>}
            </Tooltip>
            {!collapsed && (
              <ListItemText primary="Users" 
              slotProps={{
                primary: {
                  className: selectedItem === 'users' ? 'selected-text' : 'unselected-text',
                },
              }}/>
            )}
          </ListItem>

        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
