import { useState } from "react";
import "./styles/DropDown.css";

interface SortDropDownPops {
  sortBy: string;
  onSetSortBy: (sortBy: string) => void;
  sortDirection: string;
  onSetSortDirection: (sortDirection: string) => void;
}

function SortDropDown({
  sortBy,
  sortDirection,
  onSetSortBy,
  onSetSortDirection,
}: SortDropDownPops) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setMenuOpen(!menuOpen)}>Sort</button>
      {menuOpen && (
        <div className="sort-dropdown-menu">
          <ul>
            <li
              className={sortBy === "order-added" ? "selected" : ""}
              onClick={() => onSetSortBy("order-added")}
            >
              Order Added
            </li>
            <li
              className={sortBy === "title" ? "selected" : ""}
              onClick={() => onSetSortBy("title")}
            >
              Title
            </li>
            <li
              className={sortBy === "completed" ? "selected" : ""}
              onClick={() => onSetSortBy("completed")}
            >
              Completed
            </li>
          </ul>
          <svg width="200" height="5" stroke="white" strokeWidth="1">
            <line x1="15" y1="5" x2="150" y2="5" />
          </svg>
          <ul>
            <li
              className={sortDirection === "ascending" ? "selected" : ""}
              onClick={() => onSetSortDirection("ascending")}
            >
              Ascending
            </li>
            <li
              className={sortDirection === "descending" ? "selected" : ""}
              onClick={() => onSetSortDirection("descending")}
            >
              Descending
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SortDropDown;
