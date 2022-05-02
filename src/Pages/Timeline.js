import '../Styling/App.scss'
import { useEffect, useState } from "react";
import '../Styling/fontawesome';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoggedHeader from '../BasicComponents/LoggedHeader'
import Modal from '../BasicComponents/Modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt , faUser } from "@fortawesome/free-solid-svg-icons";

function Timeline()  {
  const navigate = useNavigate();
  const [ showTimeline, setshowTimeline] = useState(true);
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ launch, setLaunch ] = useState(false);
    return (
    <div>
      <LoggedHeader />
  </div>
  );
}

export default Timeline;
