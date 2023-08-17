import React, { useState } from "react";
import { convertToMinutes } from "../helpers/helpers";
import { useInputValue } from "./InputValueContext";

function RepertoireSong(props) {
  const [inputValues, setInputValues] = useInputValue();
  const [isSelected, setIsSelected] = useState(props.isSelected);

  const handleClick = () => {
    setIsSelected(!isSelected);
    props.onSongSelected(props.value);
  };

  return (
    <div className="flex">
      <div
        className="text-xl w-16 text-center flex justify-center items-center"
        onClick={handleClick}
      >
        {!isSelected && <span>+</span>}
        {isSelected && <span>✔️</span>}
      </div>
      <li className="mr-8 mb-1 px-4 py-2 border w-full">
        <div>
          <div className="text-lg">{props.value.name}</div>
          <div className="text-gray-400 text-sm">{props.value.artist}</div>
          <div className="text-gray-400 text-sm">
            {convertToMinutes(props.value.duration_time)}
          </div>
        </div>
      </li>
    </div>
  );
}

export default RepertoireSong;
