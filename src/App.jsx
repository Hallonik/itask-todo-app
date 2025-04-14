import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css'
import Navbar from './components/Navbar';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [Finishedtodos, setFinishedtodos] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        const parsed = JSON.parse(todoString);
        if (Array.isArray(parsed)) {
          setTodos(parsed);
        } else {
          console.warn("Invalid data in localStorage. Resetting...");
          setTodos([]);
        }
      } catch (e) {
        console.error("Failed to parse todos from localStorage:", e);
        setTodos([]);
      }
    }
  }, []);

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleEdit = (e, id) => {
    const todoToEdit = todos.find((t) => t.id === id);
    setTodo(todoToEdit.todo);
    setIsEditing(true);
    setEditId(id);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const toggleFinished = () => {
    setFinishedtodos(!Finishedtodos);
  };

  const handleAdd = () => {
    if (isEditing) {
      const updatedTodos = todos.map((t) =>
        t.id === editId ? { ...t, todo } : t
      );
      setTodos(updatedTodos);
      saveToLS(updatedTodos);
      setIsEditing(false);
      setEditId(null);
    } else {
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newTodos);
      saveToLS(newTodos);
    }

    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container xl:mx-auto xl:my-5 xl:rounded-xl p-10 bg-violet-100 xl:min-h-[85vh] xl:max-w-[45vw] mx-1 my-1 w-full min-h-[95vh] ">
        <h1 className="font-bold text-center text-2xl text-blue-900 my-2">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo flex flex-col gap-y-3">
          <h2 className="text-lg font-bold text-violet-800">Add a Todo</h2>
          <input
            type="text"
            className="w-full h-[45px] p-2 rounded-lg"
            onChange={handleChange}
            value={todo}
          />

          <button
            className="bg-violet-700 text-white p-3 py-1 rounded-lg text-sm font-bold hover:bg-violet-800 cursor-pointer"
            onClick={handleAdd}
            disabled={todo.length <= 1}
          >
            {isEditing ? "Update" : "Save"}
          </button>
        </div>

        <div className="my-4 ">
          <input
            type="checkbox"
            checked={Finishedtodos}
            onChange={toggleFinished}
          />{" "}
          Show Finished
        </div>

        <h2 className="text-lg font-bold text-violet-800 my-1">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && (
            <div className="text-sm text-gray-500">No Todos to display</div>
          )}

          {todos.map((item) => {
            return (
              (Finishedtodos || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex w-full justify-between m-3"
                >
                  <div className="flex gap-5 items-start justify-center">
                    <input
                      className="my-2"
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                    />
                    <div className="max-w-50 max-h-fit">
                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                  </div>
                  <div className="buttons flex h-full mx-5 cursor-pointer">
                    <button
                      className="bg-violet-700 text-white p-2 py-2 rounded-lg text-sm font-bold hover:bg-violet-800 mx-2"
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-violet-700 text-white p-2 py-2 rounded-lg text-sm font-bold hover:bg-violet-800 mx-2"
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                    >
                      <MdDeleteSweep />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
