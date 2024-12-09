import React, { useState, useRef, useEffect } from "react";
import "./NewTask.css";
import SubTask from "./SubTask";

const NewTask = ({
  taskName,
  setNewTask,
  setTaskName,
  taskDescription,
  setTaskDescription,
  newSubTasks,
  setNewSubTasks,
  setShowToDo,
}) => {
  const MyRef = useRef();
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    MyRef.current.focus();
  }, []);

  const SubTaskHandler = () => {
    setNewSubTasks((prevSubTasks) => [...prevSubTasks, ""]); // Add a new empty subtask
  };

  const AddTaskHandler = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !taskDescription.trim()) {
      setIsFormValid(false);
      return;
    } else {
      setNewTask(false);
      setIsFormValid(true);
      setShowToDo(true);
    }
  };

  return (
    <>
      <div id="overlay" onClick={() => setNewTask(false)} />
      <div id="newtask-form">
        <input
          ref={MyRef}
          className="project-name"
          type="text"
          placeholder="Project Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value.toUpperCase())}
          required
          style={{
            borderColor: isFormValid || taskName.trim() ? "grey" : "red",
          }}
        />
        <textarea
          className="project-desc"
          placeholder="Project Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          style={{
            borderColor: isFormValid || taskDescription.trim() ? "grey" : "red",
          }}
        />
        <>
          <button className="subtaskBtn" onClick={SubTaskHandler}>
            + Task
          </button>
        </>
        <SubTask newSubTasks={newSubTasks} setNewSubTasks={setNewSubTasks} />
        <button onClick={AddTaskHandler} className="addtaskBtn">
          ADD TASK
        </button>
      </div>
    </>
  );
};

export default NewTask;
