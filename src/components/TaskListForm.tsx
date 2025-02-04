import { useState } from "react";
import { Task } from "../types";

interface TaskListFormProps {
  onAddTask: (task: Task) => void;
}

function TaskListForm({ onAddTask }: TaskListFormProps) {
  const [task, setTask] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!task.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: task,
      completed: false,
    };
    console.log(newTask);
    onAddTask(newTask);
    setTask("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task..."
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TaskListForm;
