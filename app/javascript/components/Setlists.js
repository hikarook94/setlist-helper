import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import SetlistsViewer from './SetlistsViewer';
import SetlistViewer from './SetlistViewer';

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
      <Routes>
        <Route path="" element={<SetlistsViewer setlists={setlists} />} />
        <Route path="/:id" element={<SetlistViewer setlists={setlists} />} />
      </Routes>
    </>
  );
};

export default Setlists;
