import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";

const API_URL = "http://localhost:8000/tasks";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium" });

  const token = localStorage.getItem("token")

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/getalltasks`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setTasks(response.data);
    } catch (error) {
      if (error.response) {

        console.error('Error response:', {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers,
        });
      } else if (error.request) {

        console.error('No response received:', error.request);
      } else {

        console.error('Error setting up request:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    // e.preventDefault();
    // if (!newTask.title.trim()) return;
    // try {
    //   const response = await axios.post(`${API_URL}/createtask`, newTask, { withCredentials: true });
    //   setTasks([...tasks, response.data.task]);
    //   setNewTask({ title: "", description: "", priority: "medium" });
    //   setIsModalOpen(false);
    // } catch (error) {
    //   console.error("Error creating task:", error);
    // }
  };

  const handleComplete = async (id) => {
    // try {
    //   const updatedTask = tasks.find(task => task._id === id);
    //   const response = await axios.patch(`${API_URL}/update/${id}`, {
    //     status: updatedTask.isCompleted ? "pending" : "completed"
    //   }, { withCredentials: true });
    //   fetchTasks();
    // } catch (error) {
    //   console.error("Error updating task:", error);
    // }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log('Delete response:', response.data);
      fetchTasks(); // Refresh the tasks list after deletion
    } catch (error) {
      if (error.response) {
        console.error('Error deleting task:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Task
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No tasks yet. Add your first task!</p>
          ) : (
            <div className="space-y-4">
              {tasks.map(task => (
                <TaskCard key={task._id} task={task} handleComplete={handleComplete} handleDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
