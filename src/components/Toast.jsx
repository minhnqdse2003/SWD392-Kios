import { Alert, Slide, Snackbar } from "@mui/material";
import React, { useState } from "react";

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const Toast = ({ open, message, severity }) => {
  const [isOpen, setIsOpen] = useState(open);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={onClose}
      transitionDuration={500}
      TransitionComponent={TransitionLeft}
    >
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
