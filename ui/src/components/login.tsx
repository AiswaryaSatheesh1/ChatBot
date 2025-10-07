import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";


import "./login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
   const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
     try {
        const res = await fetch("http://127.0.0.1:8000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email
            , password: password }),
        });
  
        const data = await res.json();
        console.log("Status:", res.status, "Body:", data);

  
        if (res.ok && data.message === "Login successful") {
           localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

          setMessage("✅ Sign in successful!");
           console.log("User info:", data.user);
             navigate("/chat");
           } else {
        setMessage(`❌ ${data.detail}`);
      }
      } catch (error) {
            console.error(error);

        setMessage("⚠️ Server not reachable");
      }
    };
  

  return (
    <div className="signup-wrapper">
    <div className="signup-container">
      <h2>Login to your Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">
         Login
        </button>
      <div className="sp">  
  <Link to="/signup" style={{ color: "WHITE", cursor: "pointer", marginBottom: "10px" }}>
    Sign up
  </Link>
  </div>
      </form>
      {message && <p style={{ color: message.startsWith("✅") ? "green" : "red" }}>
  {message}
</p>}

    </div>
    </div>
  );
};

export default Login;
