import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:8000/tasks/createtask";

export default function InputTask({ dislayForm, token, initialTitle = "", initialDescription = "", IinitialPriority = "High" }) {
   
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [priority, setPriority] = useState(IinitialPriority);
    const [msg, setMsg] = useState("");

    const handleAddTask = async (e) => {

        if (title === "") {
            setMsg("Please Enter Title of Task")
        }
        e.preventDefault();
        try {
            const response = await axios.post(
                API_URL,
                { title, description, priority },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setMsg("Task created successfully");

            setTitle("");
            setDescription("");
            setPriority("High");

        } catch (error) {
            setMsg("Error creating task: " + error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen bg-white-500 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-center items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Add New Task</h1>
                </div>
                <form className="bg-white rounded-xl shadow-2xl px-6 py-2 pb-2" onSubmit={handleAddTask}>
                    <div className="sm:col-span-4 my-3">
                        <label htmlFor="title" className="block text-2xl my-2 font-medium text-gray-900">
                            Task Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={title}
                            placeholder="Enter task title"
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full py-1.5 px-3 border rounded-md text-gray-900 placeholder-gray-400"
                            required
                        />
                    </div>
                    <div className="col-span-full my-3">
                        <label htmlFor="description" className="block text-2xl my-2 font-medium text-gray-900">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={description}
                            placeholder="Write description about task"
                            onChange={(e) => setDescription(e.target.value)}
                            className="block w-full py-1.5 px-3 border rounded-md text-gray-900 placeholder-gray-400"
                        />
                    </div>
                    <div className="sm:col-span-3 my-3">
                        <label htmlFor="priority" className="block text-2xl my-2 font-medium text-gray-900">
                            Priority
                        </label>
                        <select
                            id="priority"
                            name="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full py-1.5 px-3 border rounded-md text-gray-900"
                        >
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                    {msg && (<p className={msg === "Task created successfully" ? "text-green-600" : "text-red-600"}>{msg}</p>)}

                    <div className="flex justify-center items-center flex-row">
                        <button
                            type="submit"
                            className="m-2 flex items-center cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add Task
                        </button>
                        <button
                            type="button"
                            onClick={() => dislayForm(false)}
                            className="m-2 flex items-center cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}