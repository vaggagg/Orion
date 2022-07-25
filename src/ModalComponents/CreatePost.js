import '../Styling/Basic.scss'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Input from '../BasicComponents/Input.js';
import List from '../BasicComponents/List.js';
import createMsgPopUp from '../Global/Helpers';
import { faPencil, faHeading } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
function Friends( props ) {
    const navigate = useNavigate();
   const [title, setTitle] = useState('My title');
   const [description, setDescription] = useState('My description');
   const [ interests, setInterests ] = useState([]);
   const onChangeTitle = (title) => {
    setTitle(title);
 }
    const onChangeDescription = (desc) => {
        setDescription(desc);
    }
    const onChangeInterests = (interest) => {
        setInterests(interest);
     }
     const SubmitForm = ()=> {
        const success =  'You successfully created a post. Welcome!';
          const allInfo = {
            title: title,
            description: description,
            interests: interests,
            action: 'Create'
          }
          axios.post('http://localhost/orion/orion/src/api/general/posts.php', allInfo).then(function(response){
                  createMsgPopUp(success,'success');
            });
     }
    return (
      <div>
      
        <div className='createPost-container'>
        <Input label="Title" icon={faHeading} type="text" onchange={onChangeTitle}/>
        <Input label="Description" icon={faPencil} type="textarea" onchange={onChangeDescription}/>
        <List type='interestsForPost' func={onChangeInterests}/>
        <button class="btn btn1" type='submit' onClick={SubmitForm}>Submit</button>
        </div>
      </div>
    );
  }
  
  export default Friends;