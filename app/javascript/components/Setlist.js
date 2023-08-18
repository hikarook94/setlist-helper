import React from "react";
import { convertToHours } from '../helpers/helpers'
import SetlistSong from './SetlistSong';
import { Link } from 'react-router-dom'

const Setlist = () => {
  const [setlist, setSetlist] = useState({
    songs: []
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchSetlist = async () => {
      try {
        const response = await window.fetch(`/api/setlists/${id}`);
        if (!response.ok) throw Error(response.statusText);
        const fetchedSetlist = await response.json();
        console.log(fetchedSetlist.songs);
        setSetlist(fetchedSetlist);
      } catch (error) {
        handleAjaxError(error);
      }
    };

    fetchSetlist();
  }, []);

  return (
    <>
      <p className="text-2xl text-center mb-4">
        {setlist.title}
      </p>
      <div className="text-center mb-4">
        <div>
          {setlist.songs_count}曲
        </div>
        <span>
          {convertToHours(setlist.total_duration_time)}
        </span>
        <span>/</span>
        <span>
          {convertToHours(setlist.target_duration_time)}
        </span>
      </div>
      <div className="relative h-4/5 overflow-y-auto mx-4 mb-8">
        <div className="h-full">
          <ul>
            {
              setlist.songs.map((song) => (
                <ListedSong key={song.id} value={song} />
              ))
            }
          </ul>
        </div>
      </div>
    </>
  );
};

export default Setlist;
