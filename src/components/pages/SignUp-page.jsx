// ------------
// Sign up page
// ------------

// react
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// firebase
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
// assets
import logo from "../../assets/img/logo.svg";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState({
    name: "",
    isValid: false,
  });

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

  function handleUsername(e) {
    setUsername(() => {
      return {
        name: e,
        isValid: true,
      };
    });
  }

  function handlePassword(e) {
    setPassword(() => {
      return {
        characters: e,
        isValid: true,
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
    <div className="AuthPage min-h-100vh">
      <div className="AuthPage__logo transf-transl-50 ">
        <NavLink to="/night-owl">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className="AuthPage__wrapper transf-transl-50">
        <h2 className="AuthPage__wrapper__hdr fnt-hdr-l m-32">Sign Up</h2>
        <form
          className="AuthPage__wrapper__form m-auto"
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
            navigate("../account", {
              state: { username: username.name },
            });
          }}
          noValidate
        >
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
          </label>
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
          <button
            className="border-radius-7px-all border-none f-w-300 f-16"
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
        </form>
        <div className="AuthPage__wrapper__login txt-align-c">
          <p className="f-15">Already have an account? </p>
          <NavLink
            className="AuthPage__wrapper__login__link f-15"
            to="../log-in"
          >
            Log In
          </NavLink>
        </div>
      </div>
    </div>
  );
}
