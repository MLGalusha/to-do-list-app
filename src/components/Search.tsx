import "./styles/Input.css";
import TaskIcon from "../assets/add-task.svg";
import { useEffect, useState } from "react";

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
  const [switchColor, setSwitchColor] = useState<boolean>(false);
  const [triggerSwitch, setTriggerSwitch] = useState(false); // NEW STATE TO TRIGGER EFFECT

  // Effect to handle delay
  useEffect(() => {
    if (triggerSwitch) {
      const timeout = setTimeout(() => {
        onSetSearchQuery("");
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
    <form onSubmit={(e) => e.preventDefault()} className="search-add-form">
      <div className="contain-input">
        <div
          className={`
            input-shadow
            ${inputMode}
          `}
        />
        <div className="button-input-wrapper">
          <input
            className={`
            text-input
            ${inputMode}
            ${expanded ? "animating" : ""}
          `}
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
            onClick={() => {
              setSwitchColor(!switchColor);
              handleButtonClick();
            }}
          >
            <img
              src={TaskIcon}
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
      </div>
    </form>
  );
}
export default Search;
