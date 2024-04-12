import React, { useState } from "react";

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with email:", email, "and password:", password);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Signing up with name:",
      name,
      "email:",
      email,
      "and password:",
      password
    );
  };

  return (
    <div className="center-container">
      <div className="form-container">
        {isLogin ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div>
                <label>Email:</label>
                <input
                  className="form-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  className="form-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="form-submit w-full" type="submit">
                Login
              </button>
            </form>
            <div className="switch-button">
              <button
                className="form-submit w-full bg-purple-500 hover:bg-purple-700"
                onClick={handleSwitchForm}
              >
                Switch to Signup
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
            <form onSubmit={handleSignupSubmit}>
              <div>
                <label>Name:</label>
                <input
                  className="form-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  className="form-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  className="form-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={handleShowPassword}
                />
                <label>Show Password</label>
              </div>
              <button className="form-submit w-full" type="submit">
                Signup
              </button>
            </form>
            <div className="switch-button">
              <button
                className="form-submit w-full bg-purple-500 hover:bg-purple-700"
                onClick={handleSwitchForm}
              >
                Switch to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
