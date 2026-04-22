import { useState } from "react";
import { signIn, signOut } from "../auth/auth";
import { useAuth } from "../auth/AuthUserProvider";
import "../styles/headerStyle.css"

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const {user} = useAuth()

  const handleLoginClick = async () => {
    if (loggedIn){
      await signOut()
    } else {
      signIn()
    }
    setLoggedIn(!loggedIn)
  };

  return (
    <div className="header">
        <h1 className="pageTitle">Recipe Finder!</h1>
            {user? <p>Hello! {user.displayName}</p>: <p></p>}
            <button className="logIn" onClick={handleLoginClick}>{user? "Sign Out" : "Log in"}</button>
    </div>
  );
};

export default Header;