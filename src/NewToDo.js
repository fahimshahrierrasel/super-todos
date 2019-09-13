import React, { useState } from "react";
import { TextField } from "@material-ui/core";

function NewTodo(props) {
  const [toDoString, setToDoString] = useState("");

  function isEnterPressed(event) {
    if (event.key === "Enter") {
      setToDoString(() => {
        props.addNewTodo(toDoString);
        return "";
      });
    }
  }

  return (
    <div>
      <TextField
        id="new-todo"
        label="New ToDo"
        placeholder="Add new todo"
        value={toDoString}
        onChange={event => setToDoString(event.target.value)}
        onKeyDown={event => isEnterPressed(event)}
        margin="normal"
        fullWidth
        variant="outlined"
      />
    </div>
  );
}

export default NewTodo;
