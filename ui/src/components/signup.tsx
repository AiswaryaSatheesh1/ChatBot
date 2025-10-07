import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          name: name,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Signup successful!");
      } else {
        setMessage(`❌ ${data.detail}`);
      }
    } catch (error) {
      setMessage("⚠️ Server not reachable");
    }
  };

  return (
        <div className="signup-wrapper">

    <div className="signup-container">
      <h2>Signup</h2>
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
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          Signup
        </button>
       <div style={{ marginTop: "10px" }}>
 
  <Link to="/login" style={{ color: "white", cursor: "pointer" }}>
    Login
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

export default Signup;
