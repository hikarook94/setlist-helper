import React, { useState } from 'react';
import {useInputValue, useUpdateInputValue} from './InputValueContext';
import ListedSong from './ListedSong';
import { handleAjaxError } from '../helpers/helpers'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { convertToHours } from '../helpers/helpers'


const SetlistSongSelect = () => {
  const [ inputValues, setInputValues ] = useInputValue();
  const updateInputValue = useUpdateInputValue();
  const navigate = useNavigate();

  const fetchRandomSongs = async () => {
    try {
      const song_ids = inputValues.songs.map(song => song.id)
      const response = await window.fetch('/api/songs/random', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          song_ids: song_ids,
          total_duration_time: inputValues.total_duration_time,
          target_duration_time: inputValues.target_duration_time
        })
      });
      if (!response.ok) throw Error(response.statusText);
      const data = await response.json();
      const fetched_song_ids = data.songs.map(song => song.id)
      data.song_ids = fetched_song_ids
      updateInputValue(data)
    } catch (error) {
      handleAjaxError(error)
    }
  }

  const saveSetlist = async () => {
    try {
      const song_ids = inputValues.songs.map(song => song.id)
      const response = await window.fetch('/api/setlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          song_ids: song_ids,
          title: inputValues.setlist_title,
          total_duration_time: inputValues.total_duration_time,
          target_duration_time: inputValues.target_duration_time
        })
      });
      if (!response.ok) throw Error(response.statusText);
      const savedSetlist = await response.json();
      navigate(`/setlists/${savedSetlist.id}`)
    } catch (error) {
      handleAjaxError(error)
    }
  }

  return (
    <>
      <p className="text-2xl text-center mb-4">
        {inputValues.setlistTitle}
      </p>
      <div className="text-center mb-4">
        <span>
        {convertToHours(inputValues.total_duration_time)}
        </span>
        <span>/</span>
        <span>
          {convertToHours(inputValues.target_duration_time)}
        </span>
      </div>
      <div className="relative h-96 overflow-y-auto mx-4 mb-8">
        <div className="h-full">
          <ul>
            <div className="mb-1 px-4 py-2 border">
              <li>
                <Link to="/setlists/new/songs/repertoire">
                  <div>曲を追加する</div>
                </Link>
              </li>
            </div>
            {
              inputValues.songs.map((song, index) => (
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
