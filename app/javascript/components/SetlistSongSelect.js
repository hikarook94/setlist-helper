import React from 'react';
import { useLocation } from 'react-router-dom'

const SetlistSongSelect = () => {
  const location = useLocation();
  const inputValues = location.state.data
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
      console.log(response)
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl text-center mb-8">セットリスト新規作成</h1>
        <p>曲選択画面</p>
        <p>
          {inputValues.setlistTitle}
        </p>
        <p>
          {inputValues.setlistHours} 時間
        </p>
        <p>
          {inputValues.setlistMinutes} 分
        </p>
      </div>
      <div className="text-center">
        <button onClick={fetchRandomSongs} className="align-center mx-0 rounded-full bg-blue-500 w-48">
          曲をランダムに選ぶ
        </button>
      </div>
    </>
  );
};

export default SetlistSongSelect;
