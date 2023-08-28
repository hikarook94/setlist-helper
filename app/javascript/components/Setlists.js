import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListedSetlist from "./ListedSetlist";

const Setlists = () => {
  const [setlists, setSetlists] = useState([]);

  useEffect(() => {
    const fetchSetlists = async () => {
      try {
        const response = await window.fetch("/api/setlists");
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setSetlists(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSetlists();
  }, []);

  return (
    <div className="">
      <h1 className="text-2xl text-center mb-4 pt-4">セットリスト</h1>
      <div className="p-4">
        <div className="mb-1 px-4 py-2 border">
          <Link to="/setlists/new">
            <div>新規作成</div>
          </Link>
        </div>
        <div className="relative max-h-[600px] overflow-y-auto">
          <div className="h-full">
            <ul>
              {setlists.map((setlist) => (
                <ListedSetlist key={setlist.id} setlist={setlist} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setlists;
