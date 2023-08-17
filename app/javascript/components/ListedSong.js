import React from "react";
import { convertToMinutes } from "../helpers/helpers";

function ListedSong(props) {
  return (
    <>
      <div className="mb-1 px-4 py-2 border">
        <li>
          <div className="text-lg">{props.value.name}</div>
          <div className="text-gray-400 text-sm">{props.value.artist}</div>
          <div className="text-gray-400 text-sm">
            {convertToMinutes(props.value.duration_time)}
          </div>
        </li>
      </div>
    </>
  );
}

export default ListedSong;
