import '../Styling/Basic.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
function Modal( props ) {
    const navigate = useNavigate();
    const { title, component, closeFuntion } = props;
    useEffect(() => {
      const body = document.body.classList.add('no-scroll')
    },[]);
    const closeModal = () => {
      closeFuntion(false)
    }
    return (
      <div>
        
        <div className='modal-background' onClick={closeModal}></div>
        
        <div className="modal-container">
        
          <div className='modal-title-container'>
            <div className='mainTitle'>{ props.title }</div> 
            <div class='icon' onClick={closeModal}><FontAwesomeIcon icon={faClose}/> </div>
          </div>
          <Scrollbars>
          {component}
          </Scrollbars>
        </div>
        
      </div>
    );
  }
  
  export default Modal;