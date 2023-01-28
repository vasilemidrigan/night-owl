// Sign up page

import { useState } from "react";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

import logo from "../../assets/img/logo.svg";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleRepeatPassword(e) {
    setRepeatPassword(e.target.value);
  }

  // sign up
  const signUp = async function (event) {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        setEmail("");
        setPassword("");
        setRepeatPassword("");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="SignUp">
      <div className="SignUp__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="SignUp__wrapper">
        <h2 className="SignUp__wrapper__hdr fnt-hdr-l">Sign Up</h2>
        <form className="SignUp__wrapper__form" onSubmit={signUp}>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmail}
              name="email"
              placeholder="Email address"
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
              name="password"
              placeholder="Password"
            />
          </label>
          <label htmlFor="repeat_password">
            <input
              type="password"
              id="repeat_password"
              value={repeatPassword}
              onChange={handleRepeatPassword}
              name="password"
              placeholder="Repeat password"
            />
          </label>
          <button type="submit">Create an account</button>
        </form>
        <div className="SignUp__wrapper__sign-in">
          <p>Already have an account?</p>
          <span> Login</span>
        </div>
      </div>
    </div>
  );
}
