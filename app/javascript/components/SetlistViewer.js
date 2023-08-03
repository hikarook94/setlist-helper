// app/javascript/components/Event.js
import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const SetlistViewer = ({ setlists }) => {

  return (
    <>
      <h1>Setlist</h1>
    </>
  );
};

SetlistViewer.propTypes = {
  setlists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SetlistViewer;
