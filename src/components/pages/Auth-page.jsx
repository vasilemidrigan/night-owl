// Sign up page

import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../firebase-config";
import { signUp } from "../../utils/auth-utils";
import logo from "../../assets/img/logo.svg";

export default function AuthPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [email, setEmail] = useState({
    address: "",
    isValid: false,
  });
  const [password, setPassword] = useState({
    characters: "",
    isValid: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    characters: "",
    isValid: false,
  });

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  useEffect(() => {
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/
    );
    const isValid = regexp.test(email.address);
    setEmailIsValid(isValid);
  }, [email.address]);

  function handleEmail(e) {
    setEmail(() => {
      return {
        address: e,
        isValid: emailIsValid ? true : false,
      };
    });
  }

  function handlePassword(e) {
    console.log(password.characters.length, password.characters);
    setPassword(() => {
      return {
        characters: e,
        isValid: password.characters.length >= 6 ? true : false,
      };
    });
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(() => {
      return {
        characters: e,
        isValid: e === password.characters ? true : false,
      };
    });
  }

  return (
    <div className="AuthPage">
      <div className="AuthPage__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="AuthPage__wrapper">
        <h2 className="AuthPage__wrapper__hdr fnt-hdr-l">
          {id == "sign-up" ? "Sign Up" : "Log In"}
        </h2>
        <form
          className="AuthPage__wrapper__form"
          onSubmit={(e) => {
            signUp(
              e,
              auth,
              email.address,
              password.characters,
              setEmail,
              setPassword,
              setConfirmPassword
            );
            navigate("/night-owl");
          }}
          noValidate
        >
          <label htmlFor="email" className={email.isValid ? "" : "invalid"}>
            <input
              type="email"
              id="email"
              value={email.address}
              onChange={(e) => handleEmail(e.target.value)}
              name="email"
              placeholder="Email address"
            />
          </label>
          <label
            htmlFor="password"
            className={password.isValid ? "" : "invalid"}
          >
            <input
              type="password"
              id="password"
              value={password.characters}
              onChange={(e) => handlePassword(e.target.value)}
              name="password"
              placeholder="Password"
            />
          </label>
          <label
            htmlFor="confirm_password"
            className={confirmPassword.isValid ? "" : "invalid"}
          >
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword.characters}
              onChange={(e) => handleConfirmPassword(e.target.value)}
              name="confirm_password"
              placeholder="Confirm password"
            />
          </label>
          {id == "sign-up" && (
            <button
              type="submit"
              disabled={
                !confirmPassword.isValid
                  ? true
                  : false || !email.isValid
                  ? true
                  : false
              }
            >
              Create an account
            </button>
          )}
        </form>
        <div className="AuthPage__wrapper__login">
          <p>{id == "sign-up" ? "Already" : `Don't`} have an account? </p>
          <NavLink
            className="AuthPage__wrapper__login__link"
            to={id == "sign-up" ? "../log-in" : "../sign-up"}
          >
            {id == "sign-up" ? "Log in" : "Sign up"}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
