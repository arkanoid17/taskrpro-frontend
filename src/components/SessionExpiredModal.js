import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const SessionExpiredModal = ({open, onLogout }) => {

    const handleClose = (event, reason) => {
        // Prevent closing by backdrop click or pressing escape
        return;
      };

  return (
    <Dialog open={open} onClose={handleClose} sx={{padding:"20px"}}>
      <DialogTitle>Session Expired</DialogTitle>
      <DialogContent>
        <Typography>Your session has expired. Please log in again.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onLogout} variant="contained" color="secondary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionExpiredModal;
