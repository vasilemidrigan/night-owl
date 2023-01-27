// Sign up page

// imports
// -nmps
import { useState } from "react";
// - icons
import logo from "../../assets/img/logo.svg";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="SignUp">
      <div className="SignUp__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="SignUp__wrapper">
        <h2 className="SignUp__wrapper__hdr fnt-hdr-l">Sign Up</h2>
        <form action="" className="SignUp__wrapper__form">
          <label>
            <input type="email" name="email" placeholder="Email address" />
          </label>
          <label>
            <input type="password" name="password" placeholder="Password" />
          </label>
          <label>
            <input
              type="password"
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
