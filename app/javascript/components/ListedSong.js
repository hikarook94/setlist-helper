import React from 'react';

function ListedSong(props) {
  return (
    <li>
      <div>{props.value.name}</div>
      <div>{props.value.artist}</div>
      <div>{props.value.duration_time}</div>
    </li>
  )
}

export default ListedSong;
