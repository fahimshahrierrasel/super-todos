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

function reducerMethod(acc, item) {
  if (acc[item.created_at]) acc[item.created_at] += 1;
  else acc[item.created_at] = 1;
  return acc;
}

function MyDrawer({ todos }) {
  const classes = useStyles();

  const dates = todos.reduce(reducerMethod, {});

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {Object.keys(dates).map((key, index) => (
          <ListItem button key={key}>
            <Badge color="primary" badgeContent={dates[key]}>
              <ListItemText primary={key} />
            </Badge>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default MyDrawer;
