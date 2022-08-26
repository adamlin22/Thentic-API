import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Header from "../Header";

function Layout(props) {
  const { children } = props;

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Box component="main" sx={{ p: 3, width: "100%" }}>
        <Toolbar />
        <Box sx={{ width: "50%", mx: "25%", mt: "50px" }}>{children}</Box>
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
