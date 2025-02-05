import { useState } from "react";
import "./styles/Dropdown.css";

interface FilterDropdownProps {
  filter: string;
  setFilter: (filter: string) => void;
}

function FilterDropdown({ filter, setFilter }: FilterDropdownProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <>
      <button className="filter-button" onClick={() => setMenuOpen(!menuOpen)}>
        Filter
      </button>
      {menuOpen && (
        <div className="filter-dropdown-menu">
          <ul>
            <li
              className={filter === "all" ? "filter-selected" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </li>
            <li
              className={filter === "completed" ? "filter-selected" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </li>
            <li
              className={filter === "active" ? "filter-selected" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default FilterDropdown;
