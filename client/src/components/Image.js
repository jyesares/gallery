import React from 'react';

export default ({photo, index, onClick, enableLink = false}) => {
  const {farm, server, id, secret, owner} = photo;
  const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  const urlFlickr = `https://www.flickr.com/photos/${owner}/${id}`;
  return (
    <div>
      {enableLink ? (
        <a href={enableLink === true ? urlFlickr : ''}>
          <img key={index || 0} src={url} onClick={onClick} />
        </a>
      ) : (
        <img key={index || 0} src={url} onClick={onClick} />
      )}
    </div>
  );
};
