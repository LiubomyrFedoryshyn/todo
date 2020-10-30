import React from "react"; // import React, { useState } from 'react'; - so you can use useState manualy; 

import "./App.css";

function Todo({ todo, index, completeTodo, removeTodo }) { // It woould be better if you move this function to a separate component;
  return (
    <div
      className="todo" //  className={'todo', todo.isComlete && 'line-througth'}, and write to class 'line-througth' some styles in css
      // when the item is crossed
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }} // inline-styles, bad practise
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button> 
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}


// start with an empty state for an input field
// be able to update the form by setting the state
// handle the submit
function TodoForm({ addTodo }) { // also, separate component
  // srtting the state 
  const [value, setValue] = React.useState(""); // const [value, setValue] = useState(""); - if you have imports above

  // adding item to the list by pressing ENTER 
  // or add nothing if nothing is typed in the field
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return; // if (value) { addTodo(value); setValue('') };
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  // totos - name of the state, setTodos - used to set the state.
  const [todos, setTodos] = React.useState([ // same imports
    {
      text: "Add an item to your TODO List",
      // set that to false to begin with and, when prompted, it will change that to true
      isCompleted: false
    }
  ]);

  // grab existing list of items, add the new item and display the new list
  const addTodo = text => {
    // ... - copy the list so you are able to add the new item
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true; //  newTodos[index].isCompleted = !newTodos[index].isCompleted, toggler is better here, so we can undo some completed stuff
    setTodos(newTodos);
  };
  // COMPONENT FOR DELETING ITEMS
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1); //it would be better to use a 'filter' method instead of 'slice' 
    setTodos(newTodos);
  };

  return (
    // creating the list of items
    // map() allows to create a new array by maooing over the todo items 
    // from state and displaying them by index
    <div className="app">
      <div className="todo-list"> 
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
