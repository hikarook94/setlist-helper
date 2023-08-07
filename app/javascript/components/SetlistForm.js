import React from 'react';

const SetlistForm = ({onNext}) => {
  return (
    <>
      <div className="mb-8">
        <label htmlFor="setlistTitle" className="mb-1">セットリスト名</label>
        <div>
          <input
            name="setlistTitle"
            className="border-0 ring-1 ring-inset rounded-md ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="mb-8">
        <p className="mb-1">何時間分のセットリストを作成しますか？</p>
        <input
          id="setlistHours"
          name="setlistHours"
          className="mr-2 w-12 border-0 ring-1 ring-inset rounded-md ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <label htmlFor="setlistHours" className="mr-4">時間</label>
        <input
          id="setlistMinutes"
          name="setlistMinutes"
          className="mr-2 w-12 border-0 ring-1 ring-inset rounded-md ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <label htmlFor="setlistMinutes">分</label>
      </div>
      <div className="text-center">
        <button onClick={onNext} className="align-center mx-0 rounded-full bg-blue-500 w-48">次へ</button>
      </div>
    </>
  )
}
export default SetlistForm
