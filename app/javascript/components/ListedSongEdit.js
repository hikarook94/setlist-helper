import React from "react";
import { convertToMinutes } from "../helpers/helpers";

function ListedSongEdit({ song, onSongDeleted }) {
  const handleDelete = () => {
    onSongDeleted(song);
  };
  return (
    <div className="relative w-full">
      <div className="mb-1 px-4 py-2 border w-full">
        <li>
          <div className="text-lg">{song.name}</div>
          <div className="text-gray-400 text-sm">{song.artist}</div>
          <div className="text-gray-400 text-sm">
            {convertToMinutes(song.duration_time)}
          </div>
        </li>
      </div>
      <div className="text-gray-400 absolute top-0 right-2" onClick={handleDelete}>
        ×
      </div>
    </div>
  );
}

export default ListedSongEdit;
