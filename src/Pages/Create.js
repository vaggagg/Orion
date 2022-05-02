import '../Styling/App.scss'
import Input from '../BasicComponents/Input.js'
import React from 'react';
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight , faLongArrowAltLeft, faHandsHelping,faLaughBeam, faFont,faAt, faBirthdayCake, faLock, faHeading } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import List from '../BasicComponents/List';
import createMsgPopUp from '../Global/Helpers';

function Create (props) {
  const navigate = useNavigate();
  const [ step, setStep ] = useState(1);
  const [ showLogin, setshowLogin ] = useState(true);
  const [ role, setRole ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ name, setName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ surname, setSurname ] = useState('');
  const [ avatar, setAvatar ] = useState(1);
  const [ nextArrowDisabled, setNextArrowDisabled ] = useState(true);
  const [ interests, setInterests ] = useState([]);
  const [ startDate, setStartDate] = useState(new Date());
  const [ previousArrowDisabled, setPreviousArrowDisabled ] = useState(false);


  useEffect(() => {
    setArrows(step)
  });
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const onChangeAvatar = (e) => {
    setAvatar(e)
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const setStartDate1 = (date) => {
    setStartDate(date)
  }
  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }
  const onChangeInterests = (interest) => {
     setInterests(interest);
  }

  const onChangeSurname = (e) => {
    setSurname(e.target.value);
  }

  const setArrows = (step) => {
    if ( step == 1 ){
      if ( role !=='')
        setNextArrowDisabled(false)
    }
    else if( step == 2) {
        if( name !=='' && surname !=='' && password!=='' && email!=='' && startDate!=='')
        setNextArrowDisabled(false)
    }
    else if( step == 3 ) {
      if (interests.length!==0)
      setNextArrowDisabled(false)
    }
    else if (step == 4 ){
      if ( username!=='')
      setNextArrowDisabled(false)
    }
  }

  const addStep = () => {
    setStep(step + 1)
    setNextArrowDisabled(true)
  }

  const subtractStep = () => {
    setStep(step - 1)
  }

  const SubmitForm = () => {
    const success =  'You successfully created a new user. Welcome!';
    const error = email +' is already being used by another account';
      const allInfo = {
        role: role,
        email: email,
        password: password,
        name: name ,
        username: username,
        surname: surname,
        interests:interests.join('#'),
        birthday: startDate,
        avatar: avatar, 
        dateCreated: new Date(),
        action: 'Create'
      }
      const checkEmail = {
        email: email,
        action: 'CheckEmail'
      }
      axios.post('http://localhost/orion/orion/src/api/general/users.php', checkEmail).then(function(response){
            if( response.data.found == 'FALSE'){
              axios.post('http://localhost/orion/orion/src/api/general/users.php', allInfo).then(function(response){
                  axios.post('http://localhost/orion/orion/src/api/general/friends.php', allInfo).then(function(response){
                    createMsgPopUp(success,'success');
                  })
                  props.loginOnOff(true);
              });
            }
            else if ( response.data.found == 'TRUE') {
              createMsgPopUp(error,'error');
            }
        });
        
     

  }

  const pickRole = (e) => {
    
    let anotherSelected = document.querySelectorAll('.roleContainer .selected');

    if(anotherSelected.length!=0)
      anotherSelected[0].classList.remove('selected');

    e.target.classList.add("selected");

    setRole(e.target.getAttribute('data-role'));
  }
  var imagesArray = [ '1','2','3', '4','5','6','7','8','9' ];
  
  return (
  <div className="create-container">
      
      <span class="mainTitle" >Create your new account</span>
      {/* Step 1 */}
      { step === 1 &&
        <div class="step1">
        <span class="mainTitle" >Pick your desired role</span>
          <div class="roleContainer">
            <button class="roleButton" onClick={pickRole} data-role='volunteer' > Volunteer <FontAwesomeIcon icon={faHandsHelping}/> </button>
            <button class="roleButton" onClick={pickRole} data-role='regular'> Regular User <FontAwesomeIcon icon={faLaughBeam}/> </button>
          </div>
        </div>
      }
      {/* Step 2 */}
      { step === 2 &&
        <div class = "step2">
        <Input label="Name" icon={faFont} type="text" onchange={onChangeName} required/>
        <Input label="Surname" icon={faHeading} type="text" onchange={onChangeSurname} required/>
        <Input label="Email" icon={faAt} type="email" onchange={onChangeEmail} required/>
        <span class="input-label"> Date of Birth <FontAwesomeIcon icon={faBirthdayCake} /> </span>
        <DatePicker selected={startDate} onChange={(date) => setStartDate1(date)} required />
        <Input label="Password" icon={faLock} type="password" onchange={onChangePassword} required/>
        
      </div>
      }
      {/* Step 3 */}
      { step === 3 &&
        <div class = "step3">
          <List type='volunteerActivities' func={onChangeInterests}/>
        </div>  
      }
      { step === 4 &&
        <div class = "step4">
          <Input label="Username" icon={faHeading} type="text" onchange={onChangeUsername}/>
        
          <button class="btn btn1" type='submit' onClick={SubmitForm} disabled={nextArrowDisabled}>Submit</button>
          <div class="avatar-container">
          <span class="mainTitle" >Choose your avatar:</span>
            <ul>
            { imagesArray.map( e => 
            <li className='img-zoom'> 
              <a href="javascript:void(0)" onClick={ ()=> onChangeAvatar(e)}>
                <img src={require('../images/avatars/' + e + '.jpg').default} />
              </a> 
            </li> ) }
            </ul>
          </div>
        </div>  
      }
      { step=== 5 && 
        <div class="step5">
          <List type='orders' func={onChangeInterests}/>
        </div>
      }

      <div class="step-container">
        <div class="title-step"> Steps( {step} /5 )</div>
        <button onClick = {subtractStep} class={`previous ${previousArrowDisabled ? "inactive" : "active"}`} disabled={previousArrowDisabled}><FontAwesomeIcon icon={faLongArrowAltLeft}/></button>
        <button onClick = {addStep} class= {nextArrowDisabled ? "next inactive" : "next active"} disabled={nextArrowDisabled}><FontAwesomeIcon icon={faLongArrowAltRight}/></button>
      </div>
  </div>
  );
}

export default Create;
