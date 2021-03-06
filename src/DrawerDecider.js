import React from "react";
import Drawer from "@material-ui/core/Drawer";
import MyDrawer from "./MyDrawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: drawerWidth
  }
}));

function DrawerDecider(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { width, todos } = props;
  if (width === "xs") {
    return (
      <Drawer
        variant="temporary"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <MyDrawer todos={todos} changeSelectedDate={props.changeSelectedDate} />
      </Drawer>
    );
  } else {
    return (
      <Drawer
        classes={{
          paper: classes.drawerPaper
        }}
        variant="permanent"
        open
      >
        <MyDrawer todos={todos} changeSelectedDate={props.changeSelectedDate} />
      </Drawer>
    );
  }
}

export default DrawerDecider;
