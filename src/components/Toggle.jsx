import Light from "../components/images/light.png"
import Dark from "../components/images/dark.png"
import { useContext } from "react"
import { ThemeContext } from "../Context"

const Toggle = () => {
  const theme = useContext(ThemeContext)

  const handleClick = () => {
    theme.dispatch({type: 'TOGGLE'})
  }

  return (
    <div className="t">
      <img src={Light} alt="" className="t-icon" />
      <img src={Dark} alt="" className="t-icon" />
      <div className="t-button" onClick={handleClick} style={{left : theme.state.darkMode ? 0 : 25}}></div>
    </div>
  )
}

export default Toggle