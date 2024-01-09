import { useState } from "react";
import { Navigate } from "react-router-dom";
import fetchFromApi from "../api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const register = async (e) => {
    e.preventDefault();
    try {
      const { response, data } = await fetchFromApi("/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "content-Type": "application/json" },
      });
      if (response.ok) setRedirect(true);

    } catch (err) {
      setError({ msg: err.message });
      const callback = setTimeout(() => {
        setError(null);
        clearTimeout(callback);
      }, 3000);
    }
  };
  if (redirect) return <Navigate to="/login" />;
  return (
    <form onSubmit={register} className="login">
      <h1>Register</h1>

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
      <button>Register</button>
      {error && <span className="error">{error?.msg}</span>}
    </form>
  );
}

// // Create an AbortController instance
// const controller = new AbortController();

// // Obtain a reference to the AbortSignal
// const signal = controller.signal;
// // Make a fetch request with the signal
// fetch('https://api.example.com/data', { signal })
//   .then(response => {
//     // Handle the response
//   })
//   .catch(error => {
//     // Handle errors
//   });
// // To cancel the request, call the abort() method on the controller
// controller.abort();
