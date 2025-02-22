import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";

const API_URL = "http://localhost:8000/tasks";

const TaskBoard = ({ dislayForm, token, setForm }) => {
  const [tasks, setTasks] = useState([]);

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
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAllDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/deletealltasks/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error during deletion:", error.response ? error.response.data : error.message);
    }
  }

  const handleComplete = async (id) => {
    if (!id) {
      console.error("Invalid task ID, cannot complete.");
      return;
    }
    try {
      const response = await axios.patch(
        `${API_URL}/complete/${id}`,
        {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
      }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error during completion:", error.response ? error.response.data : error.message);
    }
  };

  const handleUndo = async (id) => {
    if (!id) {
      console.error("Invalid task ID, cannot complete.");
      return;
    }
    try {
      const response = await axios.patch(
        `${API_URL}/complete/${id}`,
        {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
      }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error during completion:", error.response ? error.response.data : error.message);
    }
  }

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Invalid task ID, cannot delete.");
      return;
    }
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error during deletion:", error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/gettask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const title = response.data.title;
      const description = response.data.description;
      const priority = response.data.priority;

      console.log(title, " ", description, " ", priority)

      handleDelete(id);
      
      setForm(title,description,priority);
      dislayForm(true);

    } catch (error) {
      console.error("Error fetching task for edit:", error.response ? error.response.data : error.message);
    }
  };


  return (
    <div className="min-h-screen bg-white-50 py-8 px-4  mt-1">
      <div className="max-w-4xl mx-auto ">
        <div className="flex justify-between items-center mb-8 ">
          <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
          <button
            onClick={() => {
              dislayForm(true);
              setForm("", "", "High");
            }}
            className="flex items-center gap-2 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Task
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-2xl px-6 pt-6 pb-2">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No tasks yet. Add your first task!</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskCard key={task._id} task={task} handleComplete={handleComplete} handleDelete={handleDelete} handleUndo={handleUndo} handleEdit={handleEdit} />
              ))}
            </div>
          )}
          {tasks.length > 0 ? (
            <button
              onClick={() => handleAllDelete()}
              className="flex items-center gap-2 cursor-pointer bg-red-600 text-white px-4 py-2 mx-auto my-5 rounded-lg hover:bg-red-700 transition-colors">
              Remove All Task</button>
          ) : (<></>)}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
