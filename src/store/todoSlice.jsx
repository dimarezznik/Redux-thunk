import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk(
  "todos/fetchTodo",

  async function (_, { rejectWithValue }) {
    try {
      const res = await fetch("http://jsonplaceholder.typicode.com/todos");
      if (!res.ok) {
        throw new Error("Some Error!");
      }
      const data = res.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchDelete = createAsyncThunk(
  "todos/fetchDelete",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const res = await fetch(
        `http://jsonplaceholder.typicode.com/todos/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        throw new Error("Delete Error!");
      }
      dispatch(deleteTodo(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCheckbox = createAsyncThunk(
  "todos/fetchCheckbox",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    try {
      const res = await fetch(
        `http://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Toggle Error!");
      }

      dispatch(changeCheckbox({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAddTodo = createAsyncThunk(
  "todos/fetchAddTodo",
  async function (text, { rejectWithValue, dispatch }) {
    const todo = {
      title: text,
      userId: 1,
      completed: false,
    };

    try {
      const res = await fetch("http://jsonplaceholder.typicode.com/todos/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const data = await res.json();

      dispatch(addTodo(data));
    } catch (error) {}
  }
);

const setError = (state, action) => {
  state.status = " rejected";
  state.error = action.payload;
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.unshift(action.payload);
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    changeCheckbox(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      toggledTodo.completed = !toggledTodo.completed;
    },
  },
  extraReducers: {
    [fetchTodo.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTodo.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [fetchTodo.rejected]: setError,
    [fetchDelete.rejected]: setError,
    [fetchCheckbox.rejected]: setError,
  },
});

const { addTodo, deleteTodo, changeCheckbox } = todoSlice.actions;

export default todoSlice.reducer;
