import React from 'react';
import { useLocation } from 'react-router-dom'

const SetlistSongSelect = () => {
  const location = useLocation();
  const inputValues = location.state.data
  console.log(location)

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
    </>
  );
};

export default SetlistSongSelect;
