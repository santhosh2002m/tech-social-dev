import { useState } from "react";
import "../../styles/custom.scss";

export default function SignUp({ isRightPanelActive }) {
  const [showOtpForm, setShowOtpForm] = useState(false);

  const [userProfile, setUserProfile] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    password: "",
    current_password: "",
  });

  const [otp, setOtp] = useState("");

  function userSubmitProfile(e) {
    // console.log(e.target);
    const { name, value } = e.target;
    // console.log(name, value);
    setUserProfile((prviousEl) => ({ ...prviousEl, [name]: value }));
  }

  function onSubmit() {
    if (
      userProfile.username === "" ||
      userProfile.fullname === "" ||
      userProfile.email === "" ||
      userProfile.phone === "" ||
      userProfile.password === "" ||
      userProfile.current_password === ""
    ) {
      alert("Fill inputs All");
      return;
    }
    setShowOtpForm(true);
    console.log(userProfile);
  }

  return (
    <div
      className={`form-container sign-up ${isRightPanelActive ? "active" : ""}`}
    >
      {!showOtpForm ? (
        <form className="form">
          <h1 className="margin-unset">Sign Up</h1> {/* Corrected typo */}
          <input
            name="username"
            value={userProfile.username}
            type="text"
            placeholder="Username"
            onChange={userSubmitProfile}
            className="black-bg"
          />
          <input
            name="fullname"
            value={userProfile.fullname}
            type="text"
            placeholder="Full Name"
            onChange={userSubmitProfile}
            className="black-bg"
          />
          <input
            name="email"
            value={userProfile.email}
            type="email"
            placeholder="Email"
            onChange={userSubmitProfile}
            className="black-bg"
          />
          <input
            name="phone"
            value={userProfile.phone}
            type="tel"
            placeholder="Phone Number"
            onChange={userSubmitProfile}
            className="black-bg"
          />
          <input
            name="password"
            value={userProfile.password}
            type="password"
            placeholder="Password"
            onChange={userSubmitProfile}
            className="black-bg"
          />
          <input
            name="current_password"
            value={userProfile.current_password}
            type="password"
            placeholder="Confirm Password"
            onChange={userSubmitProfile}
            className="black-bg"
          />
          <div className="checkbox-container">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              {/* <label className="label-flex">I agree to the</label> */}
              <p className="custom-style">
                By Signing up, you are acknowledging that you have read,
                understood and accept our{" "}
                <a className="link custom-style-a" href="#">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a className="link custom-style-a" href="#">
                  Privacy policy
                </a>
              </p>
            </label>
          </div>
          <div className="button-group">
            <button
              type="button"
              onClick={() => {
                onSubmit(); // logs userProfile
              }}
            >
              Request OTP
            </button>
          </div>
        </form>
      ) : (
        <form className="form">
          <h1>Verify OTP</h1>
          <p className="description">Enter the OTP received on your email</p>
          <input
            className="black-bg"
            value={otp}
            type="text"
            placeholder="Enter OTP"
          />
          <div className="button-group btn-margin">
            <button type="button" onClick={() => setShowOtpForm(false)}>
              Back
            </button>
            <button type="submit">Verify</button>
          </div>
        </form>
      )}
    </div>
  );
}
