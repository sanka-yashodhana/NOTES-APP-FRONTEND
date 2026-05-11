import React, { useState } from "react";
import TagInput from "../components/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";
import { toast } from 'react-toastify';

const AddEditNotes = ({ noteData, type, onClose, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title, content, tags,
      });

      if (response.data && response.data.note) {
        toast.success("Note added successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title, content, tags,
      });

      if (response.data && response.data.note) {
        toast.success("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative pt-4">
      
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-2 -right-2 transition-all hover:bg-slate-100"
        onClick={onClose}
      >
        <MdClose className="text-2xl text-slate-400" />
      </button>

      
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Title</label>
        <input
          type="text"
          className="text-xl sm:text-2xl text-slate-950 outline-none font-medium placeholder-slate-300"
          placeholder="Wake up at 6:00 AM"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      
      <div className="flex flex-col gap-2 mt-6">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Content</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-3 rounded-lg leading-6 placeholder-slate-300"
          placeholder="Detail your note here..."
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      
      <div className="mt-6">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Tags</label>
        <div className="mt-2">
          <TagInput tags={tags} setTags={setTags} />
        </div>
      </div>

      
      {error && (
        <p className="text-red-500 text-xs font-medium mt-4 animate-pulse">
          {error}
        </p>
      )}

      
      <button
        className="w-full btn-primary font-semibold mt-6 p-3 rounded-xl shadow-md hover:shadow-lg transition-all"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE NOTE" : "ADD NOTE"}
      </button>
    </div>
  );
};

export default AddEditNotes;