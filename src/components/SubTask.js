import React from "react";
import "./SubTask.css";

function SubTask({ newSubTasks, setNewSubTasks }) {
  // HANDLE NEW-SUBTASK:
  const handleSubTaskChange = (index, value) => {
    const updatedSubTasks = [...newSubTasks];
    updatedSubTasks[index] = value;
    setNewSubTasks(updatedSubTasks);
  };

  // DELETING SUBTASK:
  const handleDeleteSubTask = (index) => {
    const updatedSubTasks = newSubTasks.filter((_, i) => i !== index);
    setNewSubTasks(updatedSubTasks);
  };

  return (
    <div>
      {newSubTasks.map((subTask, index) => (
        <div id="subtask-container">
          <input
            key={index}
            placeholder={`SubTask - ${index + 1}`}
            value={subTask}
            onChange={(e) => handleSubTaskChange(index, e.target.value)}
          />
          <span onClick={() => handleDeleteSubTask(index)}>Delete</span>
        </div>
      ))}
    </div>
  );
}

export default SubTask;
