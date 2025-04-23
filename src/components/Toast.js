import { Alert, Snackbar } from "@mui/material"

const Toast = ({message, severity = "info", duration = 3000, open, onClose }) => {
    return (
        <Snackbar
        onClose={onClose}
        open={open}
        autoHideDuration={duration}
        severity={severity}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert
            severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default Toast;