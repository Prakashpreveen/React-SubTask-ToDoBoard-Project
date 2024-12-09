import React, { useState } from "react";
import "./App.css";
import NewTask from "./components/NewTask";
import ToDo from "./components/ToDo";

const App = () => {
  const [newTask, setNewTask] = useState(false);
  const [taskName, setTaskName] = useState(""); // State for task name
  const [taskDescription, setTaskDescription] = useState("");
  const [newSubTasks, setNewSubTasks] = useState([]);
  const [showToDo, setShowToDo] = useState(false);

  return (
    <div id="container">
      <div id="top-navbar">
        <h1>LOGO</h1>
        <h1>TITLE</h1>
        <button id="newtaskbtn" onClick={() => setNewTask(true)}>
          + New Task
        </button>
      </div>

      <div id="left-navbar">
        <h1>NAVBAR ITEM 1</h1>
        <h1>NAVBAR ITEM 2</h1>
        <h1>NAVBAR ITEM 3</h1>
      </div>
      <div id="main-content">
        {newTask && (
          <NewTask
            taskName={taskName}
            setTaskName={setTaskName}
            setNewTask={setNewTask}
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
            newSubTasks={newSubTasks}
            setNewSubTasks={setNewSubTasks}
            setShowToDo={setShowToDo}
          />
        )}
        {showToDo && (
          <div id="todo-container">
            <h1 style={{ fontSize: "40px", marginTop: "0px" }}>{taskName}</h1>
            <p style={{ fontSize: "15px" }}>{taskDescription}</p>
            {newSubTasks.length > 0 && (
              <ul className="subtask-value">
                {newSubTasks.map((subtask, index) => (
                  <li key={index}>
                    <input type="checkbox" id={`subtask-${index}`} />
                    <label htmlFor={`subtask-${index}`}>{subtask}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
