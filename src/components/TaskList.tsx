import { useState } from "react";
import { Task } from "../types";
import FilterDropdown from "./FilterDropDown.tsx";
import SortDropdown from "./SortDropDown.tsx";
import TaskItem from "./TaskItem";
import Search from "./Search";
import TaskListForm from "./TaskListForm.tsx";

interface TaskListProps {
  taskList: Task[];
  onModifyTaskList: (taskList: Task[]) => void;
  onAddTask: (task: Task) => void;
}

function TaskList({ taskList, onModifyTaskList, onAddTask }: TaskListProps) {
  const [taskText, setTaskText] = useState<string>("");
  const [inputMode, setInputMode] = useState<"search" | "add">("add");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortFilterSettings, setSortFilterSettings] = useState(() => {
    const savedSettings = localStorage.getItem("savedSettings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : { sortBy: "order-added", sortDirection: "ascending", filter: "all" };
  });

  function updateSortFilterSettings(
    newSettings: Partial<typeof sortFilterSettings>
  ) {
    const updatedSettings = { ...sortFilterSettings, ...newSettings };
    setSortFilterSettings(updatedSettings);
    localStorage.setItem("savedSettings", JSON.stringify(updatedSettings));
  }

  function sortList(filteredList: Task[]) {
    let sortedList = [...filteredList];
    if (sortFilterSettings.sortDirection === "ascending") {
      if (sortFilterSettings.sortBy === "title") {
        sortedList.sort((a, b) => a.text.localeCompare(b.text));
      } else if (sortFilterSettings.sortBy === "completed") {
        sortedList.sort((a, b) => Number(b.completed) - Number(a.completed));
      }
    } else {
      if (sortFilterSettings.sortBy === "title") {
        sortedList.sort((a, b) => b.text.localeCompare(a.text));
      } else if (sortFilterSettings.sortBy === "completed") {
        sortedList.sort((a, b) => Number(a.completed) - Number(b.completed));
      } else {
        sortedList.reverse();
      }
    }
    return sortedList;
  }

  function filterList(taskList: Task[]) {
    let filteredList = [...taskList];
    if (searchQuery) {
      filteredList = filteredList.filter((task) =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortFilterSettings.filter === "completed") {
      filteredList = filteredList.filter((task) => task.completed);
    } else if (sortFilterSettings.filter === "active") {
      filteredList = filteredList.filter((task) => !task.completed);
    }
    return sortList(filteredList);
  }

  const finalList = filterList(taskList);

  return (
    <div>
      <div>
        <button>S|T</button>
        {inputMode === "add" ? (
          <>
            <button onClick={() => setInputMode("search")}>Toggle</button>
            <TaskListForm
              taskText={taskText}
              setTaskText={setTaskText}
              onAddTask={onAddTask}
            />
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setInputMode("add");
                setSearchQuery("");
              }}
            >
              Toggle
            </button>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </>
        )}
        <SortDropdown
          sortBy={sortFilterSettings.sortBy}
          setSortBy={(value) => updateSortFilterSettings({ sortBy: value })}
          sortDirection={sortFilterSettings.sortDirection}
          setSortDirection={(value) =>
            updateSortFilterSettings({ sortDirection: value })
          }
        />
        <FilterDropdown
          filter={sortFilterSettings.filter}
          setFilter={(value) => updateSortFilterSettings({ filter: value })}
        />
      </div>
      <ul>
        {finalList.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            taskList={taskList}
            onModifyTaskList={onModifyTaskList}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
