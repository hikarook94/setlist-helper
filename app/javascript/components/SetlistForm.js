import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {setLocale} from "yup"
import * as ja from "yup-locale-ja";
import {useInputValue} from './InputValueContext';

setLocale(ja.suggestive);

const schema = yup
  .object({
    setlistTitle: yup.string().required(),
    setlistHours: yup.number().min(0).required().integer(),
    setlistMinutes: yup.number().min(0).required().integer()
  })
  .required()


const SetlistForm = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useInputValue();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = (data) => {
    setInputValues(data);
    navigate('./songs')
  }

  return (
    <>
    <div className="p-4">
      <h1 className="text-2xl text-center mb-8">セットリスト新規作成</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <label htmlFor="setlistTitle" className="mb-1">セットリスト名</label>
          <div>
            <input
              id="setlistTitle"
              {...register('setlistTitle')}
              className="border-0 ring-1 ring-inset rounded-md ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="text-red-700" >
            {errors.setlistTitle?.message}
        </div>
        </div>
        <div className="mb-8">
          <p className="mb-1">何時間分のセットリストを作成しますか？</p>
          <input
            id="setlistHours"
            type="number"
            {...register('setlistHours')}
            className="mr-2 w-12 border-0 ring-1 ring-inset rounded-md ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <label htmlFor="setlistHours" className="mr-4">時間</label>

          <input
            id="setlistMinutes"
            type="number"
            {...register('setlistMinutes')}
            className="mr-2 w-12 border-0 ring-1 ring-inset rounded-md ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <label htmlFor="setlistMinutes">分</label>

          <div className="text-red-700" >
            {errors.setlistHours?.message}
          </div>
          <div className="text-red-700" >
            <p>{errors.setlistMinutes?.message}</p>
          </div>
        </div>
        <div className="text-center">
          <input type="submit"value="次へ" className="align-center mx-0 rounded-full bg-blue-500 w-48" />
        </div>
      </form>
    </div>
    </>
  )
}
export default SetlistForm
