import '../Styling/App.scss'
import Input from '../BasicComponents/Input.js'
import { useEffect, useState } from "react";
import Create from './Create';
import '../Styling/fontawesome';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SpaceShipTakeOff from '../animations/SpaceshipTakeOff';
import Header from '../BasicComponents/Header';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt , faUser } from "@fortawesome/free-solid-svg-icons";
import createMsgPopUp from '../Global/Helpers';

function Login(props)  {
  const navigate = useNavigate();
  const [ showLogin, setshowLogin ] = useState(true);
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ launch, setLaunch ] = useState(false);
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const submitLogin = () => {
    const errorMessage = 'The combination of password and email was wrong';
    if(showLogin){
      const credentials = {
        email: email,
        password: password,
        action:'Authentication1'
      }
      axios.post('http://localhost/orion/orion/src/api/general/users.php', credentials).then(function(response){
            if( response.data.length > 0){
              setLaunch(true);
              console.log(response.data)
              props.dispatch(setAuthedUser(response.data));
              setTimeout(function () {
                navigate('/timeline');
            }, 3000);
            }
            else {
              createMsgPopUp(errorMessage, 'error');
            }
        });
    }
    else  
    setshowLogin(true)
  }
    return (
    <div>
      <Header />
      <SpaceShipTakeOff launch = { launch } />
      <div className=" center-container">
        <div className="LoginOrCreate-main">
          <div className="inner">
            { showLogin && 
            <div className="login-container">
              <span class="mainTitle" >Log in to your existing account</span>
              <Input label="Email" type="email" onchange={onChangeEmail}/>
              <Input label="Password" type="password" onchange={onChangePassword}/>
            </div>
            }
            { !showLogin && <Create loginOnOff={setshowLogin} />}
            <div class="button-container">
              <button class="btn btn1" onClick={()=>submitLogin()} >Login<FontAwesomeIcon icon={faUser} style={{ marginLeft: '4px' }} /></button>
              { showLogin && <div class="mainTitle" >OR</div> }
              { showLogin && <button class="btn btn2" onClick={()=>setshowLogin(false)}>Create <FontAwesomeIcon icon={faSignInAlt} style={{ marginLeft: '4px' }} /></button> }
            </div>
        </div>
      </div>
    </div>
  </div>
  );
}

function mapStateToProps ( user ) {
  return {
    user
  }
}
export default connect(mapStateToProps)(Login)
