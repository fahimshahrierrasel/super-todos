import React, { useState, useEffect } from "react";
import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar,
  withWidth,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import NewTodo from "./NewToDo";
import ToDoList from "./ToDoList";
import DrawerDecider from "./DrawerDecider";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  mainContent: {
    paddingTop: "50px"
  }
}));

function SuperTodo(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [todos, setTodos] = useState([]);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function addNewTodo(todo) {
    setTodos([...todos, { message: todo }]);
  }

  useEffect(() => {
    console.log(new Date());
  }, [todos, setTodos]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Super Todos
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <DrawerDecider
          width={props.width}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </nav>
      <main className={classes.content}>
        <div className={[classes.toolbar, classes.mainContent].join(" ")}>
          <NewTodo addNewTodo={addNewTodo} />
          <ToDoList todos={todos} />
        </div>
      </main>
    </div>
  );
}

export default withWidth()(SuperTodo);
