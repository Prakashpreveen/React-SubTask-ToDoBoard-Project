import React, { useState, useEffect } from "react";
import "./App.css";
import NewTask from "./components/NewTask";
import Timer from "./components/Timer";

const LOCAL_STORAGE_KEY = "todos";

const App = () => {
  const [newTask, setNewTask] = useState(false);
  const [tasks, setTasks] = useState([]); // Array to hold all tasks

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Function to add a new task
  const addTask = (taskName, taskDescription, newSubTasks) => {
    const newTask = {
      name: taskName,
      description: taskDescription,
      subTasks: newSubTasks.map((subtask) => ({
        name: subtask,
        completed: false, // Initialize completed state
      })),
      isVisible: true, // Track visibility
    };
    const updatedTasks = [...tasks, newTask]; // Add the new task to the array
    setTasks(updatedTasks); // Update state
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks)); // Save to local storage
    setNewTask(false); // Close the New Task form
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Remove task at index
    setTasks(updatedTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks)); // Update local storage
  };

  // Function to toggle subtask completion
  const toggleSubTaskCompletion = (taskIndex, subIndex) => {
    const updatedTasks = [...tasks];

    if (updatedTasks[taskIndex] && updatedTasks[taskIndex].subTasks[subIndex]) {
      updatedTasks[taskIndex].subTasks[subIndex].completed =
        !updatedTasks[taskIndex].subTasks[subIndex].completed; // Toggle completion state
      setTasks(updatedTasks);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks)); // Update local storage
    }
  };

  // Function to toggle visibility of task details
  const toggleVisibility = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isVisible = !updatedTasks[index].isVisible; // Toggle visibility state
    setTasks(updatedTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks)); // Update local storage
  };

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
            addTask={addTask} // Pass the addTask function to NewTask
            setNewTask={setNewTask}
          />
        )}
        {tasks.map((task, taskIndex) => (
          <div key={taskIndex} id="todo-container">
            <h1 style={{ fontSize: "40px", marginTop: "0px" }}>
              <span>
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  id={`task-${taskIndex}`}
                  onChange={() => toggleVisibility(taskIndex)} // Toggle visibility on checkbox change
                />
                <label htmlFor={`task-${taskIndex}`}>{task.name}</label>
              </span>
            </h1>

            {/* Conditionally render task details based on visibility */}
            {task.isVisible && (
              <>
                <p style={{ fontSize: "15px" }}>{task.description}</p>

                <Timer />
                {task.subTasks.length > 0 && (
                  <ul className="subtask-value">
                    {task.subTasks.map((subtask, subIndex) => (
                      <li key={subIndex}>
                        <input
                          type="checkbox"
                          id={`subtask-${taskIndex}-${subIndex}`}
                          checked={subtask.completed}
                          onChange={() =>
                            toggleSubTaskCompletion(taskIndex, subIndex)
                          }
                        />
                        <label
                          htmlFor={`subtask-${taskIndex}-${subIndex}`}
                          className={subtask.completed ? "completed" : ""}
                        >
                          {subtask.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            <span className="spanBtn" onClick={() => deleteTask(taskIndex)}>
              DELETE
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
