import React from "react";
import { fetchDelete, fetchCheckbox } from "./store/todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ id, completed, title }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(fetchCheckbox(id))}
      />
      <span>{title}</span>
      <span
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => dispatch(fetchDelete({ id }))}
      >
        &times;
      </span>
    </li>
  );
};

export default TodoItem;
