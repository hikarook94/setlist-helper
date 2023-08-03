import React from 'react';
import PropTypes from 'prop-types';

const SetlistsViewer = ({ setlists }) => {
  const convertToHours = (milliSeconds) => {
    const minutes = Math.ceil(milliSeconds / 1000) / 60
    const hours = Math.trunc(minutes / 60)
    const remaining_minutes = Math.ceil(minutes % 60)
    return `${hours} 時間 ${remaining_minutes} 分`
  }

  const renderSetlists = (setlistArray) => {

    return setlistArray.map((setlist) => (
      <li key={setlist.id}>
        <div>{setlist.title}</div>
        {setlist.songs.length}{' 曲 '}
        {convertToHours(setlist.songs.reduce((accum, current) => accum + current.duration_time, 0))}
        {' / '}
        {convertToHours(setlist.target_duration_time)}
      </li>
    ));
  };

  return (
    <section>
      <ul>{renderSetlists(setlists)}</ul>
    </section>
  );
};

SetlistsViewer.propTypes = {
  setlists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    songs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }))
  })).isRequired,
};

export default SetlistsViewer;
