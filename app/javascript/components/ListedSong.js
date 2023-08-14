import React from 'react';

function ListedSong(props) {
    const convertToMinutes = (milliSeconds) => {
      const minutes = Math.floor(milliSeconds / 60000)
      const seconds = ((milliSeconds % 60000) / 1000).toFixed(0)
      return `${minutes} 分 ${seconds} 秒`
    }

  return (
    <>
      <div className="mb-1 px-4 py-2 border">
        <li>
          <div className="text-lg">{props.value.name}</div>
          <div className="text-gray-400 text-sm">{props.value.artist}</div>
          <div className="text-gray-400 text-sm">{convertToMinutes(props.value.duration_time)}</div>
        </li>
      </div>
    </>
  )
}

export default ListedSong;
