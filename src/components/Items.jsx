import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Items = ({task, onDelete, onToggle}) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
        <h3>{task.text} <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)} /></h3>
        {/* <p className={'time'}>{task.date}</p> */}
        {/* <p className={'date'}>{task.time}</p> */}
        <p>
          <Link to={`/task/${task.id}`}>View Details</Link>
        </p>
    </div>
  )
}

export default Items