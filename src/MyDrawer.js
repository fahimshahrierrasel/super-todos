import React from "react";
import moment from 'moment';

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
  const itemDate = moment(item.created_at).format("DD-MM-YYYY")
  if (acc[itemDate]) acc[itemDate] += 1;
  else acc[itemDate] = 1;
  return acc;
}

function changeDate(date) {
  let day = "Today";
  const today = moment();
  switch (date) {
    case today.format("DD-MM-YYYY"):
      day = "Today";
      break;
    case today.subtract(1, 'days').format("DD-MM-YYYY"):
      day = "Yesterday";
      break;
    default:
      day = date;
  }
  return day;
}

function MyDrawer({ todos, changeSelectedDate }) {
  const classes = useStyles();

  const dateObject = todos.reduce(reducerMethod, {});
  const dates = Object.keys(dateObject).sort((a, b) => {
    return moment(a, "DD-MM-YYYY") - moment(b, "DD-MM-YYYY");
  }).reverse();

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {dates.map(date => (
          <ListItem button key={date} onClick={() => changeSelectedDate(date)}>
            <Badge color="primary" badgeContent={dateObject[date]}>
              <ListItemText primary={changeDate(date)} />
            </Badge>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default MyDrawer;
