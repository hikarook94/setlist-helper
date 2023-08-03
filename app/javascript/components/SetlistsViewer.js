import React from 'react';
import PropTypes from 'prop-types';

const SetlistsViewer = ({ setlists }) => {
  const renderSetlists = (setlistArray) => {

    return setlistArray.map((setlist) => (
      <li key={setlist.id}>
        {setlist.title}
      </li>
    ));
  };

  return (
    <section>
      <ul>{renderSetlists(setlists)}</ul>
    </section>
  );
};

SetlistsViewer.propTypes = {
  setlists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
};

export default SetlistsViewer;
