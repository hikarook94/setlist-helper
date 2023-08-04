import React from 'react';
import { Link } from 'react-router-dom'

const SetlistsViewer = ({ setlists }) => {
  const convertToHours = (milliSeconds) => {
    const minutes = Math.ceil(milliSeconds / 1000) / 60
    const hours = Math.trunc(minutes / 60)
    const remainingMinutes = Math.ceil(minutes % 60)
    return `${hours} 時間 ${remainingMinutes} 分`
  }

  const renderSetlists = (setlistArray) => {

    return setlistArray.map((setlist) => (
      <li key={setlist.id}>
        <Link to={`/setlists/${setlist.id}`}>
          <div>{setlist.title}</div>
          {setlist.songs.length}{' 曲 '}
          {convertToHours(setlist.songs.reduce((accum, current) => accum + current.duration_time, 0))}
          {' / '}
          {convertToHours(setlist.target_duration_time)}
        </Link>
      </li>
    ));
  };

  return (
    <section>
      <ul>{renderSetlists(setlists)}</ul>
    </section>
  );
};

};

export default SetlistsViewer;
