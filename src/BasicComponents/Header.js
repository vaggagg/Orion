import Logo from '../images/orion.png';
import '../Styling/Basic.scss';
 function Header(props) {
  return (
    <header className="header">
        <div className="logo-container">
           <a href='#'><img src={Logo} alt='Logo' /></a> 
        </div> 
    </header>
  );
}

export default Header;
