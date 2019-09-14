import React, { useState } from "react";
import { TextField } from "@material-ui/core";

function NewTodo(props) {
  const [toDoString, setToDoString] = useState("");
  const [hasError, setHasError] = useState(false);

  function isEnterPressed(event) {
    if (event.key === "Enter") {
      if (toDoString.length <= 0) {
        setHasError(true);
        return;
      }
      setToDoString(() => {
        props.addNewTodo(toDoString);
        return "";
      });
    }
    setHasError(false);
  }

  return (
    <div>
      <TextField
        error={hasError}
        id="new-todo"
        label="New ToDo"
        placeholder="Add new todo"
        value={toDoString}
        onChange={event => setToDoString(event.target.value)}
        onKeyDown={event => isEnterPressed(event)}
        margin="normal"
        fullWidth
        variant="outlined"
        helperText={hasError ? "New ToDo item can not be empty!!" : ""}
      />
    </div>
  );
}

export default NewTodo;
