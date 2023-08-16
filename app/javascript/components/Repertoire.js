import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import {useInputValue, useUpdateInputValue} from './InputValueContext';
import RepertoireSong from './RepertoireSong';

const Repertoire = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const [ inputValues, setInputValues ] = useInputValue();
  const updateInputValue = useUpdateInputValue();
  const [ selectedSongs, setSelectedSongs ] = useState([]);

  const handleSongSelect = (song) => {
    setSelectedSongs(prevState => [...prevState, song])
  }

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await window.fetch('/api/songs');
        if (!response.ok) throw Error(response.statusText);
        const fetchedSongs = await response.json();
        setSongs(fetchedSongs)
      } catch (error) {
        setIsError(true);
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchSongs();
  }, []);

  const addSongs = () => {
    const totalDurationTime = selectedSongs.reduce((total, song) => song.duration_time + total, 0)
    updateInputValue({
      songs: [...inputValues.songs, ...selectedSongs],
      total_duration_time: totalDurationTime,
    })
    navigate('/setlists/new/songs')
  }

  return (
    <>
      <p className="text-2xl text-center mb-4">
        {inputValues.setlistTitle}
      </p>
      <div className="text-center mb-4">
        <span>
          {convertToHours(inputValues.total_duration_time)}
        </span>
        <span>/</span>
        <span>
          {convertToHours(inputValues.target_duration_time)}
        </span>
      </div>
      <div>
        レパートリー
      </div>
      <div className="relative h-96 overflow-y-auto">
        <div className="">
          <ul>
            {
              songs.map((song, index) => (
                <RepertoireSong key={index} value={song} onSongSelected={handleSongSelect} />
              ))
            }
          </ul>
        </div>
      </div>
      <div className="text-center">
        <div>
          <button onClick={addSongs} className="align-center mx-0 rounded-full bg-blue-500 w-64 h-12">
            選択した曲をセットリストに追加する
          </button>
        </div>
      </div>
    </>
  );
};

export default Repertoire;
