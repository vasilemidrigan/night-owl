// Authentication utils

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// sign up
export const signUp = async function (
  e,
  auth,
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
