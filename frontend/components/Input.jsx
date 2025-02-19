export default function Input() {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">{editingTask ? "Edit Task" : "Add New Task"}</h2>
                <form onSubmit={editingTask ? handleUpdate : handleAddTask}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={newTask.title}
                                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={newTask.description}
                                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                                Priority
                            </label>
                            <select
                                id="priority"
                                value={newTask.priority}
                                onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                setIsModalOpen(false);
                                setEditingTask(null);
                                setNewTask({ title: "", description: "", priority: "medium" });
                            }}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {editingTask ? "Update Task" : "Add Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
