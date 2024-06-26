// src/app/components/Todo.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddForm from "./AddForm";
import {
  deleteTodo,
  markAsDone,
  editTodo,
} from "../../features/todo/todoSlice";

export default function Todo() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  const markHandle = (id) => {
    dispatch(markAsDone(id));
  };

  const deleteHandle = (id) => {
    dispatch(deleteTodo(id));
  };

  const submitEditHandler = (event) => {
    event.preventDefault();
    dispatch(editTodo({ id: editId, task: editTask }));
    setEditId(null);
    setEditTask("");
  };

  return (
    <div className="container mt-4">
      <AddForm />

      <h2 className="text-center mb-4">Todo List App</h2>

      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editId === todo.id ? (
              <form className="input-group" onSubmit={submitEditHandler}>
                <input
                  type="text"
                  className="form-control"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button type="submit" className="btn btn-outline-primary ms-1">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary ms-1"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span
                  className={`task-text ${
                    todo.isDone ? "text-decoration-line-through" : ""
                  }`}
                >
                  {todo.task}
                </span>
                <div>
                  <button
                    onClick={() => markHandle(todo.id)}
                    className={`btn btn-sm ${
                      todo.isDone ? "btn-outline-success" : "btn-outline-dark"
                    } mx-1`}
                  >
                    Mark as Done
                  </button>
                  <button
                    onClick={() => deleteHandle(todo.id)}
                    className="btn btn-sm btn-outline-danger mx-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditId(todo.id);
                      setEditTask(todo.task);
                    }}
                    className="btn btn-sm btn-outline-secondary mx-1"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
