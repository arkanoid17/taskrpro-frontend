import { Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import apiCall from '../server/ApiCall'; 
import ServerConstants from '../server/ServerConstants';
import SessionExpiredModal from "../components/SessionExpiredModal";
import MyToolbar from "../components/MyToolbar";
import SideMenu from "../components/SideMenu";
import { waitFor } from '@testing-library/dom';

const Dashboard = () => {

    const navigate = useNavigate();
    const [sessionExpired, setSessionExpired] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        apiCall({
            url: ServerConstants.baseUrl + ServerConstants.me,
            method: 'GET',
            data: null,      
            headers: {},    
            onSuccess: handleSuccess,
            onError: handleError,
        });
    }, []); 

    const handleSuccess = (data) => {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
    };

    const handleError = (e) => {
        console.log(e);
        setSessionExpired(true);
    };

    const handleLogout = async() => {
        localStorage.clear();
        window.location.reload();
    };

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    

    return (
        <div style={{ display: 'flex' }}>
            <SideMenu collapsed={collapsed} toggleCollapse={toggleCollapse} />
            <div style={{ flexGrow: 1 }}>
                <MyToolbar handleMenuClick={toggleCollapse} handleLogout={handleLogout}/>
                
                {/* Page content will change here */}
                <div style={{ padding: 20 }}>
                    <Outlet />
                </div>
            </div>

            <SessionExpiredModal
                open={sessionExpired}
                onLogout={handleLogout}
            />
        </div>
    );
}

export default Dashboard;
