import '../Styling/App.scss'
import { useEffect, useState } from "react";
import '../Styling/fontawesome';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoggedHeader from '../BasicComponents/LoggedHeader'
import Modal from '../BasicComponents/Modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt , faUser } from "@fortawesome/free-solid-svg-icons";
import Post from '../BasicComponents/Post';

function Timeline()  {
  const navigate = useNavigate();
  const [ showTimeline, setshowTimeline] = useState(true);
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ launch, setLaunch ] = useState(false);
    return (
    <div class='Timeline'>
      <LoggedHeader />
      <div className="mainContent">
        <Post creator='Test' avatar="1" description='Loreswerqwe wqer wqer wqer' tags={['volunteer', 'test']} postID="2" />
      </div>
  </div>
  );
}

export default Timeline;
