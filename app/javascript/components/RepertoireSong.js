import React, { useState } from 'react';
import { convertToMinutes } from '../helpers/helpers'
import { useInputValue } from './InputValueContext';

function RepertoireSong( props ) {
  const [ inputValues, setInputValues ] = useInputValue();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
      <div className="ml-12 mr-8 mb-1 px-4 py-2 border">
        <li>
          <div onClick={() => props.onSongSelected(props.value)}>+</div>
          <div>
            <div className="text-lg">{props.value.name}</div>
            <div className="text-gray-400 text-sm">{props.value.artist}</div>
            <div className="text-gray-400 text-sm">{convertToMinutes(props.value.duration_time)}</div>
          </div>
        </li>
      </div>
    </>
  )
}

export default RepertoireSong;
