import { Task } from "../types";
import TaskListForm from "./TaskListForm";
import TaskItem from "./TaskItem";
import { useState } from "react";
import SortDropDown from "./SortDropDown";
import FilterDropDown from "./FilterDropDown";
import Search from "./Search";

interface TaskListProps {
  taskList: Task[];
  onAddTask: (task: Task) => void;
  onModifyTaskList: (taskList: Task[]) => void;
}

function TaskList({ onAddTask, taskList, onModifyTaskList }: TaskListProps) {
  const [taskText, setTaskText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMode, setInputMode] = useState<"search" | "add">("add");
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
      <SortDropDown
        sortBy={sortFilterSettings.sortBy}
        setSortBy={(value) => updateSortFilterSettings({ sortBy: value })}
        sortDirection={sortFilterSettings.sortDirection}
        setSortDirection={(value) =>
          updateSortFilterSettings({ sortDirection: value })
        }
      />
      <FilterDropDown
        filter={sortFilterSettings.filter}
        setFilter={(value) => updateSortFilterSettings({ filter: value })}
      />
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
