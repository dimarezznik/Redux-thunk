import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import InpField from "./InpField";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo, fetchAddTodo } from "./store/todoSlice";

function App() {
  const [text, setText] = useState("");
  const { status, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const addTask = () => {
    if (text.trim()) {
      dispatch(fetchAddTodo(text));
      setText("");
    }
  };

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  return (
    <div className="App">
      <InpField setText={setText} text={text} addTodo={addTask} />
      <TodoList />
      {status === "loading" && <h1>Loading</h1>}
      {error && <h1>Sorry, error: {error}</h1>}
    </div>
  );
}

export default App;
