import '../Styling/Basic.scss'
function createMsgPopUp ( text , type,  time = 5000 ) {
  const  selector = document.getElementById('global-message-container');
  const  message = document.getElementById('message');
  message.innerHTML =text;

  selector.classList.remove('hidden');
  selector.classList.add(type)
  setTimeout(()=> {
      selector.classList.add('hidden');
      selector.classList.remove(type);
    },time)
  }
 
  
  export default createMsgPopUp;