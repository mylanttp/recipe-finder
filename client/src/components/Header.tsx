import { signIn, signOut } from "../auth/auth";
import { useAuth } from "../auth/AuthUserProvider";
import "../styles/headerStyle.css"

const Header = () => {
  const {user} = useAuth()

  const handleLoginClick = async () => {
    if (user){
      await signOut()
    } else {
      signIn()
    }
  };

  return (
    <div className="pageHeader">
        <h1 className="headerTitle">RECIPE FINDER!</h1>
        <div className="rightHeaderSection">
            {user? <p>Hello {user.displayName}!</p>: <p></p>}
            <button onClick={handleLoginClick}>{user? "Sign Out" : "Log in"}</button>
        </div>
    </div>
  );
};

export default Header;