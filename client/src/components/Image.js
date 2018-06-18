import React from 'react';

export default ({photo, index, onClick, enableLink = false}) => {
  const {farm, server, id, secret} = photo;
  const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  return (
    <div>
      {enableLink ? (
        <a href={enableLink === true ? url : ''}>
          <img key={index || 0} src={url} onClick={onClick} />
        </a>
      ) : (
        <img key={index || 0} src={url} onClick={onClick} />
      )}
    </div>
  );
};
