import React, { useEffect, useState } from "react";
import FormElement from "../components/FormElement";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { useUpdateAnnouncementMutation } from "../slices/adminApiSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

function EditAnnouncement() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const [updateAnnouncement, { isLoading }] = useUpdateAnnouncementMutation();

  async function fetchannouncement() {
    const { data } = await axios.get(`/api/v1/auth/announcements/${id}`);
    setTitle(data.title);
    setContent(data.content);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await updateAnnouncement({ id, title, content }).unwrap();
      toast.success("successfully updated");
      navigate("/dashboard/announcements");
    } catch (err) {
      toast.error(err?.data?.msg || err?.error);
    }
  }

  useEffect(() => {
    fetchannouncement();
  }, []);

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold">Edit Announcement</h1>
      <form className="mt-5 max-w-md">
        <FormElement
          type={"text"}
          name={"Title"}
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="form-row">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-textarea"
            id={"content"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex gap-2 justify-end text-lg">
          <Link
            to={"/dashboard/announcements"}
            className=" bg-gray-700 text-white px-2 py-1 rounded-sm hover:bg-gray-500"
          >
            Back
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

export default EditAnnouncement;
