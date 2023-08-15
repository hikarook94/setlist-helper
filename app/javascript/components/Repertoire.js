import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useInputValue, useUpdateInputValue} from './InputValueContext';
import ListedSong from './ListedSong';

const Repertoire = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [ inputValues, setInputValues ] = useInputValue();
  const updateInputValue = useUpdateInputValue();
  console.log(inputValues);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await window.fetch('/api/songs');
        if (!response.ok) throw Error(response.statusText);
        const songs = await response.json();
        setSongs(songs)
      } catch (error) {
        setIsError(true);
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchSongs();
  }, []);

  const addSongs = () => {

  }

  return (
    <>
      <p className="text-2xl text-center mb-4">
        {inputValues.setlistTitle}
      </p>
      <div className="text-center mb-4">
        <span>
          {selectedSongs.total_hours} 時間 {selectedSongs.total_minutes} 分
        </span>
        <span>/</span>
        <span>
          {inputValues.setlistHours} 時間 {inputValues.setlistMinutes} 分
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
                <ListedSong key={index} value={song} />
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
