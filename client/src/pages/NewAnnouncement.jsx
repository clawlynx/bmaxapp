import React, { useState } from "react";
import FormElement from "../components/FormElement";
import { Link, useNavigate } from "react-router-dom";
import { useCreateAnnouncementMutation } from "../slices/adminApiSlice";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

function NewAnnouncement() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createAnnouncement, { isLoading }] = useCreateAnnouncementMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createAnnouncement({ title, content }).unwrap();
      toast.success("successfully added");
      navigate("/dashboard/announcements");
    } catch (err) {
      toast.error(err?.data?.msg || err?.error);
    }
  };

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold">Create Announcement</h1>
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

export default NewAnnouncement;
