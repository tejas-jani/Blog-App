import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import fetchFromApi from "../api";

export const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    (async () => {
      const { data: user } = await fetchFromApi("/profile", {
        method: "GET",
        credentials: "include",
      });
      setUserInfo(user);
      // setRedirect(true);
    })();
  }, []);

  const logOut = async () => {
    const { response } = await fetchFromApi("/logout", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      setUserInfo(null);
     setRedirect(true)
    }
  };
  if (redirect){ 
    
    setRedirect(false)
    return <Navigate to="/" />;
  }
  const username = userInfo?.username || null;
  return (
    <header>
      <Link to="/" className="logo">
      Reader.me
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Createnew Post</Link>
            <a onClick={logOut}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};
