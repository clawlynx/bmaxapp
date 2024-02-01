import React, { useEffect, useState } from "react";
import FormElement from "../components/FormElement";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../slices/userApiSlice";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { setUser } from "../slices/userSlice";

function EditProfilePage() {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password does not match");
      return;
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          phone,
          address,
          age,
          password,
        }).unwrap();
        toast.success("Successfully updated");
        dispatch(setUser(res));
        navigate("/dashboard");
      } catch (error) {
        toast.error(err?.data?.msg || err?.error);
      }
    }
  };

  useEffect(() => {
    setName(userInfo?.name);
    setEmail(userInfo?.email);
    setPhone(userInfo?.phone);
    setAddress(userInfo?.address);
    setAge(userInfo?.age);
  }, [userInfo]);
  return (
    <div>
      <h1 className="text-xl md:text-3xl font-semibold">Edit Your Profile</h1>
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
            to={"/dashboard"}
            className=" bg-gray-700 text-white px-2 py-1 rounded-sm hover:bg-gray-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-800 text-white px-2 py-1 rounded-sm hover:bg-blue-500"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
        {isLoading && <Loading />}
      </form>
    </div>
  );
}

export default EditProfilePage;
