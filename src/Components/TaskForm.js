import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "../redux/actions/todoActions"; // Import update action

export default function TaskForm({ editingTask, setEditingTask }) {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    //editTask:
    if (editingTask) {
      setTaskName(editingTask.text);
      setDate(new Date(editingTask.date));
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  const addTask = () => {
    if (taskName && date && priority) {
      if (editingTask) {
        dispatch(
            editTodo({
            id: editingTask.id,
            text: taskName,
            date: format(date, "yyyy-MM-dd"),
            priority,
          })
        );
        clearForm();
      } else {
        dispatch(
          addTodo({
            text: taskName,
            date: format(date, "yyyy-MM-dd"),
            priority,
          })
        );
        clearForm();
      }
    }
  };

  const clearForm = () => {
    setTaskName("");
    setDate(null);
    setPriority("");
    setEditingTask(null);
  };

  return (
    <>
      <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Organize Your Day, Achieve Your Goals</h2>
          <p className="text-gray-600">Set priorities, manage your time, and watch your productivity!</p>
        </div>
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Task Manager
        </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          required="true"
          onChange={(e) => setTaskName(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="date"
           required="true"
          value={date ? format(date, "yyyy-MM-dd") : ""}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
        />
        <select
          value={priority}
           required="true"
          onChange={(e) => setPriority(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
          
        >
          <option value="" disabled >
            Select priority
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={addTask}
          className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-600"
        >
          {editingTask ? "Update" : "Add"}
        </button>
      </div>
      
    </>
  );
}


