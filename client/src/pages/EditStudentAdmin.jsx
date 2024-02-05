import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormElement from "../components/FormElement";
import { branches, courses } from "../../../utils/constants";
import FormSelectElement from "../components/FormSelectElement";
import Loading from "../components/Loading";
import axios from "axios";
import {
  useGetAllStudentsQuery,
  useUpdateStudentMutation,
} from "../slices/adminApiSlice";
import { toast } from "react-toastify";

function EditStudentAdmin() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [course, setCourse] = useState("");
  const navigate = useNavigate();
  const [updateStudent, { isLoading }] = useUpdateStudentMutation();
  const { refetch } = useGetAllStudentsQuery();

  async function fetchdata() {
    const { data } = await axios.get(`/api/v1/admin/student/${id}`);
    console.log(data);
    setName(data.name);
    setEmail(data.email);
    setAddress(data.address);
    setPhone(data.phone);
    setAge(data.age);
    setBranch(data.branch);
    setCourse(data.course);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("Passwords doesnt match");
    } else {
      const bodyData = {
        id,
        name,
        email,
        address,
        phone,
        age,
        branch,
        course,
        password,
      };
      try {
        const res = await updateStudent(bodyData).unwrap();
        toast.success("successfully updated");
        refetch();
        navigate("/dashboard/all-students");
      } catch (err) {
        toast.error(err?.data?.msg || err?.error);
      }
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold">Edit Student</h1>
      <form className="mt-5 max-w-md">
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
        <div className="flex gap-2 justify-end text-lg">
          <Link
            to={"/dashboard/all-students"}
            className=" bg-gray-700 text-white px-2 py-1 rounded-sm hover:bg-gray-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-800 text-white px-2 py-1 rounded-sm hover:bg-blue-500"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Save
          </button>
          {isLoading && <Loading />}
        </div>
      </form>
    </div>
  );
}

export default EditStudentAdmin;
