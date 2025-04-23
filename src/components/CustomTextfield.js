import { TextField } from "@mui/material";

const CustomTextField = ({label, type, value, onChange, color, name}) => {
    return (
        <TextField
            fullWidth
            margin="normal"
            label={label}
            type={type}
            variant="standard"
            value={value}
            onChange={onChange}
            name={name}
            color={color}
        />
    );
}

export default CustomTextField;