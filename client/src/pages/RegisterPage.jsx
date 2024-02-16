import React, { useState } from "react";
import FormElement from "../components/FormElement";
import { Link, useNavigate } from "react-router-dom";
import FormSelectElement from "../components/FormSelectElement";
import { branches, courses } from "../../../utils/constants";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/userApiSlice";

import Loading from "../components/Loading";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(0);
  const [branch, setBranch] = useState(branches?.MEVARAM || "");
  const [course, setCourse] = useState(courses?.IELTS_1_MONTH || "");
  const [isTeacher, setIsTeacher] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords does not match");
      return;
    } else {
      try {
        const res = await register({
          name,
          email,
          phone,
          address,
          age,
          branch,
          course,
          isTeacher,
          password,
        }).unwrap();
        navigate("/dashboard");
        toast.success("successfully registered");
      } catch (err) {
        toast.error(err?.data?.msg || err?.error);
      }
    }
  };

  return (
    <div className=" min-h-screen grid items-center">
      <form className="form max-w-md border-t-4 border-blue-700">
        <div className=" flex items-center justify-center gap-3 my-0 mx-auto mb-5">
          <img
            className="w-10 h-10 md:w-16 md:h-16"
            src="main.png"
            alt="logo"
          ></img>
          <h1 className="font-semibold text-xl md:text-4xl">Bemax TS Portal</h1>
        </div>
        <h4 className=" text-center mb-5 text-base md:text-xl font-semibold">
          Register
        </h4>
        <FormElement
          type={"text"}
          name={"name"}
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormElement
          type={"email"}
          name={"email"}
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormElement
          type={"number"}
          name={"phone"}
          defaultValue={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <FormElement
          type={"textarea"}
          name={"address"}
          defaultValue={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <FormElement
          type={"number"}
          name={"age"}
          defaultValue={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <FormSelectElement
          name={"branch"}
          list={Object.values(branches)}
          defaultValue={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
        <FormSelectElement
          name={"course"}
          list={Object.values(courses)}
          defaultValue={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <div className=" flex items-center justify-start gap-3 mb-5">
          <label className="" htmlFor="teacher">
            Teacher
          </label>
          <input
            id="teacher"
            type="checkbox"
            checked={isTeacher}
            onChange={(e) => setIsTeacher(!isTeacher)}
          />
          <label className=" ms-5" htmlFor="student">
            Student
          </label>
          <input
            id="student"
            type="checkbox"
            checked={!isTeacher}
            onChange={(e) => setIsTeacher(!isTeacher)}
          />
        </div>
        <p className=" text-sm mb-5 text-red-500">
          Note: Teacher registrations will be subjected to verification
        </p>
        <FormElement
          type={"password"}
          name={"password"}
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormElement
          type={"password"}
          name={"confirmPassword"}
          labelText={"Confirm Password"}
          defaultValue={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-700 w-full py-2 mt-4 text-white rounded-sm hover:bg-blue-500"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Register
        </button>
        {isLoading && <Loading />}
        <p className="mt-4 text-center">
          Already registered?{" "}
          <Link to={"/login"} className="text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
