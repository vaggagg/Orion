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

        func([...addedList,s]) // change the state of interests in create js
        setAddedList([...addedList, s]);
        
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
                let array = response.data.map ( e=>( { name: e.NAME, id: e.ID }))
                setCurrentList(array);
             })
        }
        if( type == 'orders' ) {
            axios.post('http://localhost/orion/orion/src/api/general/secondary_conditions.php', { action:'GetAllOrders'} ).then(function(response){ 
                console.log(response.data)
                let array = response.data.map ( e=>( { name: e.NAME, id: e.ID }))
                setCurrentList(array);
            })
        }
        if(type=='interestsForPost') {
            axios.post('http://localhost/orion/orion/src/api/general/interests.php', { action:'interestsForPost'} ).then(function(response){ 
                let array = response.data.map ( e=>( { name: e.NAME, id: e.ID }))
                setCurrentList(array);
             })
        }
    },[])
    const addTags = (listOfTags , idOfEntity, table) => {
        axios.post('http://localhost/orion/orion/src/api/general/'+table+'.php', { action:'searchTagsByEntityID', entity_id: 1 } ).then(function(response){ 
                let array = response.data.map ( e=>( { ENTITY_ID: e.ENTITY_ID, TAG_ID: e.TAG_ID }))
                console.log(response.data)
        })
        listOfTags.forEach(element => {
            
        });
    }
    
    return (
        <div class="List-container">
            All interests
            <ul class="current-list">
                
                {currentList.map((s) => (
                <li data-id={s.id} onClick={()=>addItemToAddedList(s)}>
                {s.name}<div class='icon-1'><FontAwesomeIcon icon={faPlus}/> </div>
                </li>)) }
            </ul>
            Added interests
            <ul class="added-list">
            
            {addedList.map((s) => (
                <li data-id={s.id} onClick={()=>removeItemFromAddedList(s)}>
                {s.name}<div class='icon-1'><FontAwesomeIcon icon={faMinus}/> </div>
                </li>)) }
            </ul>
      </div>
    );
  }
  
  export default List;