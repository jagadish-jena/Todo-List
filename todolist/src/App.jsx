import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFininshed, setshowFininshed] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (updatedTodos)=>{
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos) 
    saveToLS(newTodos)
   
  }

  const toggleFinished = ()=>{
    setshowFininshed(!showFininshed)
  }

  const handleDelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS(newTodos)
    
  }

  const handleAdd=()=>{
    let newTodos = [...todos,{id:uuidv4(), todo, isCompleted:false}]
    setTodos(newTodos)
    setTodo("")
    saveToLS(newTodos)
    
  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos]
    newTodos[index].isCompleted=!newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS(newTodos)
    

  }
  
  return (
    <>
      <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2">
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='bg-white w-full rounded-lg p-2'/>
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 text-sm font-bold disabled:bg-violet-700 text-white px-2 py-1 cursor-pointer mx-2 rounded-lg'>Save</button>
          
          </div>
        </div>
          <input className='my-5 mr-4' onChange={toggleFinished} type="checkbox" checked={showFininshed}/>Show Finished 
          <div className='h-px bg-black opacity-20 w-10/12 mx-auto my-3'></div>
          <h2 className="text-lg font-bold">Your Todos</h2>

          <div className="todos">
            {todos.length===0 && <div className='m-5'>No todos to display</div>} 
            {todos.map(item=>{

            return (showFininshed || !item.isCompleted) && <div key={item.key} className="todo flex md:w-full my-3 justify-between">
              <div className="flex gap-5">
                <input type="checkbox" checked={item.isCompleted} name={item.id} onChange={handleCheckbox} />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 text-sm cursor-pointer font-bold text-white px-2 py-1 mx-1 rounded-md'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 text-sm cursor-pointer font-bold text-white px-2 py-1 mx-1 rounded-md'><AiFillDelete /></button>
              </div>
            </div>
            })}
          </div>
      </div>
    </>
  )
}

export default App
