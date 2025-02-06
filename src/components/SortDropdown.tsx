import { useState } from "react";
import "./styles/DropDown.css";

interface SortDropDownProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortDirection: string;
  setSortDirection: (sortDirection: string) => void;
}

function SortDropDown({
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
}: SortDropDownProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <>
      <button className="sort-button" onClick={() => setMenuOpen(!menuOpen)}>
        Sort
      </button>
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
          <svg width="200" height="5">
            <line
              x1="2"
              y1="2"
              x2="150"
              y2="2"
              stroke="white"
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

export default SortDropDown;
