import { Task } from "../types";
import "./styles/Input.css";
import SearchIcon from "../assets/magnify.svg";
import { useState } from "react";

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

  function handleButtonClick() {
    // Trigger the entire animation
    setExpanded(true);

    // Switch the mode (optional)
    onSetInputMode(inputMode === "search" ? "add" : "search");

    // If you want the animation to reset after finishing,
    // you could use a timeout or some other approach:
    setTimeout(() => {
      setExpanded(false);
    }, 1000); // 1 second (the duration of your animation)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Wrap the button + input together */}
      <div className="button-input-wrapper">
        <input
          className={`text-input ${inputMode}`}
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
          <img src={SearchIcon} className="toggle-icon" alt="toggle" />
        </button>
      </div>
    </form>
  );
}

export default TaskListForm;
