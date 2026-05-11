import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
import EmptyCard from "../components/EmptyCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emptyicon from "../assets/emptyicon.png";
import searchicon from "../assets/searchicon.png";

const Home = () => {
  const [openAddEditNote, setOpenAddEditNote] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);

  const [allNotes, setAllNotes] = useState([]);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditNote({
      isShown: true,
      data: noteDetails,
      type: "edit",
    });
  };

  //Get User info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Error fetching notes: ", error);
    }
  };

  //Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        getAllNotes();
        toast.success("Note deleted successfully!");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        console.log(
          "An unexpected error occurred: ",
          error.response.data.message,
        );
        toast.error("Failed to delete note: " + error.response.data.message);
      }
    }
  };

  // Search Notes
  const onSearchNotes = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Error searching notes: ", error);
    }
  };

  //Update Pin
  const updateIsPinned = async(noteData)=>{
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put(
        "/update-note-pin/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );

      if(response.data && response.data.note){
        getAllNotes();
      }
    } catch (error) {
      console.log(error)
    }
  }
    

    


  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);

  return (
    <div className="min-vh-100 bg-slate-50/50"> 
      <Navbar
        userInfo={userInfo}
        onSearchNotes={onSearchNotes}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto px-4 sm:px-6"> 
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 pb-24">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20">
             <EmptyCard
                imgSrc={isSearch ? searchicon : emptyicon}
                message={isSearch ? `Oops! No notes found matching your search.` : `Start creating your first note!`}
             />
          </div>
        )}
      </div>

      
      <button
        className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 shadow-lg hover:shadow-primary/30 transition-all fixed right-6 bottom-6 sm:right-10 sm:bottom-10 z-50"
        onClick={() => {
          setOpenAddEditNote({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-3xl sm:text-4xl text-white" />
      </button>

      
      <Modal
        isOpen={openAddEditNote.isShown}
        ariaHideApp={false}
        onRequestClose={() => {
          setOpenAddEditNote({ isShown: false, type: "add", data: null });
        }}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1000 },
        }}
        className="w-[90%] md:w-[60%] lg:w-[40%] max-h-[80vh] bg-white rounded-xl mx-auto mt-20 p-6 overflow-y-auto shadow-2xl outline-none"
      >
        <AddEditNotes
          type={openAddEditNote.type}
          noteData={openAddEditNote.data}
          onClose={() => {
            setOpenAddEditNote({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>

      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

export default Home;
