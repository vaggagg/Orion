import '../Styling/Basic.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Button( props ) {
    const { label, type, icon, onchange } = props;
    const typeOfInput = type == undefined ? "text" : type
    const hasIconClass = icon == undefined ? false : true; 
    return (
        <div class="input-container">
        { label && <span class="input-label"> {label} { hasIconClass  && <FontAwesomeIcon icon={icon} />} </span> }
        <input className="input" type={typeOfInput} onChange={onchange}></input>
      </div>
    );
  }
  
  export default Button;