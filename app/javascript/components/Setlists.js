import React, { useState, useEffect } from 'react';
import SetlistsViewer from './SetlistsViewer';

const Setlists = () => {
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
      <h1 className="text-4xl">セットリスト</h1>
      <SetlistsViewer setlists={setlists} />
    </>
  );
};

export default Setlists;
