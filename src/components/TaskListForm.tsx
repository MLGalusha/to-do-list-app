import { Task } from "../types";

interface TaskListFormProps {
  onAddTask: (task: Task) => void;
  taskText: string;
  setTaskText: (taskText: string) => void;
}

function TaskListForm({ onAddTask, taskText, setTaskText }: TaskListFormProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!taskText.trim()) return; // Don't submit empty task
    const newTask = {
      id: crypto.randomUUID(),
      text: taskText,
      completed: false,
    };
    onAddTask(newTask);
    console.log(newTask);
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
    </form>
  );
}

export default TaskListForm;
