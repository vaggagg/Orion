import { useEffect, useState } from 'react';
import '../Styling/Basic.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus , faMinus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
function List( props ) {
    const { label, type, icon, func } = props;
    const [addedList, setAddedList] = useState([]);
    const [currentList, setCurrentList] = useState([])
    const addItemToAddedList = (s) => {
        const newList = currentList.filter ( x => x!=s );
        setCurrentList(newList);
        setAddedList([...addedList, s]);
        func([...addedList,s]) // change the state of interests in create js
    }
    const removeItemFromAddedList = (s) => {
        const newList = addedList.filter ( x => x!=s );
        setAddedList(newList);
        func(newList) // change the state of interests in create js
        setCurrentList([...currentList, s]);
    }
    const typeOfInput = type == undefined ? "text" : type
    const hasIconClass = icon == undefined ? false : true; 
    useEffect (()=> {
        if ( type == 'volunteerActivities') {
            axios.post('http://localhost/orion/orion/src/api/general/interests.php', { action:'GetAllInterests'} ).then(function(response){ 
                let array = response.data.map ( e=> e.NAME )
                setCurrentList(array);
             })
        }
        if( type=='orders') {
            axios.post('http://localhost/orion/orion/src/api/general/secondary_conditions.php', { action:'GetAllOrders'} ).then(function(response){ 
                console.log(response)
                let array = response.data.map ( e=> e.NAME )
                setCurrentList(array);
            })
        }
    },[])

    
    return (
        <div class="List-container">
            All interests
            <ul class="current-list">
                
                {currentList.map((s) => (
                <li onClick={()=>addItemToAddedList(s)}>
                {s}<div class='icon-1'><FontAwesomeIcon icon={faPlus}/> </div>
                </li>)) }
            </ul>
            Added interests
            <ul class="added-list">
            
            {addedList.map((s) => (
                <li onClick={()=>removeItemFromAddedList(s)}>
                {s}<div class='icon-1'><FontAwesomeIcon icon={faMinus}/> </div>
                </li>)) }
            </ul>
      </div>
    );
  }
  
  export default List;