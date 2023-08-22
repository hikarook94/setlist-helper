import React, { useEffect, useState } from "react";
import { handleAjaxError, convertToHours, convertToHour, convertToRemainingMinute, convertToMilliSeconds } from "../helpers/helpers";
import ListedSong from "./ListedSong";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setLocale } from "yup";
import * as ja from "yup-locale-ja";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

setLocale(ja.suggestive);

const schema = yup
  .object({
    setlistTitle: yup.string().required(),
    setlistHours: yup.number().min(0).required().integer(),
    setlistMinutes: yup.number().min(0).required().integer(),
  })
  .required();

const SetlistEdit = () => {
  const navigate = useNavigate();
  const [setlist, setSetlist] = useState({
    title: '',
    songs: [],
    target_duration_time: 0,
    total_duration_time: 0,
  });
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const setlistHoursWatch = watch('setlistHours', 0)
  const setlistMinutesWatch = watch('setlistMinutes', 0)


  useEffect(() => {
    const fetchSetlist = async () => {
      try {
        const response = await window.fetch(`/api/setlists/${id}/edit`);
        if (!response.ok) throw Error(response.statusText);
        const fetchedSetlist = await response.json();
        setSetlist(fetchedSetlist);
        // inputに現在のセットリスト情報をセット
        setValue('setlistTitle', fetchedSetlist.title)
        setValue('setlistHours', convertToHour(fetchedSetlist.target_duration_time))
        setValue('setlistMinutes', convertToRemainingMinute(fetchedSetlist.target_duration_time))
        // console.log('useEffect');
      } catch (error) {
        handleAjaxError(error);
      }
    };

    fetchSetlist();
  }, []);

  const fetchRandomSongs = async () => {
    try {
      const songIds = setlist.songs.map((song) => song.id);
      const response = await window.fetch("/api/songs/random", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_ids: songIds,
          total_duration_time: setlist.total_duration_time,
          target_duration_time: setlist.target_duration_time,
        }),
      });
      if (!response.ok) throw Error(response.statusText);
      const data = await response.json();
      setSetlist((prevState) => ({
        ...prevState,
        ...data,
      }));
    } catch (error) {
      handleAjaxError(error);
    }
  };

    const onSubmit = async () => {
      try {
        console.log(setlist);
        const songIds = setlist.songs.map((song) => song.id);
        const response = await window.fetch(`/api/setlists/${id}`, {
          method: "PUT",
          headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            song_ids: songIds,
            title: setlist.title,
            total_duration_time: setlist.total_duration_time,
            target_duration_time: setlist.target_duration_time,
          }),
        });
        if (!response.ok) throw Error(response.statusText);
        const savedSetlist = await response.json();
        navigate(`/setlists/${savedSetlist.id}`);
      } catch (error) {
        handleAjaxError(error);
      }
    };

  // const onSubmit = (data) => {
  //     updateSetlist();
  // }

  const updateSetlistTitle = (e) => {
    setSetlist((prevState) => ({
      ...prevState,
      title: e.target.value,
    }))
  }
  const updateSetlistHours = (e) => {
    setSetlist((prevState) => ({
      ...prevState,
      target_duration_time: convertToMilliSeconds(e.target.value, setlistMinutesWatch)
    }))
  }
  const updateSetlistMinutes = (e) => {
    setSetlist((prevState) => ({
      ...prevState,
      target_duration_time: convertToMilliSeconds(setlistHoursWatch, e.target.value)
    }))
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-4">
        <div >
          <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register('setlistTitle', {
              onChange: (e) => updateSetlistTitle(e)
            })}
            type="text"
            name="setlistTitle"
          />
        </div>
        <div className="text-center mb-4">
          <span>{convertToHours(setlist.total_duration_time)}</span>
          <span>/</span>
          <span>
            <input
              name="setlistHours"
              type="number"
              {...register("setlistHours", {
                onChange: (e) => updateSetlistHours(e)
              })}
              className="mr-2 w-16 border h-8"
            />
            <label htmlFor="setlistHours" className="mr-4">
              時間
            </label>
            <input
              name="setlistMinutes"
              type="number"
              {...register("setlistMinutes", {
                onChange: (e) => updateSetlistMinutes(e)
              })}
              className="mr-2 w-16 border h-8"
             />
            <label htmlFor="setlistMinutes">分</label>
          </span>
        </div>
        <div className="relative h-4/5 overflow-y-auto mx-4 mb-8">
          <div className="h-full">
            <ul>
              <div className="mb-1 px-4 py-2 border">
                <li>
                  <Link to="/setlists/">
                    <div>曲を追加する</div>
                  </Link>
                </li>
              </div>
              {/* {setlist.songs.map((song) => (
                <ListedSong key={song.id} song={song} />
              ))} */}
            </ul>
          </div>
        </div>
        <div className="text-center">
          <div className="mb-8">
            <button
              onClick={fetchRandomSongs}
              className="align-center mx-0 rounded-full bg-blue-500 w-64 h-12"
            >
              曲をランダムに選ぶ
            </button>
          </div>
          <div>
            <input
              type="submit"
              value="保存する"
              className="align-center mx-0 rounded-full bg-blue-500 w-64 h-12"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SetlistEdit;