import React from "react";

const Register = () => {
  return (
    <>
      <div className="registerForma">
        <h1>Register</h1>
        <input type="text" name="email" placeholder="Enter your mail.." />
        <input
          type="password"
          name="password"
          placeholder="Enter your password.."
        />
        <button>Sign up</button>
      </div>
    </>
  );
};

export default Register;
