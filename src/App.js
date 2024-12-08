import React, { useState } from "react";
import "./App.css";
import NewTask from "./components/NewTask";

const App = () => {
  const [newTask, setNewTask] = useState(false);
  const [taskName, setTaskName] = useState(""); // State for task name
  const [taskDescription, setTaskDescription] = useState("");

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
          />
        )}
      </div>
    </div>
  );
};

export default App;
