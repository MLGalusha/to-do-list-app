import { Task } from "../types";
import "./styles/Input.css";
import SearchIcon from "../assets/magnify.svg";
import { useEffect, useState } from "react";

interface TaskListFormProps {
  onAddTask: (task: Task) => void;
  taskText: string;
  setTaskText: (task: string) => void;
  onSetInputMode: (inputMode: "search" | "add") => void;
  inputMode: "search" | "add";
}

function TaskListForm({
  onAddTask,
  taskText,
  setTaskText,
  onSetInputMode,
  inputMode,
}: TaskListFormProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!taskText.trim()) return; // Return if blank space

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: taskText,
      completed: false,
    };
    onAddTask(newTask);
    console.log(newTask);
    setTaskText("");
  }
  // A "state" that toggles the animation
  const [expanded, setExpanded] = useState(false);
  const [triggerSwitch, setTriggerSwitch] = useState(false); // NEW STATE TO TRIGGER EFFECT

  // Effect to handle delay
  useEffect(() => {
    if (triggerSwitch) {
      const timeout = setTimeout(() => {
        onSetInputMode(inputMode === "search" ? "add" : "search");
        setTriggerSwitch(false); // Reset trigger
      }, 500); // 1 second delay

      return () => clearTimeout(timeout); // Cleanup
    }
  }, [triggerSwitch]); // Runs when `triggerSwitch` changes

  function handleButtonClick() {
    console.log("Before:", expanded);
    setExpanded(true);
    setTriggerSwitch(true); // Trigger useEffect
  }

  return (
    <form onSubmit={handleSubmit} className="search-add-form">
      {/* Wrap the button + input together */}
      <div
        className={`
            input-shadow
            ${inputMode}
          `}
      />
      <div className="button-input-wrapper">
        <input
          className={`text-input ${inputMode} ${expanded ? "animating" : ""}`}
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a task..."
        />
        <button
          type="button"
          className={`
            toggle-button
            ${inputMode}
            ${expanded ? "animating" : ""}
          `}
          onClick={handleButtonClick}
        >
          <img
            src={SearchIcon}
            className={`
            toggle-icon
            ${expanded ? "animating" : ""}`}
            alt="toggle"
          />
          <div
            className={`
            input-rectangle
            ${inputMode}
            ${expanded ? "animating" : ""}
          `}
          />
        </button>
      </div>
    </form>
  );
}

export default TaskListForm;
