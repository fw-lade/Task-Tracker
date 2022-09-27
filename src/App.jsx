import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddItem from './components/AddItem'
import Footer from './components/Footer'
import Header from './components/Header'
import About from './components/About'
import TaskDetails from './components/TaskDetails'
import Tasks from './components/Tasks'
import Toggle from './components/Toggle'
import { ThemeContext } from './Context'
import { useContext } from 'react'

const App = () => {
  const [showAddtask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const theme = useContext(ThemeContext)
  const darkMode = theme.state.darkMode
  
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    fetchTasks()
  }, [])

//FETCH TASKS FROM
  const fetchTasks = async () => {
    const response = await fetch ('http://localhost:5000/tasks')
    const data = await response.json()

    setTasks(data)

  }

  //FETCH TASK
  const fetchTask = async (id) => {
    const response = await fetch (`http://localhost:5000/tasks/${id}`)
    const data = await response.json()

    return data
  }


//ADD TASK
const addTask = async (task) => {
  const response = await fetch('http://localhost:5000/tasks', {
    method:'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await response.json()

  setTasks([...tasks, data])

  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task}
  // setTasks([...tasks, newTask])
}


//DELETE TASKS
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })

  setTasks(tasks.filter((task) => task.id !== id))
}

//TOGGLE REMINDER
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
  const response = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask),
  })

  const data = await response.json()

  setTasks(
    tasks.map((task) =>
     task.id === id ? { ...task, reminder: data.reminder } : task
     )
  )
}


  return (
    <Router>  
      <div className="container" style={{backgroundColor: darkMode ? '#222' : 'white', color: darkMode ? 'white': '#222' }}>
        <Toggle />
        <Header onAdd={() => setShowAddTask(!showAddtask)} 
        showAdd={showAddtask} 
        />
      <Routes>
        <Route path = '/' 
        element={
          <>
          {showAddtask && <AddItem onAdd={addTask} />}
          {tasks.length > 0 ? (
          <Tasks
           tasks={tasks}
            onDelete={deleteTask} 
            onToggle ={toggleReminder}
             />
             ) : (
               'No Task Available'
             )}
          </>
        } />
        <Route path = '/about' element={<About />} />
        <Route path = '/task/:id' element={<TaskDetails />} />
      </Routes>
      <Footer />
      </div>
      </Router>

  )
}

export default App
