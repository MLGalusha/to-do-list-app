import { useState } from "react";
import "./styles/DropDown.css";

interface FilterDropDownProps {
  filter: string;
  onSetFilter: (filter: string) => void;
}

function FilterDropDown({ filter, onSetFilter }: FilterDropDownProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setMenuOpen(!menuOpen)}>Filter</button>
      {menuOpen && (
        <div className="filter-dropdown-menu">
          <ul>
            <li
              className={filter === "all" ? "selected" : ""}
              onClick={() => onSetFilter("all")}
            >
              All
            </li>
            <li
              className={filter === "completed" ? "selected" : ""}
              onClick={() => onSetFilter("completed")}
            >
              Completed
            </li>
            <li
              className={filter === "active" ? "selected" : ""}
              onClick={() => onSetFilter("active")}
            >
              Active
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default FilterDropDown;
