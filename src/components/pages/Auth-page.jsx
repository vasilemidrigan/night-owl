// ------------
// Sign up page
// ------------

// react
import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
// firebase
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
// assets
import logo from "../../assets/img/logo.svg";

export default function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState({
    name: "",
    isValid: true,
    error_message:
      "start with a letter, allowed characters: a-z A-Z 0-9 - and _ ",
  });
  const [email, setEmail] = useState({
    address: "",
    isValid: true,
    error_message: "incorrect email address",
  });
  const [password, setPassword] = useState({
    characters: "",
    isValid: false,
    error_message: "password must have at least 6 characters",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    characters: "",
    isValid: false,
    error_message: "passwords don't match",
  });

  const signUp = async function (
    e,
    email,
    password,
    setEmail,
    setPassword,
    setConfirmPassword
  ) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        setEmail(() => {
          return {
            address: "",
            isValid: true,
          };
        });
        setPassword(() => {
          return {
            characters: "",
            isValid: true,
          };
        });
        setConfirmPassword(() => {
          return {
            characters: "",
            isValid: true,
          };
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  // handle username
  function handleUsername(e) {
    const regexp = new RegExp(/[a-zA-Z][a-zA-Z0-9-_]{5,32}/gi);
    const name = e;
    const isValid = regexp.test(name);
    setUsername(() => {
      return {
        ...username,
        name: name,
        isValid: isValid ? true : false,
      };
    });
  }
  // handle email
  function handleEmail(e) {
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/
    );
    const currentEmail = e;
    const isValid = regexp.test(currentEmail);
    setEmail(() => {
      return {
        ...email,
        address: currentEmail,
        isValid: isValid ? true : false,
      };
    });
  }
  // handle password
  function handlePassword(e) {
    const chars = e;
    setPassword(() => {
      return {
        ...password,
        characters: e,
        isValid: chars.length >= 6 ? true : false,
      };
    });
  }
  // handle confirm password
  function handleConfirmPassword(e) {
    const chars = e;
    setConfirmPassword(() => {
      return {
        ...confirmPassword,
        characters: e,
        isValid: chars === password.characters ? true : false,
      };
    });
  }

  console.log(confirmPassword);

  return (
    <div className="AuthPage min-h-100vh">
      <div className="AuthPage__logo transf-transl-50 ">
        <NavLink to="/night-owl">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div
        className={`AuthPage__wrapper ${
          location.pathname === "/night-owl/auth/sign-up"
            ? "h-550px"
            : "h-380px"
        } transf-transl-50`}
      >
        <h2 className="AuthPage__wrapper__hdr fnt-hdr-l m-32">
          {location.pathname === "/night-owl/auth/sign-up"
            ? "Sign Up"
            : "Log In"}
        </h2>
        <form
          className="AuthPage__wrapper__form m-auto"
          onSubmit={(e) => {
            signUp(
              e,
              email.address,
              password.characters,
              setEmail,
              setPassword,
              setConfirmPassword
            );
            navigate("../account", {
              state: { username: username.name },
            });
          }}
          noValidate
        >
          {/* username */}
          {location.pathname === "/night-owl/auth/sign-up" && (
            <label
              htmlFor="username"
              className={username.isValid ? "" : "invalid"}
            >
              <input
                type="text"
                id="username"
                value={username.name}
                onChange={(e) => handleUsername(e.target.value)}
                name="username"
                placeholder="Username"
              />
              <div
                className={`error ${
                  username.isValid || username.name.length === 0 ? "hidden" : ""
                }`}
              >
                {username.error_message}
              </div>
            </label>
          )}
          {/* email */}
          <label htmlFor="email" className={email.isValid ? "" : "invalid"}>
            <input
              type="email"
              id="email"
              value={email.address}
              onChange={(e) => handleEmail(e.target.value)}
              name="email"
              placeholder="Email"
            />
            <div
              className={`error ${
                email.isValid || email.address.length == 0 ? "hidden" : ""
              }`}
            >
              {email.error_message}
            </div>
          </label>
          {/* password */}
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
            <div
              className={`error ${
                password.isValid || password.characters.length === 0
                  ? "hidden"
                  : ""
              }`}
            >
              {password.error_message}
            </div>
          </label>
          {/* confirm password */}
          {location.pathname === "/night-owl/auth/sign-up" && (
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
              <div
                className={`error ${
                  confirmPassword.isValid ||
                  confirmPassword.characters.length === 0
                    ? "hidden"
                    : ""
                }`}
              >
                {confirmPassword.error_message}
              </div>
            </label>
          )}
          {/* submit */}
          <button
            className={`border-radius-7px-all border-none f-w-300 f-16`}
            type="submit"
            disabled={
              !confirmPassword.isValid
                ? true
                : false || !email.isValid
                ? true
                : false
            }
          >
            {location.pathname === "/night-owl/auth/sign-up"
              ? "Create an account"
              : "Log into your account"}
          </button>
        </form>
        <div className="AuthPage__wrapper__login txt-align-c">
          <p className="f-15">
            {location.pathname === "/night-owl/auth/sign-up"
              ? "Already have an account? "
              : "Don't have an account? "}
          </p>
          <NavLink
            className="AuthPage__wrapper__login__link f-15"
            to={
              location.pathname === "/night-owl/auth/sign-up"
                ? "../log-in"
                : "../sign-up"
            }
          >
            {location.pathname === "/night-owl/auth/sign-up"
              ? "LogIn"
              : "SignUp"}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
