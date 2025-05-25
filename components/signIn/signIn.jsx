import { useState } from "react";

import "../../styles/custom.scss";

export default function SignIn({ isRightPanelActive, setIsRightPanelActive }) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [credential, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [forgotpas, setForgotPas] = useState("");

  function userSubmitCredential(e) {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);

    setCredentials((prviousEl) => ({ ...prviousEl, [name]: value }));
  }

  function userSubmitforgotPass(e) {
    e.preventDefault();
    if (forgotpas === "") {
      alert("fill input");
      return;
    }
    console.log(forgotpas);
  }

  function onSubmitCredentials(e) {
    e.preventDefault();
    if (credential.email === "" || credential.password === "") {
      alert("Fill  All");
      return;
    }
    console.log(credential);
  }

  return (
    <div
      className={`form-container sign-in ${isRightPanelActive ? "hidden" : ""}`}
    >
      {!showForgotPassword ? (
        <form onSubmit={onSubmitCredentials} className="form">
          <h1>Sign In</h1>
          <span>or use your account</span>
          <input
            name="email"
            onChange={userSubmitCredential}
            value={credential.email}
            type="email"
            placeholder="Email"
            className="black-bg"
          />
          <input
            name="password"
            value={credential.password}
            type="password"
            placeholder="Password"
            onChange={userSubmitCredential}
            className="black-bg"
          />
          <a href="#" onClick={() => setShowForgotPassword(true)}>
            Forgot your password?
          </a>
          <div className="button-group">
            <button type="submit" className="desktop-only">
              Sign In
            </button>
            <button type="button" onClick={() => setIsRightPanelActive(true)}>
              Sign Up
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={userSubmitforgotPass} className="form">
          <h1>Forgot Password</h1>
          <p className="description">
            Enter your email to receive a password reset link
          </p>
          <input
            value={forgotpas}
            onChange={(e) => setForgotPas(e.target.value)}
            type="email"
            placeholder="Email"
            className="black-bg"
          />
          <div className="button-group btn-margin">
            <button type="button" onClick={() => setShowForgotPassword(false)}>
              Back
            </button>
            <button type="submit">Send Link</button>
          </div>
        </form>
      )}
    </div>
  );
}
