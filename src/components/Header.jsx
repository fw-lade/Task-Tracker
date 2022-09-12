import Button from "./Button"
import { useLocation } from 'react-router-dom'


const Header = ({title, onAdd, showAdd}) => {
  const location = useLocation()
  return (
    <div className="header">
        <h1>{title}</h1>

        {location.pathname === '/' && (
        <Button
          color={showAdd ? 'red' : 'black'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAdd}
        />
      )}
    </div>
  )
}

Header.defaultProps = {
    title:'Task Tracker',
}



//CSS in JS   --- {headingStyle}, where u want to style
// const headingStyle = {
//   color: 'red',
//    backgroundColor: 'black',
// }

export default Header