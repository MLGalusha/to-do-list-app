import { useEffect, useState } from "react";
import TaskListForm from "./components/TaskListForm";
import TaskList from "./components/TaskList";
import { Task } from "./types";

function App() {
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const savedTaskList = localStorage.getItem("tasks");
    return savedTaskList ? JSON.parse(savedTaskList) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  function addTask(task: Task) {
    setTaskList([...taskList, task]);
    console.log([...taskList, task]);
  }

  function modifyTaskList(newTaskList: Task[]) {
    setTaskList(newTaskList);
  }

  return (
    <>
      <TaskList
        onAddTask={addTask}
        taskList={taskList}
        onModifyTaskList={modifyTaskList}
      />
    </>
  );
}

export default App;
