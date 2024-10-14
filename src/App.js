import { useState } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import { Provider } from 'react-redux';
import { todoStore } from './redux/todoStore';

function App() {
  const [editingTask, setEditingTask] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8">
           <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <Provider store={todoStore}>
          <TaskForm editingTask={editingTask} setEditingTask={setEditingTask} />
          <TaskList setEditingTask={setEditingTask} />
        </Provider>
        </div>
     
      
    </div>
  );
}

export default App;
