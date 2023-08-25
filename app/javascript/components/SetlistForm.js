import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setLocale } from "yup";
import * as ja from "yup-locale-ja";
import { useInputValue } from "./InputValueContext";
import { convertToMilliSeconds } from "../helpers/helpers";

setLocale(ja.suggestive);

const schema = yup
  .object({
    setlistTitle: yup.string().required(),
    setlistHours: yup.number().min(0).required().integer(),
    setlistMinutes: yup.number().min(0).required().integer(),
  })
  .required();

const SetlistForm = () => {
  const navigate = useNavigate();
  const [, setInputValues] = useInputValue();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    const setlistTargetDurationTime = convertToMilliSeconds(
      data.setlistHours,
      data.setlistMinutes,
    );
    setInputValues((prevState) => ({
      ...prevState,
      title: data.setlistTitle,
      target_duration_time: setlistTargetDurationTime,
    }));
    navigate("./songs");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-4">
        <div className="mb-8">
          <p className="mb-2">セットリスト名</p>
          <div>
            <input
              id="setlistTitle"
              {...register("setlistTitle")}
              className="mr-2 w-full pl-2 border h-8"
            />
          </div>
          <div className="text-red-700">{errors.setlistTitle?.message}</div>
        </div>
        <div className="mb-8">
          <p className="mb-2">何時間分のセットリストを作成しますか？</p>
          <input
            id="setlistHours"
            type="number"
            {...register("setlistHours")}
            className="mr-2 w-16 border h-8"
          />
          <label htmlFor="setlistHours" className="mr-4">
            時間
          </label>

          <input
            id="setlistMinutes"
            type="number"
            {...register("setlistMinutes")}
            className="mr-2 w-16 border h-8"
          />
          <label htmlFor="setlistMinutes">分</label>

          <div className="text-red-700">{errors.setlistHours?.message}</div>
          <div className="text-red-700">
            <p>{errors.setlistMinutes?.message}</p>
          </div>
        </div>
        <div className="text-center">
          <input
            type="submit"
            value="次へ"
            className="align-center mx-0 rounded-full bg-blue-500 w-48 h-8"
          />
        </div>
      </form>
    </>
  );
};
export default SetlistForm;
