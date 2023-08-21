import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInputValue } from "./InputValueContext";
import RepertoireSong from "./RepertoireSong";
import { convertToHours, handleAjaxError } from "../helpers/helpers";

const Repertoire = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useInputValue();
  const [selectedSongs, setSelectedSongs] = useState(inputValues.songs);

  const handleSongSelect = (song) => {
    if (isSelected(song)) {
      setSelectedSongs((prevState) =>
        prevState.filter((i) => i.id !== song.id),
      );
    } else {
      setSelectedSongs((prevState) => [...prevState, song]);
    }
  };

  const isSelected = (song) => {
    return selectedSongs.some((selectedSong) => selectedSong.id === song.id);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await window.fetch("/api/songs");
        if (!response.ok) throw Error(response.statusText);
        const fetchedSongs = await response.json();
        setSongs(fetchedSongs);
      } catch (error) {
        handleAjaxError(error);
      }
    };

    fetchSongs();
  }, []);

  const addSongs = () => {
    const totalDurationTime = selectedSongs.reduce(
      (total, song) => song.duration_time + total,
      0,
    );
    setInputValues((prevState) => ({
      ...prevState,
      songs: selectedSongs,
      total_duration_time: totalDurationTime,
    }));
    navigate("/setlists/new/songs");
  };

  return (
    <>
      <p className="text-2xl text-center mb-4">{inputValues.setlist_title}</p>
      <div className="text-center mb-4">
        <span>{convertToHours(inputValues.total_duration_time)}</span>
        <span>/</span>
        <span>{convertToHours(inputValues.target_duration_time)}</span>
      </div>
      <div className="relative h-96 overflow-y-auto mb-8">
        <div className="">
          <ul>
            {songs.map((song) => (
              <RepertoireSong
                key={song.id}
                value={song}
                isSelected={isSelected(song)}
                onSongSelected={handleSongSelect}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center">
        <div>
          <button
            onClick={addSongs}
            className="align-center mx-0 rounded-full bg-blue-500 w-[80%] h-12"
          >
            選択した曲をセットリストに追加する
          </button>
        </div>
      </div>
    </>
  );
};

export default Repertoire;
