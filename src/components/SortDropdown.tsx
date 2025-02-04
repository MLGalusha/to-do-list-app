import { useState } from "react";
import "./styles/Dropdown.css";

interface SortDropdownProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortDirection: string;
  setSortDirection: (sortDirection: string) => void;
}

function SortDropdown({
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
}: SortDropdownProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
      <button className="sort-button" onClick={() => setMenuOpen(!menuOpen)} />
      {menuOpen && (
        <div className="sort-dropdown-menu">
          <ul>
            <li
              className={sortBy === "title" ? "sort-selected" : ""}
              onClick={() => setSortBy("title")}
            >
              Title
            </li>
            <li
              className={sortBy === "completed" ? "sort-selected" : ""}
              onClick={() => setSortBy("completed")}
            >
              Completed
            </li>
            <li
              className={sortBy === "order-added" ? "sort-selected" : ""}
              onClick={() => setSortBy("order-added")}
            >
              Order Added
            </li>
          </ul>
          <svg width="120" height="5" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="15"
              y1="0"
              x2="120"
              y2="0"
              stroke="#ff4600"
              strokeWidth="1"
            />
          </svg>
          <ul>
            <li
              className={sortDirection === "ascending" ? "sort-selected" : ""}
              onClick={() => setSortDirection("ascending")}
            >
              Ascending
            </li>
            <li
              className={sortDirection === "descending" ? "sort-selected" : ""}
              onClick={() => setSortDirection("descending")}
            >
              Descending
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default SortDropdown;
