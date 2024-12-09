import React from "react";
import "./SubTask.css";

function SubTask({ newSubTasks, setNewSubTasks }) {
  // Handle changes to a subtask input field
  const handleSubTaskChange = (index, value) => {
    const updatedSubTasks = [...newSubTasks];
    updatedSubTasks[index] = value;
    setNewSubTasks(updatedSubTasks);
  };

  // Deleting a subtask
  const handleDeleteSubTask = (index) => {
    const updatedSubTasks = newSubTasks.filter((_, i) => i !== index);
    setNewSubTasks(updatedSubTasks);
  };

  return (
    <div>
      {newSubTasks.map((subTask, index) => (
        <div
          key={index}
          id="subtask-container"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <input
            placeholder={`Sub Task - ${index + 1}`}
            value={subTask}
            onChange={(e) => handleSubTaskChange(index, e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <span
            onClick={() => handleDeleteSubTask(index)}
            style={{ cursor: "pointer", color: "red" }}
          >
            Delete
          </span>
        </div>
      ))}
    </div>
  );
}

export default SubTask;
