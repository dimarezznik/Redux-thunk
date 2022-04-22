import React from "react";

const InpField = ({ setText, addTodo, text }) => {
  return (
    <label>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
    </label>
  );
};

export default InpField;
