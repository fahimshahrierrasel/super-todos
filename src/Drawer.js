import React from "react";

import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Badge
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar
}));

function MyDrawer() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["Today"].map((text, index) => (
          <ListItem button key={text}>
            <Badge color="primary" badgeContent={index}>
              <ListItemText primary={text} />
            </Badge>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default MyDrawer;
