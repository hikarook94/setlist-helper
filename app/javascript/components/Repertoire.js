import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInputValue } from "./InputValueContext";
import RepertoireSong from "./RepertoireSong";
import { convertToHours, handleAjaxError } from "../helpers/helpers";

const Repertoire = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useInputValue();
  const [selectedSongs, setSelectedSongs] = useState([]);

  const handleSongSelect = (song) => {
    if (selectedSongs.includes(song)) {
      setSelectedSongs((prevState) => prevState.filter((i) => i !== song));
    } else {
      setSelectedSongs((prevState) => [...prevState, song]);
    }
  };

  const songIds = inputValues.songs.map((song) => song.id);

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
    const durationIncrements = selectedSongs.reduce(
      (total, song) => song.duration_time + total,
      0,
    );
    const totalDurationTime =
      inputValues.total_duration_time + durationIncrements;
    setInputValues((prevState) => ({
      ...prevState,
      songs: [...inputValues.songs, ...selectedSongs],
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
                isSelected={() => songIds.includes(song.id)}
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
