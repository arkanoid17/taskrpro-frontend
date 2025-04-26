import { useState, useEffect } from "react";
import { Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import ApiCall from '../server/ApiCall.js';
import ServerConstants from "../server/ServerConstants.js";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../css/ApiSelect.css';

const ApiMultiSelect = ({ label, apiUrl, onChange }) => {
  const [selected, setSelectedItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOptions = async () => {
    ApiCall({
      url:apiUrl,
      method: "GET",
      data: null,
      headers: {},
      onSuccess: onSuccess,
      onError: onError
    });
  };

  const onSuccess = (data) => {
    const fetchedOptions = data['content'] || [];
    setOptions(fetchedOptions);
    setLoading(false);
  };

  const onError = (e) => {
    setOptions([]);
    setLoading(false);
    console.log(e);
  };

  useEffect(() => {
    fetchOptions();
  }, [apiUrl]);

  const handleChange = (event) => {
    const value = event.target.value;

    if (value.includes('all')) {
      if (selected.length === options.length) {
        setSelectedItems([]);
        onChange([]);
      } else {
        const allIds = options.map((opt) => opt.id);
        setSelectedItems(allIds);
        onChange(allIds);
      }
    } else {
      setSelectedItems(value);
      onChange(value);
    }
  };

  return (
    <div className="dropdown-box">
      <Select
        className="custom-select"
        multiple
        displayEmpty
        variant="standard"
        disableUnderline
        value={selected}
        onChange={handleChange}
        disabled={loading}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return label;
          }
          if (selected.length === options.length) {
            return 'All Selected';
          }
          const selectedOptions = options.filter(opt => selected.includes(opt.id));
          return selectedOptions.map(opt => opt.name).join(', ');
        }}
        IconComponent={ExpandMoreIcon}
      >
        <MenuItem value="all">
          <Checkbox
            checked={selected.length === options.length && options.length > 0}
            indeterminate={selected.length > 0 && selected.length < options.length}
          />
          <ListItemText primary="Select All" />
        </MenuItem>

        {options.map((option) => (
          <MenuItem key={option.id} value={option.id} className="custom-select-item">
            <Checkbox checked={selected.includes(option.id)} />
            <ListItemText primary={option.name} />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default ApiMultiSelect;
