import { useEffect, useState } from "react";
import { Task } from "./types";
import TaskList from "./components/TaskList";

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
