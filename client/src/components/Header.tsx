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
        <div className={`leftHeaderSection ${location.pathname === '/' ? 'leftHeaderCenter' : 'leftHeaderLeft'}`}>
          <img className="logo" src="/recipeFinderLogo.svg" alt="logo" />
          <h1 className={location.pathname === '/' ? "headerTitle" : "subpageheaderTitle"}>RECIPE FINDER!</h1>
      </div>
        <div className="rightHeaderSection">
            {location.pathname === '/' ? null : <button className="subheaderButton" onClick={() => navigate('/')}>Search</button>}
            <button className="subheaderButton"
                 onClick={() => navigate('/quiz')}>Quiz</button>
            <button className="subheaderButton"
                onClick={() => navigate('/myMeals')}>MyMeals</button>
            <div className="logIn">
              {user? <p>Hello {user.displayName}!</p>: <p></p>}
              <button onClick={handleLoginClick}>{user? "Sign Out" : "Log in"}</button>
            </div>
        </div>
    </div>
  );
};

export default Header;