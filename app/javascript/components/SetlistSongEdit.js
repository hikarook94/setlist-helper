import React, { useEffect } from "react";
import {
  handleAjaxError,
  convertToHours,
  convertToHour,
  convertToRemainingMinute,
  convertToMilliSeconds,
} from "../helpers/helpers";
import ListedSongEdit from "./ListedSongEdit";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setLocale } from "yup";
import * as ja from "yup-locale-ja";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useInputValue } from "./InputValueContext";

setLocale(ja.suggestive);

const schema = yup
  .object({
    setlistTitle: yup.string().required(),
    setlistHours: yup.number().min(0).required().integer(),
    setlistMinutes: yup.number().min(0).required().integer(),
  })
  .required();

const SetlistSongEdit = () => {
  const [inputValues, setInputValues] = useInputValue();
  const navigate = useNavigate();
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

  const setlistHoursWatch = watch("setlistHours", 0);
  const setlistMinutesWatch = watch("setlistMinutes", 0);

  useEffect(() => {
    const fetchSetlist = async () => {
      try {
        const response = await window.fetch(`/api/setlists/${id}/edit`);
        if (!response.ok) throw Error(response.statusText);
        const fetchedSetlist = await response.json();
        setInputValues(fetchedSetlist);
        setValue("setlistTitle", fetchedSetlist.title);
        setValue(
          "setlistHours",
          convertToHour(fetchedSetlist.target_duration_time),
        );
        setValue(
          "setlistMinutes",
          convertToRemainingMinute(fetchedSetlist.target_duration_time),
        );
      } catch (error) {
        handleAjaxError(error);
      }
    };

    if (inputValues.id === undefined) {
      fetchSetlist();
    } else {
      // /edit/repertoire から戻ってきたときに入力欄がリセットされるのでinputValuesから値をセットする
      setValue("setlistTitle", inputValues.title);
      setValue("setlistHours", convertToHour(inputValues.target_duration_time));
      setValue(
        "setlistMinutes",
        convertToRemainingMinute(inputValues.target_duration_time),
      );
    }
  }, []);

  const fetchRandomSongs = async () => {
    try {
      const songIds = inputValues.songs.map((song) => song.id);
      const response = await window.fetch("/api/songs/random", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_ids: songIds,
          total_duration_time: inputValues.total_duration_time,
          target_duration_time: inputValues.target_duration_time,
        }),
      });
      if (!response.ok) throw Error(response.statusText);
      const data = await response.json();
      setInputValues((prevState) => ({
        ...prevState,
        ...data,
      }));
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const onSubmit = async () => {
    try {
      const songIds = inputValues.songs.map((song) => song.id);
      const response = await window.fetch(`/api/setlists/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_ids: songIds,
          title: inputValues.title,
          total_duration_time: inputValues.total_duration_time,
          target_duration_time: inputValues.target_duration_time,
        }),
      });
      if (!response.ok) throw Error(response.statusText);
      const savedSetlist = await response.json();
      navigate(`/setlists/${savedSetlist.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const updateSetlistTitle = (e) => {
    setInputValues((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };
  const updateSetlistHours = (e) => {
    const inputHours = Number(e.target.value);
    setInputValues((prevState) => ({
      ...prevState,
      target_duration_time: convertToMilliSeconds(
        inputHours,
        setlistMinutesWatch,
      ),
    }));
  };
  const updateSetlistMinutes = (e) => {
    const inputMinutes = Number(e.target.value);
    setInputValues((prevState) => ({
      ...prevState,
      target_duration_time: convertToMilliSeconds(
        setlistHoursWatch,
        inputMinutes,
      ),
    }));
  };

  const handleSongDeleted = (song) => {
    setInputValues((prevState) => ({
      ...prevState,
      songs: prevState.songs.filter((i) => i.id !== song.id),
      total_duration_time: prevState.total_duration_time - song.duration_time,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-4">
        <div>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("setlistTitle", {
              onChange: (e) => updateSetlistTitle(e),
            })}
            type="text"
            name="setlistTitle"
          />
        </div>
        <div className="text-center mb-4">
          <span>{convertToHours(inputValues.total_duration_time)}</span>
          <span>/</span>
          <span>
            <input
              name="setlistHours"
              type="number"
              {...register("setlistHours", {
                onChange: (e) => updateSetlistHours(e),
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
                onChange: (e) => updateSetlistMinutes(e),
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
                  <Link to={`/setlists/${id}/edit/repertoire`}>
                    <div>曲を追加する</div>
                  </Link>
                </li>
              </div>
              {inputValues.songs.map((song) => (
                <ListedSongEdit
                  key={song.id}
                  song={song}
                  onSongDeleted={handleSongDeleted}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center">
          <div className="mb-8">
            <button
              type="button"
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

export default SetlistSongEdit;
