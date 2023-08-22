import React, { useEffect, useState } from "react";
import { convertToHours, handleAjaxError } from "../helpers/helpers";
import SetlistSong from "./SetlistSong";
import { Link, useParams } from "react-router-dom";

const Setlist = () => {
  const [setlist, setSetlist] = useState({
    title: '',
    songs: [],
    total_duration_time: 0,
    target_duration_time: 0,
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchSetlist = async () => {
      try {
        const response = await window.fetch(`/api/setlists/${id}`);
        if (!response.ok) throw Error(response.statusText);
        const fetchedSetlist = await response.json();
        setSetlist(fetchedSetlist);
      } catch (error) {
        handleAjaxError(error);
      }
    };

    fetchSetlist();
  }, []);

  return (
    <>
      <div className="h-screen">
        <div className="flex relative justify-center items-center pt-6 mb-2 mx-4">
          <Link to="/setlists">
            <div className="w-16 absolute vertical-center top-6 left-1">＜</div>
          </Link>
          <Link to={`/setlists/${id}/edit`}>
            <div className="w-16 absolute vertical-center top-6 right-1">編集</div>
          </Link>
          <h1 className="text-2xl">{setlist.title}</h1>
        </div>
        <div className="text-center mb-4">
          <div className="mb-2">{setlist.songs_count}曲</div>
          <span>{convertToHours(setlist.total_duration_time)}</span>
          <span>/</span>
          <span>{convertToHours(setlist.target_duration_time)}</span>
        </div>
        <div className="relative h-4/5 overflow-y-auto mx-4 mb-8">
          <div className="h-full">
            <ul>
              {setlist.songs.map((song, index) => (
                <SetlistSong key={song.id} song={song} index={index} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setlist;
