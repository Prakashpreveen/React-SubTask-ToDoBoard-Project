import React, { useState } from "react";
import "./NewTask.css";
import SubTask from "./SubTask";

const NewTask = ({
  taskName,
  setNewTask,
  setTaskName,
  taskDescription,
  setTaskDescription,
}) => {
  const [subTask, setSubTask] = useState(false);
  const [newSubTasks, setNewSubTasks] = useState([]);

  const SubTaskHandler = () => {
    setNewSubTasks((prevSubTasks) => [...prevSubTasks, ""]); // Add a new empty subtask
  };

  return (
    <>
      <div id="overlay" onClick={() => setNewTask(false)} />
      <div id="newtask-form">
        <input
          className="project-name"
          type="text"
          placeholder="Project Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <textarea
          className="project-desc"
          placeholder="Project Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <>
          <button className="subtaskBtn" onClick={SubTaskHandler}>
            + Task
          </button>
        </>
        <SubTask newSubTasks={newSubTasks} setNewSubTasks={setNewSubTasks} />
      </div>
    </>
  );
};

export default NewTask;
