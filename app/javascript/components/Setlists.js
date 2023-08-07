import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const setlists = () => {
  const convertToHours = (milliSeconds) => {
    const minutes = Math.ceil(milliSeconds / 1000) / 60
    const hours = Math.trunc(minutes / 60)
    const remainingMinutes = Math.ceil(minutes % 60)
    return `${hours} 時間 ${remainingMinutes} 分`
  }

    const [setlists, setSetlists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await window.fetch('/api/setlists');
          if (!response.ok) throw Error(response.statusText);
          const data = await response.json();
          setSetlists(data);
        } catch (error) {
          setIsError(true);
          console.error(error);
        }

        setIsLoading(false);
      };

      fetchData();
    }, []);

    return (
      <>
        <h1 className="text-2xl text-center">セットリスト</h1>
        <Link to="/setlists/new"><button>新規作成</button></Link>
        <ul>
          {setlists.map((setlist) => (
            <li key={setlist.id}>
              <Link to={`/setlists/${setlist.id}`}>
                <div>{setlist.title}</div>
                <span className="mr-2">{setlist.songs_count}曲</span>
                <span>{convertToHours(setlist.total_duration_time)}</span>
                <span className="mx-1">/</span>
                <span>{convertToHours(setlist.target_duration_time)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </>
    )
};

export default setlists;
