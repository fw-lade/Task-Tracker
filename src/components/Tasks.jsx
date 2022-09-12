import Items from "./Items"

const Tasks = ({tasks, onDelete, onToggle }) => {
  return (
    <>
    {tasks.map((task) => (
       <Items key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
    ))}   
   </>
  )
}

export default Tasks