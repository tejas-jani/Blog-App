import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import fetchFromApi from "../api";
export default function LoginPage() {
  const { setUserInfo } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    try {
      const { response, data } = await fetchFromApi("/login",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response.ok) {
        setUserInfo(data);
        setRedirect(true);
      }
    } catch (err)  {
      setError({ msg:  err.message });
      const callback = setTimeout(() => {
        setError(null);
        clearTimeout(callback);
      }, 3000);
    }
  };
  if (redirect) return <Navigate to="/" />;
  return (
    <form onSubmit={login} className="login">
      <h1>Login</h1>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
      {error && <span className="error">{error?.msg}</span>}
    </form>
  );
}
