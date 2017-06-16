import React from 'react';

const Loader = ({fetching, children}) => {
  if (fetching) {
    return (
      <div className="center-block">
        <div className="loader"></div>
      </div>
    );
  } else {
    return children;
  }
};

export default Loader;
