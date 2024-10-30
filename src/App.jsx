import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useState } from "react";
import { addTodo, deleteTodo, editStatus, editTitle } from "./redux/Slice";

function App() {
  const todos = useSelector((state) => state.todos.todos);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addTodo(text));
    setText(""); 
  };

  const handleEditStatus = (id) => {
    dispatch(editStatus(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id) => {
    setShow(!show);
    setEditId(id);
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    dispatch(editTitle({ id: editId, EditText: editText }));
    setShow(false);
    setEditText(""); 
  };

  return (
    <div className="app">
      <div className="contanier">
        <form onSubmit={handleAdd} className="add-form">
          <input
            type="text"
            placeholder="Add a new task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${
              todo.completed ? "completed" : "incomplete"
            }`}>
            <h2>{todo.title}</h2>
            <p>{todo.completed ? "Completed" : "Incomplete"}</p>

            <button onClick={() => handleEdit(todo.id)}>
              {show ? "Dont Edit" : "Edit"}{" "}
            </button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button onClick={() => handleEditStatus(todo.id)}>
              Toggle Status
            </button>

            {show && editId === todo.id && (
              <form onSubmit={handleEditForm} className="edit-form">
                <input
                  type="text"
                  placeholder="Edit task"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button type="submit">Update</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
