import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { deleteTodo, toggleTodo } from "../redux/actions/todoActions";
import { TiTick } from "react-icons/ti";
import { MdEdit,MdDelete} from "react-icons/md";


const TaskItem = React.memo(({ task, toggleCompletion, editTodo, deleteTask }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg transition-all ${
        task.completed ? "bg-green-100 line-through" : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      <div className="flex-grow">
        <h3 className="font-semibold">{task.text}</h3>
        <p className="text-sm text-gray-600">
          {task.date ? format(new Date(task.date), "PPP") : "No valid date"} - Priority: {task.priority}
        </p>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => toggleCompletion(task.id)} className="px-4 py-2 text-lg py-1 bg-white  rounded-md hover:bg-[#008a81] hover:text-white text-lg">
          <TiTick/>
        </button>
        <button onClick={() => editTodo(task)} className="px-4 py-2 text-lg py-1 bg-white  rounded-md hover:bg-[#008a81] hover:text-white text-lg">
          <MdEdit/>
        </button>
        <button onClick={() => deleteTask(task.id)} className="px-4 py-2 text-lg py-1 bg-white  rounded-md hover:bg-[#008a81] hover:text-white text-lg">
          <MdDelete/>
        </button>
      </div>
    </div>
  );
});

export default function TaskList({ setEditingTask }) {
  const todos = useSelector((state) => state); // Assuming state structure
  const dispatch = useDispatch();

  const editTodo = useCallback((task) => {
    setEditingTask(task);
  }, [setEditingTask]);

  const toggleCompletion = useCallback(
    (id) => {
      dispatch(toggleTodo(id));
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    (id) => {
      dispatch(deleteTodo(id));
    },
    [dispatch]
  );

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      const deadlineA = new Date(a.date).getTime();
      const deadlineB = new Date(b.date).getTime();
      if (deadlineA !== deadlineB) return deadlineA - deadlineB;
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [todos]);

  return (
    <div className="space-y-4">
      {sortedTodos.length === 0 ? (
        <p className="text-center text-gray-600">No tasks yet. Add a new task!</p>
      ) : (
        sortedTodos.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleCompletion={toggleCompletion}
            editTodo={editTodo}
            deleteTask={deleteTask}
          />
        ))
      )}
    </div>
  );
}
