import React, { useState } from 'react';
import {useInputValue, useUpdateInputValue} from './InputValueContext';
import ListedSong from './ListedSong';


const SetlistSongSelect = () => {
  const [ inputValues, setInputValues ] = useInputValue();
  console.log(inputValues, 'select');
  const [ selectedSongs, setSelectedSongs ] = useState({
    songs: []
  });
  const updateInputValue = useUpdateInputValue();
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
      setSelectedSongs(data);
      const fetched_song_ids = data.songs.map(song => song.id)
      updateInputValue('song_ids', fetched_song_ids)
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl text-center mb-4">セットリスト新規作成</h1>
        <p className="text-2xl text-center mb-4">
          {inputValues.setlistTitle}
        </p>
        <p className="text-center">
          {inputValues.setlistHours} 時間 {inputValues.setlistMinutes} 分
        </p>
        <div className="h-96">
          <div className="overflow-scroll h-full">
            <ul>
              {
                selectedSongs.songs.map((song, index) => (
                  <ListedSong key={index} value={song} />
                ))
              }
            </ul>
          </div>
          <div className="text-center">
            <button onClick={fetchRandomSongs} className="align-center mx-0 rounded-full bg-blue-500 w-48">
              曲をランダムに選ぶ
            </button>
            {/* <button onClick={} className="align-center mx-0 rounded-full bg-blue-500 w-48">
              保存する
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SetlistSongSelect;
