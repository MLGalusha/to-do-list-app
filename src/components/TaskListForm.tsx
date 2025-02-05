import { useState } from "react";
import { Task } from "../types";

interface TaskListFormProps {
  onAddTask: (task: Task) => void;
}

function TaskListForm({ onAddTask }: TaskListFormProps) {
  const [taskText, setTaskText] = useState<string>("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!taskText.trim()) return;
    console.log(taskText);

    const newTaskList: Task = {
      id: crypto.randomUUID(),
      text: taskText,
      completed: false,
    };

    onAddTask(newTaskList);
    setTaskText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a task..."
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TaskListForm;
