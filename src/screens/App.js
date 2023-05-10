import { useState, useRef } from 'react';
import Task from '../components/Task';
import './App.css';


function MyButton({onClick}){
  return (
    <button onClick={onClick}>Clicar</button>
  )
}

function App() {
  const inputRef = useRef(null);
  const [tasks, updateTask] = useState([{id:0, title: "Início", status: 0}]);
  const [isDragging, setIsDragging] = useState(false)

  const handleDragging = (dragging) => setIsDragging(dragging)
 function openPopup(){
    document.getElementsByClassName("popup")[0].style.display="flex"
  }
  function addTask(){
    var title = inputRef.current.value;
    inputRef.current.value = "";
    document.getElementsByClassName("popup")[0].style.display="none"
    //var title = prompt("Dê um atítulo")
    console.log(title)
    if(title!=="" && title!=null){
      updateTask(arr => [...arr, {id:tasks.length ,title: title, status:0}])
    }
  }

  const handleUpdateList = (id, status) => {

    let task = tasks.find(item => item.id === id)

    if (task && task.status !== status) {

      task.status = status

      updateTask( prev => ([
             task,
             ...prev.filter(item => item.id !== id)
         ]))
    }
}

const handleDragOver = (e) => {
  e.preventDefault()
}

const handleDropTodo = (e) => {
  e.preventDefault()
  const id = +e.dataTransfer.getData('text')
  handleUpdateList(id, 0)
  handleDragging(false)
  
}

const handleDropDoing = (e) => {
  e.preventDefault()
  const id = +e.dataTransfer.getData('text')
  handleUpdateList(id, 1)
  handleDragging(false)
  
}

const handleDropDone = (e) => {
  e.preventDefault()
  const id = +e.dataTransfer.getData('text')
  handleUpdateList(id, 2)
  handleDragging(false)
  
}

  return (
    
    <div className="App">
      <div>
        <button id='botaoAdd' onClick={openPopup}>+</button>
        <div id='content'>
        
        <div id='todo' onDrop={handleDropTodo} onDragOver={handleDragOver}>
        <h3>To do</h3>
        
          {tasks.filter(e => e.status===0).map(e=><Task task={e} dragStart={handleDragging}></Task>)}
        </div>

        <div id='doing' onDrop={handleDropDoing} onDragOver={handleDragOver} >
          <h3>Doing</h3>
      
          {tasks.filter(e => e.status===1).map(e=><Task task={e} dragStart={handleDragging}></Task>)}
        </div>

        <div id='done' onDrop={handleDropDone} onDragOver={handleDragOver}>
        <h3>Done</h3>

          {tasks.filter(e => e.status===2).map(e=><Task task={e} dragStart={handleDragging}></Task>)}
        </div>
        
        </div>
      </div>

      <div className='popup'>
      <form action='#' onSubmit={addTask}>
        <div className='dialog'>
          
            <h3>Dê um título para sua tarefa</h3>
            <input on={addTask} ref={inputRef} id='inputTitle' autoFocus></input>
            <button id='sendButton' onClick={addTask}>Adicionar</button>
         
        </div>
        </form>
        
      </div>
    </div>
  );
}

export default App;
