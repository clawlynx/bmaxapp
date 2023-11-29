import React, { useState } from "react";
import FormElement from "../components/FormElement";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="min-h-screen grid items-center">
      <form className="form max-w-md border-t-4 border-blue-700">
        <div className=" flex items-center justify-center gap-3 my-0 mx-auto mb-5">
          <img className=" w-16 h-16" src="main.png" alt="logo"></img>
          <h1 className="font-semibold text-4xl">Bemax TS Portal</h1>
        </div>
        <h4 className=" text-center text-xl font-semibold mb-5">Login</h4>
        <FormElement
          type={"email"}
          name={"email"}
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormElement
          type={"password"}
          name={"password"}
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-700 w-full py-2 mt-4 text-white rounded-sm hover:bg-blue-500"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Not registered?{" "}
          <Link to={"/register"} className="text-blue-700">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
