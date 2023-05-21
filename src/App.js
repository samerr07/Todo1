import React, { useState} from "react";
import './App.css';
import {AiFillDelete,AiOutlineUndo,AiOutlineSearch,AiOutlineArrowUp,AiOutlineArrowDown} from "react-icons/ai"
import {MdDoneAll} from "react-icons/md"



function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSelectItem = (id) => {
    setSelectedItem(id === selectedItem ? null : id);
    // setEditingItem(null);
  };

  
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
     
        handleAddTodo();
      
    } else if (e.key === 'Delete') {
      if (selectedItem) {
        handleDeleteTodo(selectedItem);
      } else if (todos.length > 0) {
        handleDeleteTodo(todos[todos.length - 1].id);
      }
    } else if (e.key === 'ArrowUp') {
      if (selectedItem) {
        moveItemUp(selectedItem);
      }
    } else if (e.key === 'ArrowDown') {
      if (selectedItem) {
        moveItemDown(selectedItem);
      }
    }
  };

  

  const moveItemUp = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index > 0) {
      const updatedTodos = [...todos];
      const temp = updatedTodos[index];
      updatedTodos[index] = updatedTodos[index - 1];
      updatedTodos[index - 1] = temp;
      setTodos(updatedTodos);
    }
  };

  const moveItemDown = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index < todos.length - 1) {
      const updatedTodos = [...todos];
      const temp = updatedTodos[index];
      updatedTodos[index] = updatedTodos[index + 1];
      updatedTodos[index + 1] = temp;
      setTodos(updatedTodos);
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    return todo.text.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  return (
    <div className="container">

    
    <div className="todo-app">
    <h1>Todo App</h1>
    <div className="add-todo">
      <input
        className="add"
        type="text"
        placeholder="Add new todo"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button className="addBtn" onClick={handleAddTodo}>Add</button>
    </div>
    <div className="search">
        <input
          className="serch"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="serBtn"><AiOutlineSearch size={20}/></button>
      </div>
  
    <div className="todo-list">
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className={`todo-item ${todo.completed ? "completed" : ""} ${
            todo.id === selectedItem ? "selected" : ""
          }`}
          onClick={() => handleSelectItem(todo.id)}
        >
          <span className="todo-text">{todo.text}</span>
          <div className="todo-actions">
            <button
              className="toggle"
              onClick={() => handleToggleTodo(todo.id)}
            >
              {todo.completed ? <AiOutlineUndo size={18}/> : <MdDoneAll size={18}/>}
            </button>
            <button
              className="delete"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <span><AiFillDelete size={18}/></span>
            </button>
            {/* <button className="edit" onClick={() => handleStartEdit(todo.id, todo.text)}>
                Edit
              </button> */}
            <button className="up" onClick={() => moveItemUp(todo.id)}><AiOutlineArrowUp size={18}/></button>
            <button className="up" onClick={() => moveItemDown(todo.id)}><AiOutlineArrowDown size={18}/></button>
          </div>
        </div>
      ))}
    </div>
    <div className="todo-stats">
      <p>
        Total: {todos.length} | Completed: {completedCount}
      </p>
    </div>
  </div>
  </div>
  );
}

export default App;
