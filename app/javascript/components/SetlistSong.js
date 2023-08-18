import React from 'react';
import { convertToMinutes } from '../helpers/helpers'

function SetlistSong(props) {
  return (
    <>
      <div className="flex">
        <div className="text-xl w-16 text-center flex justify-center items-center">
          {props.index + 1}
        </div>
        <li className="mr-8 mb-1 px-4 py-2 border w-full">
          <div className="text-lg">{props.value.name}</div>
          <div className="text-gray-400 text-sm">{props.value.artist}</div>
          <div className="text-gray-400 text-sm">{convertToMinutes(props.value.duration_time)}</div>
        </li>
      </div>
    </>
  )
}

export default SetlistSong;
