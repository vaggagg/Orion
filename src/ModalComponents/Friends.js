import '../Styling/Basic.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCommentDollar, faPeopleArrows, faPersonWalking, faShuttleSpace, faSmileWink, faSpaceShuttle, faTruckLoading, faUserAstronaut, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import * as ReactDOM from 'react-dom';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { faCheckCircle, faMinusCircle, faSmile } from "@fortawesome/free-solid-svg-icons";
import createMsgPopUp from '../Global/Helpers';
import setLoading from '../Global/Loading';
function Friends( props ) {
    const navigate = useNavigate();
    const [ searchText, setSearchText ] = useState('');
    const [searchFriends, setSearchFriends] = useState([]);
    const [ pendingList, setPendingList] = useState([]);
    const [ friendsList, setFriendsList] = useState([]);
    const [ pendingListAsString, setPendingListAsString] = useState('');
    const [ friendsListAsString, setFriendsListAsString ] = useState('');
    const { title, component, closeFuntion } = props;
    const pendingStringRef = React.useRef();
    pendingStringRef.current = pendingListAsString;
    const friendsStringRef = React.useRef();
    friendsStringRef.current = friendsListAsString;
    const onSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }
    useEffect(() => {
      fetchAll();
    },[]);
    const fetchAll = () => {
      axios.post('http://localhost/orion/orion/src/api/general/friends.php', {email: 'test@test', action: 'GetFriends'}).then(function(response){
          const  { PENDING, FRIENDS } = response.data[0];

          setPendingListAsString(PENDING);

          setFriendsListAsString(FRIENDS);
          let pendingListSplit = PENDING !=='' ? PENDING.split('#'): [];
          let friendsListSplit = FRIENDS !=='' ? FRIENDS.split('#') : [];
          pendingListSplit.forEach(element => {
            axios.post('http://localhost/orion/orion/src/api/general/users.php', { email: element, action: 'SearchUsersByEmail' }).then(function(response){
              if(response.data.length!==0)
                setPendingList(pendingList => {
                  return [...pendingList,response.data];
                });
            });
          });
        friendsListSplit.forEach(element => {
          axios.post('http://localhost/orion/orion/src/api/general/users.php', { email: element, action: 'SearchUsersByEmail' }).then(function(response){
            if(response.data.length!==0)
              setFriendsList(friendsList => {
                return [...friendsList,response.data];
              })
          });
        });
      })
    }
    useEffect(()=>{
      //console.log(pendingList)
    },[pendingList])
    const addFriend = (email) => {
      setLoading(true);
      let newPendingString;
      if (pendingStringRef.current.includes('#')){
        const positionOfEmailPending = pendingStringRef.current.indexOf(email) - 1;
        newPendingString = pendingStringRef.current.charAt(positionOfEmailPending) =='#' ? pendingStringRef.current.replace('#' + email,'') : pendingStringRef.current.replace( email +'#','');
      }
      else
       newPendingString = pendingStringRef.current.replace(email,'');
      const newFriendsString = friendsStringRef.current + '#'+ email;
      
        axios.post('http://localhost/orion/orion/src/api/general/friends.php', { email: 'test@test', pending: newPendingString, action: 'UpdatePending'}).then(function(response){
          if (response.status== 200){
            
            setPendingListAsString(newPendingString);
            setPendingList(pendingList.filter(x=>x[0].EMAIL!==email));
          }
        });
        axios.post('http://localhost/orion/orion/src/api/general/friends.php', { email: 'test@test', friends: newFriendsString , action: 'UpdateFriends'}).then(function(response){
          if( response['status'] == 200 ) {
            setLoading(false);
            setFriendsListAsString(newFriendsString);
            setFriendsList([...friendsList,...pendingList.filter(x=>x[0].EMAIL==email)]);
            createMsgPopUp('User has been successfully added','success');
          }
          else
            createMsgPopUp('Something went wrong when adding', 'error');
        });

  }
    const removeFriend = (email) => {
      
      let newFriendsString;
      if ( friendsStringRef.current.includes('#')) {
        const positionOfEmailFriends = friendsStringRef.current.indexOf(email) - 1;
        newFriendsString = friendsStringRef.current.charAt(positionOfEmailFriends) =='#' ? friendsStringRef.current.replace('#' + email,'') : friendsStringRef.current.replace( email +'#','');
      }
      else
      newFriendsString = friendsStringRef.current.replace( email,'');  
     
      console.log(newFriendsString)
      axios.post('http://localhost/orion/orion/src/api/general/friends.php', { email: 'test@test', friends: newFriendsString , action: 'UpdateFriends'}).then(function(response){
        console.log(response)
          if( response['status'] == 200 ) {
            createMsgPopUp('User has been successfully deleted','success');
            setFriendsListAsString(newFriendsString);
            setFriendsList(friendsList.filter(x=>x[0].EMAIL!==email));
          }
            else
            createMsgPopUp('Something went wrong when deleting the user', 'error');
        });
    }
    const removePending = (email) => {
      let newPendingString;
      if ( pendingStringRef.current.includes('#')) {
        const positionOfEmailPending = pendingStringRef.current.indexOf(email) - 1;
        newPendingString = pendingStringRef.current.charAt(positionOfEmailPending) =='#' ? pendingStringRef.current.replace('#' + email,'') : pendingStringRef.current.replace( email +'#','');
      }
      else
        newPendingString = pendingStringRef.current.replace(email,'');
     
      axios.post('http://localhost/orion/orion/src/api/general/friends.php', { email: 'test@test', pending: newPendingString , action: 'UpdatePending'}).then(function(response){
          if( response['status'] == 200 ) {
            createMsgPopUp('User has been successfully deleted','success');
            setPendingListAsString(newPendingString);
            setPendingList(pendingList.filter(x=>x[0].EMAIL!==email));
          }
            else
            createMsgPopUp('Something went wrong when deleting the user', 'error');
        });
    }
    const createSearchResults = (array) => {
    const container = document.getElementById('search-results-friends');
    container.classList.remove('hidden')

    if(!container)
        return;

    var results = array.map((user,key)=>
    <li key={key} class='results'>
      <a href='' className='username'> {user.USERNAME}</a>
      <div class='name-container'> 
        <a href='' className='name'>{user.NAME }</a>
        <a href='' className='surname'> {user.SURNAME}</a>
      </div>
      <button class='btn btn1' onClick={()=>addFriend(user.EMAIL)}>Add Friend</button>
    </li> )
    
    setSearchFriends(results)
    }
    const search = () => {
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
      <div>
      
        <div className='friends-container'>
            <div class= 'mainTitle'>
               Look for new Friends <FontAwesomeIcon icon={faSmileWink}/>
            </div>
            <div className='search-container'>
                <input className='search-input' onChange = {onSearchTextChange} placeholder='Search...'></input>
                <div class='search-icon' onClick = {search} ><FontAwesomeIcon icon={ faSearch }/></div>
                <ul id='search-results-friends' className='hidden'>
                  {searchFriends}
                </ul>
            </div>
            {  !pendingList.length == 0 &&
              <div> 
                <div class='mainTitle'> Pending requests <FontAwesomeIcon icon={faShuttleSpace}/></div> 
                <div class='pending-list-container'> 
                { pendingList.map((user,key)=> 
                    <li key={key} class='results'>
                      <a href='' className='username'> {user[0].USERNAME}</a>
                      <div class='name-container'> 
                        <a href='' className='name'>{user[0].NAME }</a>
                        <a href='' className='surname'> {user[0].SURNAME}</a>
                      </div>
                      <div class='pending-buttons'>
                        <div class='add-button' onClick={()=>addFriend(user[0].EMAIL)}><FontAwesomeIcon icon={faCheckCircle}/> </div>
                        <div class='remove-button' onClick={()=>removePending(user[0].EMAIL)}><FontAwesomeIcon icon={faXmarkCircle}/> </div>
                      </div> 
                    </li>
                  )
                }
              </div> 
              </div>
            }
            { !friendsList.length == 0 
              ? <div> 
                <div class='mainTitle'> All of my Friends <FontAwesomeIcon icon={ faPeopleArrows}/> </div> 
                <div class='friends-list-container'> 
                { friendsList.map((user,key)=> 
                    <li key={key} class='results'>
                      <a href='' className='username'> {user[0].USERNAME}</a>
                      <div class='name-container'> 
                        <a href='' className='name'>{user[0].NAME }</a>
                        <a href='' className='surname'> {user[0].SURNAME}</a>
                      </div>
                      <div class='pending-buttons'>
                        <div class='remove-button' onClick={()=>removeFriend(user[0].EMAIL)}><FontAwesomeIcon icon={faXmarkCircle}/> </div>
                      </div> 
                    </li>
                  )
                }
                 </div> 
              </div>
              : <div class='content'> You currently do not have friends. Why don't you add one ? :D </div>
            }              
        </div>
      </div>
    );
  }
  
  export default Friends;