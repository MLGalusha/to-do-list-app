import { useState } from "react";
import { Task } from "../types";
import("./styles/TaskItem.css");

interface TaskItemProps {
  task: Task;
  taskList: Task[];
  onModifyTaskList: (taskList: Task[]) => void;
}

function TaskItem({ task, taskList, onModifyTaskList }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [textEdit, setTextEdit] = useState<string>(task.text);
  function onDelete() {
    const newTaskList = taskList.filter((t) => t.id !== task.id);
    onModifyTaskList(newTaskList);
  }

  function saveEdit() {
    if (!textEdit.trim()) return;
    const newTaskList = taskList.map((t) => {
      if (t.id === task.id) {
        return { ...t, text: textEdit };
      } else {
        return t;
      }
    });
    onModifyTaskList(newTaskList);
    setIsEditing(false);
  }
  function completeTaskToggle() {
    const newTaskList = taskList.map((t) => {
      if (t.id === task.id) {
        return { ...t, completed: !task.completed };
      } else {
        return t;
      }
    });
    onModifyTaskList(newTaskList);
  }
  return (
    <div>
      <ul>
        {task.completed ? (
          <li
            className="completed-task"
            onDoubleClick={() => completeTaskToggle()}
          >
            {task.text.toUpperCase()} COMPLETED
          </li>
        ) : isEditing ? (
          <>
            <input
              type="text"
              value={textEdit}
              onChange={(e) => {
                if (e.target.value.trim()) {
                  setTextEdit(e.target.value);
                } else {
                  setTextEdit("");
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            />
            <button onClick={() => saveEdit()}>Save</button>
          </>
        ) : (
          <li>
            {task.text}
            <button onClick={() => onDelete()}>Delete</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => completeTaskToggle()}>◊</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default TaskItem;
