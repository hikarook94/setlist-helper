import React from "react";
import { Link } from "react-router-dom";
import { convertToHours } from "../helpers/helpers";

function ListedSetlist({ setlist }) {
  return (
    <>
      <div className="mb-1 px-4 py-2 border">
        <li>
          <Link to={`/setlists/${setlist.id}`}>
            <div className="text-lg">{setlist.title}</div>
            <div className="text-gray-400 text-sm">
              <span className="mr-2 ">{setlist.songs_count}曲</span>
              <span>{convertToHours(setlist.total_duration_time)}</span>
              <span className="mx-1">/</span>
              <span>{convertToHours(setlist.target_duration_time)}</span>
            </div>
          </Link>
        </li>
      </div>
    </>
  );
}

export default ListedSetlist;
