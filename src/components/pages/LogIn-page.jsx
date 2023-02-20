// -----------
// Log In page
// -----------

// react
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// firebase
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
// context
import { AuthDataContext } from "../../context/Auth-Context";
// assets
import logo from "../../assets/img/logo.svg";

export default function LogInPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useContext(AuthDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
    if (user) {
      navigate("../account");
    }
  };

  return (
    <div className="AuthPage">
      <div className="AuthPage__logo">
        <NavLink to="/night-owl">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className="AuthPage__wrapper">
        <h2 className="AuthPage__wrapper__hdr fnt-hdr-l">Log In</h2>
        <form
          className="AuthPage__wrapper__form"
          onSubmit={(e) => handleSubmit(e)}
          noValidate
        >
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </label>
          <button>Log In</button>
        </form>
        <div className="AuthPage__wrapper__login">
          <p>Don't have an account? </p>
          <NavLink className="AuthPage__wrapper__login__link" to="../sign-up">
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
}
