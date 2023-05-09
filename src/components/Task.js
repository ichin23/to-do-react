import './Task.css'


function Task({task, dragStart}){

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text', `${task.id}`)
        dragStart(true)
    }
    
    const handleDragEnd = () => dragStart(false)
    return (
        <div className="task" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <span className="taskTitle">{task.title}</span>
        </div>
    );
}

export default Task;