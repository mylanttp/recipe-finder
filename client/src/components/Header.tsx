import { signIn, signOut } from "../auth/auth";
import { useAuth } from "../auth/AuthUserProvider";
import "../styles/headerStyle.css"
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const {user} = useAuth()
  const location = useLocation();

  const handleLoginClick = async () => {
    if (user){
      await signOut()
    } else {
      signIn()
    }
  };

  return (
  <div className={`pageHeader ${location.pathname === '/' ? '' : 'subpageHeader'}`}>
        <h1 className={`headerTitle ${location.pathname === '/' ? '' : 'subpageheaderTitle'}`}>RECIPE FINDER!</h1>
        <div className="rightHeaderSection">
            {location.pathname === '/' ? null : <button className="subheaderButton" onClick={() => navigate('/')}>Search</button>}
            <button className="subheaderButton"
                 onClick={() => navigate('/quiz')}>Quiz</button>
            <button className="subheaderButton"
                onClick={() => navigate('/myMeals')}>MyMeals</button>
            {user? <p>Hello {user.displayName}!</p>: <p></p>}
            <button onClick={handleLoginClick}>{user? "Sign Out" : "Log in"}</button>
        </div>
    </div>
  );
};

export default Header;