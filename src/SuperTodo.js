import React, { useState, useEffect } from "react";
import uuidv4 from "@bundled-es-modules/uuid/v4.js";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar,
  withWidth,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import NewTodo from "./NewToDo";
import ToDoList from "./ToDoList";
import DrawerDecider from "./DrawerDecider";
import db from "./db";

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
    const newToDo = {
      id: uuidv4(),
      todo: todo,
      status: false,
      created_at: moment().format("DD-MM-YYYY")
    };
    db.table("todos")
      .add(newToDo)
      .then(() => {
        setTodos([...todos, newToDo]);
      });
  }

  function handleToggle(id) {
    const selectedToDo = todos[todos.findIndex(x => x.id === id)];
    const status = !selectedToDo.status;

    db.table("todos")
      .update(id, { status })
      .then(() => {
        setTodos(() =>
          todos.map(todo =>
            todo.id === id ? { ...todo, status: status } : todo
          )
        );
      });
  }

  function deleteTodo(id) {
    db.table("todos")
      .delete(id)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      });
  }

  useEffect(() => {
    db.table("todos")
      .toArray()
      .then(todos => {
        setTodos(todos);
      });
  }, [todos]);

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
          todos={todos}
        />
      </nav>
      <main className={classes.content}>
        <div className={[classes.toolbar, classes.mainContent].join(" ")}>
          <NewTodo addNewTodo={addNewTodo} />
          <ToDoList
            todos={todos}
            handleToggle={handleToggle}
            deleteToDo={deleteTodo}
          />
        </div>
      </main>
    </div>
  );
}

export default withWidth()(SuperTodo);
