import { useState, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
import ApiCall from '../server/ApiCall.js';
import ServerConstants from "../server/ServerConstants.js";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../css/ApiSelect.css';

const ApiSelect = ({label, apiUrl, onChange}) => {
    const [selected,setSelectedItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOptions = async () => {

    ApiCall({
        url: ServerConstants.baseUrl+ServerConstants.projects,
        method:"GET",
        data:null,
        headers:{},
        onSuccess: onSuccess,
        onError: onError
    });

    
  
  };

  const onSuccess = (data) => {
    const options = data['content']
    if(options!==null && options.length!==0){
        setOptions(options);
        setSelectedItem(options[0]);
        onChange(options[0].id);
    }
    setLoading(false);
  }
  const onError = (e) => {
    setOptions([]);
    
    setLoading(false);
    console.log(e);
  }

  useEffect(() => {
    fetchOptions();
  }, [apiUrl]);

  return (
     <div className="dropdown-box">
         <Select
         className="custom-select"
        variant="standard"
        disableUnderline
        value={selected!=null?selected.id:null}
        label={label}
        onChange={(e) => {
            const op = options.find(prj => prj.id == e.target.value);
            setSelectedItem(op);
            onChange(e.target.value);
        }}
        disabled={loading}
        IconComponent={ExpandMoreIcon}
      >
        
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id} className="custom-select-item">
            {option.name}
          </MenuItem>
        ))}
        </Select>
     </div>
  );
};

export default ApiSelect;
