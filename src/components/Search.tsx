import "./styles/Input.css";
import TaskIcon from "../assets/add-task.svg";
import { useState } from "react";

interface SearchProps {
  searchQuery: string;
  onSetSearchQuery: (searchQuery: string) => void;
  inputMode: "search" | "add";
  onSetInputMode: (inputMode: "search" | "add") => void;
}

function Search({
  searchQuery,
  onSetSearchQuery,
  onSetInputMode,
  inputMode,
}: SearchProps) {
  // A "state" that toggles the animation
  const [expanded, setExpanded] = useState(false);

  function handleButtonClick() {
    onSetInputMode("add");
    onSetSearchQuery("");
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
    <form>
      <div className="button-input-wrapper">
        <input
          className={`text-input ${inputMode}`}
          type="text"
          value={searchQuery}
          onChange={(e) => onSetSearchQuery(e.target.value)}
          placeholder="Search a task..."
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
          <img src={TaskIcon} className="toggle-icon" />
        </button>
      </div>
    </form>
  );
}
export default Search;
