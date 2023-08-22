import React from "react";
import { convertToMinutes } from "../helpers/helpers";

function RepertoireSong({ song, isSelected, onSongSelected }) {
  const handleClick = () => {
    onSongSelected(song);
  };

  return (
    <div className="flex">
      <div
        className="text-xl w-16 text-center flex justify-center items-center"
        onClick={handleClick}
      >
        {isSelected ? <span>✔️</span> : <span>+</span>}
      </div>
      <li className="mr-8 mb-1 px-4 py-2 border w-full">
        <div>
          <div className="text-lg">{song.name}</div>
          <div className="text-gray-400 text-sm">{song.artist}</div>
          <div className="text-gray-400 text-sm">
            {convertToMinutes(song.duration_time)}
          </div>
        </div>
      </li>
    </div>
  );
}

export default RepertoireSong;
