import React from 'react';
import { Link } from 'react-router-dom'

function ListedSetlist(props) {
  const convertToHours = (milliSeconds) => {
    const minutes = Math.ceil(milliSeconds / 1000) / 60
    const hours = Math.trunc(minutes / 60)
    const remainingMinutes = Math.ceil(minutes % 60)
    return `${hours} 時間 ${remainingMinutes} 分`
  }

  return (
    <>
      <div className="mb-1 px-4 py-2 border">
        <li>
          <Link to={`/setlists/${props.value.id}`}>
            <div className="text-lg">{props.value.title}</div>
            <div className="text-gray-400 text-sm">
              <span className="mr-2 ">{props.value.songs_count}曲</span>
              <span>{convertToHours(props.value.total_duration_time)}</span>
              <span className="mx-1">/</span>
              <span>{convertToHours(props.value.target_duration_time)}</span>
            </div>
          </Link>
        </li>
      </div>
    </>
  )
}

export default ListedSetlist;
