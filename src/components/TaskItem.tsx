import { useState } from "react";
import { Task } from "../types";
import "./styles/TaskItem.css";

interface TaskItemProps {
  task: Task;
  taskList: Task[];
  onModifyTaskList: (newTaskList: Task[]) => void;
}

function TaskItem({ task, taskList, onModifyTaskList }: TaskItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState(task.text);

  function deleteTask() {
    const newTaskList = taskList.filter((t) => t.id !== task.id);
    onModifyTaskList(newTaskList);
  }

  function saveEdit() {
    if (!editText.trim()) return;
    const updatedTaskList = taskList.map((t) =>
      t.id === task.id ? { ...t, text: editText } : t
    );
    onModifyTaskList(updatedTaskList);
    setEditing(false);
  }

  function completeTask() {
    const updatedTaskList = taskList.map((t) =>
      t.id === task.id ? { ...t, completed: true } : t
    );
    onModifyTaskList(updatedTaskList);
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
