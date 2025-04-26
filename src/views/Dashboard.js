import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import apiCall from '../server/ApiCall'; 
import ServerConstants from '../server/ServerConstants';
import SessionExpiredModal from "../components/SessionExpiredModal";


const Dashboard = () => {

    const navigate = useNavigate();
    const [sessionExpired, setSessionExpired] = useState(false);


    useEffect(() => {
        // Call API
        apiCall({
            url: ServerConstants.baseUrl+ServerConstants.me,
            method: 'GET',
            data: null,      
            headers: {},    
            onSuccess: handleSuccess,
            onError: handleError,
          });
      }, []); 

      const handleSuccess = (data) => {
        const user = JSON.stringify(data.user);
        const token = data.token;

        localStorage.setItem('user',user);
        localStorage.setItem('token',token);
      }

      const handleError = (e) => {
        console.log(e);
        setSessionExpired(true);
      }

      const handleLogout = () =>{
        localStorage.clear();
        navigate('/');
      }


    return (
       <div>

        <SessionExpiredModal
            open={sessionExpired}
            onLogout={handleLogout}
        />
       </div>
    );
}

export default Dashboard;