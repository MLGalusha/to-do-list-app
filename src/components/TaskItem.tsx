import { useState, useEffect } from "react";
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
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [triggerSwitch, setTriggerSwitch] = useState<boolean>(false);

  useEffect(() => {
    if (triggerSwitch) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        const newTaskList = taskList.map((t) => {
          if (t.id === task.id) {
            return { ...t, completed: !task.completed };
          } else {
            return t;
          }
        });
        onModifyTaskList(newTaskList);
        setTriggerSwitch(false);
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [triggerSwitch]);

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
    setIsEditing(false);
    onModifyTaskList(newTaskList);
  }

  function taskToggle() {
    setTriggerSwitch(true);
  }

  return (
    <div>
      <ul>
        <div className="contain-list-item">
          {task.completed ? (
            <div
              className={`tan task-item ${
                isAnimating ? "animating" : "start-animating"
              }`}
            >
              <div className="list-text">{task.text}</div>
              <div
                className={`fade-red-orange sliding-rect ${
                  isAnimating ? "animating" : "start-animating"
                }`}
                onClick={() => taskToggle()}
              />
              <div
                className={`red-orange-drip-svg toggle-complete ${
                  isAnimating ? "animating" : "start-animating"
                }`}
                onClick={() => taskToggle()}
              />
            </div>
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
            <div
              className={`red-orange task-item ${
                isAnimating ? "animating" : "start-animating"
              }`}
            >
              <div className="list-text">{task.text}</div>
              {/* <button className="delete-task-button" onClick={() => onDelete()}>
                Delete
              </button>
              <button
                className="edit-task-button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button> */}
              <div
                className={`fade-tan sliding-rect ${
                  isAnimating ? "animating" : "start-animating"
                }`}
                onClick={() => taskToggle()}
              />
              <div
                className={`tan-drip-svg toggle-complete ${
                  isAnimating ? "animating" : ""
                }`}
                onClick={() => taskToggle()}
              />
            </div>
          )}
        </div>
      </ul>
    </div>
  );
}

export default TaskItem;
