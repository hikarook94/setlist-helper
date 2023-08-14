import React, { useState } from 'react';
import {useInputValue, useUpdateInputValue} from './InputValueContext';
import ListedSong from './ListedSong';


const SetlistSongSelect = () => {
  const [ inputValues, setInputValues ] = useInputValue();
  const updateInputValue = useUpdateInputValue();
  const [ selectedSongs, setSelectedSongs ] = useState({
    total_hours: 0,
    total_minutes: 0,
    songs: []
  });

  const fetchRandomSongs = async () => {
    try {
      const response = await window.fetch('/api/songs/random', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValues)
      });
      if (!response.ok) throw Error(response.statusText);
      const data = await response.json();
      const fetched_song_ids = data.songs.map(song => song.id)
      setSelectedSongs(data);
      updateInputValue('song_ids', fetched_song_ids)
      updateInputValue('total_duration_time', data.total_duration_time)
    } catch (error) {
      console.error(error);
    }
  }

  const saveSetlist = async () => {
    try {
      const response = await window.fetch('/api/setlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValues)
      });
      if (!response.ok) throw Error(response.statusText);
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
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
      <div className="relative h-96 overflow-y-auto mx-4 mb-8">
        <div className="h-full">
          <ul>
            {
              selectedSongs.songs.map((song, index) => (
                <ListedSong key={index} value={song} />
              ))
            }
          </ul>
        </div>
      </div>
      <div className="text-center">
        <div className="mb-8">
          <button onClick={fetchRandomSongs} className="align-center mx-0 rounded-full bg-blue-500 w-64 h-12">
            曲をランダムに選ぶ
          </button>
        </div>
        <div>
          <button onClick={saveSetlist} className="align-center mx-0 rounded-full bg-blue-500 w-64 h-12">
            このセットリストを保存する
          </button>
        </div>
      </div>
    </>
  );
};

export default SetlistSongSelect;
