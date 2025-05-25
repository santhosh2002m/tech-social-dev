"use client";

import { useState } from "react";
import SignIn from "../../components/signIn/signIn";
import SignUp from "../../components/signup/signup";

import "../../styles/custom.scss";

export default function LoginPage() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  return (
    <div className="container">
      <div
        className={`panel-container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        <SignUp isRightPanelActive={isRightPanelActive} />
        <SignIn
          isRightPanelActive={isRightPanelActive}
          setIsRightPanelActive={setIsRightPanelActive}
        />
        <div
          className={`overlay ${isRightPanelActive ? "-translate-x-full" : ""}`}
        >
          <div
            className={`overlay-content ${
              isRightPanelActive ? "translate-x-1/2" : ""
            }`}
          >
            <div className={`panel left ${isRightPanelActive ? "active" : ""}`}>
              <h1 className="black">Welcome Back!</h1>
              <p className="black">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="action-btn"
                onClick={() => setIsRightPanelActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className={`panel right ${isRightPanelActive ? "" : ""}`}>
              <h1 className="black">Hello, Friend!</h1>
              <p className="black">
                Enter your personal details and start journey with us
              </p>
              <button
                className="action-btn"
                onClick={() => setIsRightPanelActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
