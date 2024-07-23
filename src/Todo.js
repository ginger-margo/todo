import { useState } from "react";
import "./Todo.css";

function Todo() {
  const generateId = () => {
    return "id" + Math.random().toString(16).slice(2);
  };

  const [todo, setTodo] = useState([]);

  const [value, setValue] = useState("");

  const addTodo = () => {
    const newTodo = [
      ...todo,
      { title: value, checked: false, id: generateId() },
    ];
    if (value.trim() !== "") {
      setTodo(newTodo);
    }
    setValue("");
  };

  const deleteTodo = (id) => {
    const newTodo = todo.filter((item) => {
      return item.id !== id;
    });

    setTodo(newTodo);
  };

  const updateInput = (event) => {
    setValue(event.target.value);
  };
  const toggleTodo = (id) => {
    const newTodo = todo.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
        
      } else {
        return item;
      }
    });
    setTodo(newTodo);
  };

  return (
    <div className="container">
      <ul className="list">
        <li>
        <div className="addSection">
        <input
          placeholder="To conquer the world I need to..."
          value={value}
          onChange={updateInput}
          onKeyUp={(event) => {
            if (event.code === "Enter") {
              addTodo();
            }
          }}
        />
        <button onClick={addTodo}>+</button>
      </div>
        </li>
        {todo.map((item) => {
          return (
            <li key={item.id}>
              <input
                type="checkbox"
                class="hidden-box"
                id={item.id}
                checked={item.checked}
                onChange={() => toggleTodo(item.id)}
              />
              <label for={item.id} class="check--label" >
                <span class="check--label-box" ></span>
                <span class="check--label-text" >{item.title}</span>
              </label>
              <span
                className="deleteButton"
                onClick={() => deleteTodo(item.id)}
              >
                X
              </span>
              {/* <label>
                <input
                  className="hidden-box"
                  onChange={() => toggleTodo(item.id)}
                  type="checkbox"
                  checked={item.checked}
                />
                {item.title}
              </label>
              <span className="deleteButton" onClick={() => deleteTodo(item.id)}>X</span> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Todo;
