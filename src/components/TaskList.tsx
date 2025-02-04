import { useEffect, useState } from "react";
import { Task } from "../types";
import SortDropdown from "./SortDropDown";
import TaskItem from "./TaskItem";
import FilterDropdown from "./FilterDropDown";

interface TaskListProps {
  taskList: Task[];
  onModifyTaskList: (newTaskList: Task[]) => void;
}

function TaskList({ taskList, onModifyTaskList }: TaskListProps) {
  const [sortBy, setSortBy] = useState<string>("order-added");
  const [sortDirection, setSortDirection] = useState<string>("ascending");
  const [filter, setFilter] = useState<string>("all");
  const [finalList, setFinalList] = useState<Task[]>([]);

  function sortList(filteredList: Task[]) {
    let sortedList: Task[] = [...filteredList];
    if (sortDirection === "ascending") {
      if (sortBy === "title") {
        sortedList.sort((a, b) => a.text.localeCompare(b.text));
      } else if (sortBy === "completed") {
        sortedList.sort((a, b) => Number(b.completed) - Number(a.completed));
      }
    } else {
      if (sortBy === "title") {
        sortedList.sort((a, b) => b.text.localeCompare(a.text));
      } else if (sortBy === "completed") {
        sortedList.sort((a, b) => Number(a.completed) - Number(b.completed));
      } else {
        sortedList.reverse();
      }
    }
    return sortedList;
  }

  function filterList(taskList: Task[]) {
    let filteredList = [...taskList];
    if (filter === "completed") {
      filteredList = filteredList.filter((task) => task.completed);
    } else if (filter === "active") {
      filteredList = filteredList.filter((task) => !task.completed);
    }
    const sortedFilteredList: Task[] = sortList(filteredList);
    setFinalList(sortedFilteredList);
  }

  useEffect(() => {
    filterList(taskList);
  }, [taskList, filter, sortBy, sortDirection]);

  return (
    <div>
      <div>
        <SortDropdown
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
        <FilterDropdown filter={filter} setFilter={setFilter} />
      </div>
      <ul>
        {finalList.map((task: Task) => (
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
