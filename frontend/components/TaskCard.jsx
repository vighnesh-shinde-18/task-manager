
function TaskCard({ task, handleComplete, handleDelete, handleUndo, handleEdit }) {

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
    }
  };


  function formatDate(isoString) {
    const date = new Date(isoString);

    if (isNaN(date)) {
      console.error('Invalid Date');
      return 'Invalid Date';
    }

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    return date.toLocaleDateString('en-US', options);
  }


  return (
    <div key={task._id} className={`p-4 rounded-lg border ${task.isCompleted ? 'bg-gray-50 border-gray-700' : 'bg-white border-gray-700'}`}>
      <div className="flex items-start justify-between flex-col sm:flex-row">
        <div className="flex-1">
          <h3 className={`text-lg font-medium ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex flex-col sm:flex-col"> <span> <b className="text-gray-600">Created</b>: {formatDate(task.createdAt)}</span>
              {task.isCompleted && <span> <b className="text-gray-600">Completed</b> : {formatDate(task.completedAt)}</span>}
            </div>
            <span className={`px-2 hidden sm:flex py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 ml-4">
          {!task.isCompleted && <button onClick={() => handleComplete(task._id)} className="p-2 text-gray-500 cursor-pointer">✔️</button>}
          {!task.isCompleted && <button onClick={() => handleEdit(task._id)} className="p-2 text-gray-500 cursor-pointer">✏️</button>}
          {<button onClick={() => handleDelete(task._id)} className="p-2 text-gray-500 cursor-pointer">🗑️</button>}
          {task.isCompleted && <button onClick={() => handleUndo(task._id)} className="p-2 text-gray-500 cursor-pointer">🔙</button>}
          <div className={`px-2 py-1 flex sm:hidden rounded-full text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;