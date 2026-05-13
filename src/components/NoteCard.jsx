import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <div className="group border border-slate-200 rounded-xl p-5 bg-white hover:shadow-md hover:border-primary/20 transition-all ease-in-out cursor-pointer relative">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h6 className="text-base font-semibold text-slate-800 line-clamp-1">{title}</h6>
          <span className="text-[11px] font-medium text-slate-400">
            {moment(date).format("MMM Do YYYY")}
          </span>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); onPinNote(); }}
          className={`p-2 rounded-full transition-colors ${isPinned ? 'text-primary bg-blue-50' : 'text-slate-300 hover:text-slate-400'}`}
        >
          <MdOutlinePushPin className="text-xl" />
        </button>
      </div>

      <p className="text-sm text-slate-600 mt-3 leading-relaxed">
        {content}
      </p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, i) => (
            <span key={i} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-medium capitalize">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <MdCreate
            className="text-lg text-slate-400 hover:text-green-500 transition-colors p-1 sm:p-0"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
          />
          <MdDelete
            className="text-lg text-slate-400 hover:text-red-500 transition-colors p-1 sm:p-0"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;