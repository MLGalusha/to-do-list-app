import { useState } from "react";
import { Task } from "../types";
import "./styles/TaskItem.css";

interface TaskItemProps {
  task: Task;
  taskList: Task[];
  onModifyTaskList: (taskList: Task[]) => void;
}

function TaskItem({ task, taskList, onModifyTaskList }: TaskItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task.text);

  function deleteTask() {
    const newTaskList = taskList.filter((t) => t.id !== task.id);
    onModifyTaskList(newTaskList);
  }

  function saveEdit() {
    if (!editText.trim()) return;

    const newTaskList = taskList.map((t) => {
      if (t.id === task.id) {
        return { ...task, text: editText };
      } else {
        return t;
      }
    });
    onModifyTaskList(newTaskList);
    setEditing(false);
  }

  function completeTask() {
    const newTaskList = taskList.map((t) => {
      if (t.id === task.id) {
        return { ...task, completed: true };
      } else {
        return t;
      }
    });
    onModifyTaskList(newTaskList);
  }
  return (
    <li>
      {task.completed ? (
        <div className="completed-task">
          {task.text.toUpperCase()} COMPLETED
        </div>
      ) : editing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
          />
          <button onClick={() => saveEdit()}>Save</button>
        </>
      ) : (
        <>
          {task.text}
          <button onClick={() => deleteTask()}>Delete</button>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => completeTask()}>◊</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
