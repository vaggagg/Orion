import Logo from '../images/orion.png';
import '../Styling/Basic.scss';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Modal from './Modal';
import Friends from '../ModalComponents/Friends'
import { faUserAstronaut, faBars, faSearch, faCommentAlt, faBell, faCogs , faUserFriends, faShuttleSpace} from "@fortawesome/free-solid-svg-icons";
 function Header(props) {
  const [ searchText, setSearchText ] = useState('');
  const [ openFriends, setOpenFriends ] = useState(false);
  const [ openInterests, setOpenInterests ] = useState(false);
  const openCloseMenu=() =>{
    const  selector = document.getElementsByClassName('submenu-container');
    if ( selector[0].classList.contains('closed') ){
      selector[0].classList.remove('closed');
      selector[0].classList.add('open');
    }
    else {
      selector[0].classList.remove('open');
      selector[0].classList.add('closed');
    }
  }
  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  }
  
  const createSearchResults = (array) => {
    const searchResults = document.getElementsByClassName('search-results');
    console.log(array)
    if(!searchResults)
      return;
    searchResults[0].classList.remove('hidden');
    //<li key={key} class='results'><span className='username'>{user.USERNAME}</span> <span className='name'>{user.NAME}</span><span className='surname'>{user.SURNAME}</span></li>
    const results = array.map((user,key)=> ("<li key={key} class='results'><span className='username'>" + user.USERNAME + "</span> <span className='name'>" + user.NAME + "</span><span className='surname'>"+ user.SURNAME+"</span></li>"))
    console.log(results)
    searchResults[0].innerHTML=[...results];
  }
  
  const search = () =>{
    if ( searchText.length < 4 )
      return;
    const info = {
      username: searchText,
      action: 'SearchUsers'
    }
    axios.post('http://localhost/orion/orion/src/api/general/users.php', info).then(function(response){
      createSearchResults(response.data)
        });
    }
  return (
    <div class='header-container'>
    <header className="logged-header">
      <div class='menu header-icon left'>
          <a href='#' onClick={openCloseMenu}> <FontAwesomeIcon icon={faBars}/> </a>
      </div>
        <div className="logo-container">
           <a href='#'><img src={Logo} alt='Logo' /></a> 
        </div> 
        <div className='search-container'>
          <input className='search-input' onChange = {onSearchTextChange} placeholder='Search...'></input>
          <div class='search-icon' onClick = {search} ><FontAwesomeIcon icon={ faSearch }/></div>
          <ul className='search-results hidden'></ul>
        </div>
        <div class='right-container'>
          <div class='account header-icon right'>
            <a href='#'> <FontAwesomeIcon icon={faUserAstronaut}/> </a>
          </div>
          <div class='messages header-icon right'>
            <a href='#'> <FontAwesomeIcon icon={faCommentAlt}/> </a>
          </div>
          <div class='notifications header-icon right'>
            <a href='#'> <FontAwesomeIcon icon={faBell}/> </a>
          </div>
          <div class='settings header-icon right'>
            <a href='#'> <FontAwesomeIcon icon={faCogs}/> </a>
          </div>
        </div>
    </header>
    <ul class='submenu-container closed'>
        <li class='settings submenu-icon right'>
            <a href="javascript:void(0)" onClick={ () => setOpenFriends(true) }> 
            <div class='submenu-title-container'>
              <div class='submenu-title'>Friends</div>
            </div>
            <FontAwesomeIcon icon={faUserFriends}/> 
            </a>
        </li>
        <li class='settings submenu-icon right'>
        <a href="javascript:void(0)" > 
            <div class='submenu-title-container'>
              <div class='submenu-title'>Interests</div>
            </div>
            <FontAwesomeIcon icon={faShuttleSpace}/> 
          </a>
          </li>
          <li class='settings submenu-icon right'>
          <a href="javascript:void(0)" > 
            <div class='submenu-title-container'>
              <div class='submenu-title'>Friends</div>
            </div>
            <FontAwesomeIcon icon={faCogs}/> 
          </a>
          </li>
    </ul>
    { openFriends && <Modal title='Friends' closeFuntion = { setOpenFriends } component = { <Friends />} /> }
    </div>
  );
}

export default Header;
