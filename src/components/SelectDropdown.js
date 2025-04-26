import { Select, MenuItem, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import '../css/SelectDropdown.css';

const SelectDropdown = ({options, label, onChange}) => {

    const [selected,setSelectedItem] = useState(options[0])

    return (
        <div className="dropdown-box">
            {label}:
            &nbsp;
            <Select
                 className="custom-select"
                 variant="standard"
                 disableUnderline
                 value={selected}
                 label={label}
                 IconComponent={ExpandMoreIcon}
                 onChange={(e) => {
                    setSelectedItem(e.target.value);
                    onChange(e.target.value);
                }}
            >

                {options.map((option) => (
                          <MenuItem key={option} value={option} className="custom-select-item">
                            {option}
                          </MenuItem>
                        ))}

            </Select>

        </div>
    );
}

export default SelectDropdown;