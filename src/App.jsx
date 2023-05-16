import { useState } from "react";
import moon from "./assets/icon-moon.svg";
import sun from "./assets/icon-sun.svg";
import cross from "./assets/icon-cross.svg";
import todoLogo from "./assets/TODO.svg"; 
import "./App.css";


function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [isDay, setIsDay] = useState(true);

  

  function addTodo(e) {
    e.preventDefault();
    const newTodoText = e.target.elements.billAmounts.value;

    if (newTodoText.trim() === "") {
      return;
    }

    const newTodo = {
      id: Math.random(),
      text: newTodoText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    e.target.elements.billAmounts.value = "";
  }

  function toggleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function clearCompletedTodos() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  return (
    <div className={`App ${isDay ? "" : "night"}`}>
      <div className="header">
        <img className="todo_logo" src={todoLogo} alt="" />
        <img
          className="moon"
          src={isDay ? moon : sun}
          alt=""
          onClick={() => setIsDay(!isDay)}
        />
      </div>
      <form onSubmit={addTodo} className="create_todo_input_head">
        <button type="submit" className="check_button"></button>
        <input
          className="input_first"
          id="billAmounts"
          type="text"
          placeholder="Create a new todo…"
        />
      </form>
      <div className="container">
        {todos
          .filter((todo) => {
            if (filter === "ALL") return true;
            if (filter === "ACTIVE") return !todo.completed;
            if (filter === "COMPLETED") return todo.completed;
          })
          .map((todo, i) => (
            <>
              <div key={i} className="todo_list">
                <button
                  className={`check_button_2 ${
                    todo.completed ? "completed" : ""
                  }`}
                  onClick={() => toggleComplete(todo.id)}
                ></button>
                <h2
                  className={`todo_list_text ${
                    todo.completed ? "text_completed" : ""
                  }`}
                >
                  {todo.text}
                </h2>
                <img
                  className="cross"
                  src={cross}
                  alt=""
                  onClick={() => removeTodo(todo.id)}
                />
              </div>
              <div className="line_between"></div>
            </>
          ))}
        {todos.length > 0 && (
          <>
            <div className="container_bottom">
              <span className="span">
                {todos.filter((todo) => !todo.completed).length} items left
              </span>
              <button className="button_span" onClick={clearCompletedTodos}>
                Clear Completed
              </button>
            </div>
          </>
        )}
      </div>
      <div className="bottom_info_div">
        <button
          style={filter === "ALL" ? { color: "#3A7CFD" } : null}
          className="span_2"
          onClick={() => setFilter("ALL")}
        >
          All
        </button>
        <button
          style={filter === "ACTIVE" ? { color: "#3A7CFD" } : null}
          className="span_2"
          onClick={() => setFilter("ACTIVE")}
        >
          Active
        </button>
        <button
          style={filter === "COMPLETED" ? { color: "#3A7CFD" } : null}
          className="span_2"
          onClick={() => setFilter("COMPLETED")}
        >
          Completed
        </button>
      </div>
      <p className="footer_p">Drag and drop to reorder list</p>
    </div>
  );
}

export default App;
