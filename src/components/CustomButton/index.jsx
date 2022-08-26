import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

function CustomButton(props) {
  const { children, ...restProps } = props;

  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      sx={{ mb: 2 }}
      {...restProps}
    >
      {children}
    </Button>
  );
}

CustomButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
};

export default CustomButton;
