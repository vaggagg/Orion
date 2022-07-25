import './Styling/App.scss'
import { BrowserRouter, Routes, Route, Switch, Navigate } from 'react-router-dom';
import Form from './Pages/Form.js'
import Timeline from './Pages/Timeline.js'
import Friends from './ModalComponents/Friends'
import Modal from './BasicComponents/Modal';
import Rocket from './images/loadingRocket.webp';
import Helpers from './Global/Helpers'
import Loading from './Global/Loading'
import { connect } from 'react-redux';

function App(props) {
  const {isLogged} = props.autheduser;
  if(!isLogged)
  return { component: () => <Navigate to="/Login" /> }
  return (
    <div className="App">
      <div id="global-message-container" class='hidden'>
        <div id='message'></div>
      </div>
      <div id="loading-container" class='hidden'>
      <div class="moon">
        <img src={Rocket} style={{width: 30 + 'px', height: 30 + 'px'}} class="loader" />
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        </div>
      </div>
      <BrowserRouter>
        <Routes>
         
            <Route exact path='/Login' element={<Form />} />
            <Route path='/timeline' element={<Timeline />} />
            <Route path='timeline/friends' element={<Modal component={Friends} title='Friends' />} />
            <Route path='timeline/interests' element={<Timeline />} />
              
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function mapStateToProps ({autheduser}) {
  return {
    autheduser
  }
}
export default connect(mapStateToProps)(App)
