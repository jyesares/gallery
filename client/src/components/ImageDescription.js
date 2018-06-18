import React from 'react';
import moment from 'moment';

import './styles.css';

export default ({photo}) => {
  const {title, id, owner, ownername, dateupload} = photo;

  return (
    <div className="description">
      <span>
        <b>Title</b>:{' '}
        {title.length >= 60 ? `${title.substring(0, 59)}...` : title}
      </span>
      <span>
        <b>ID</b>: {id}
      </span>
      <span>
        <b>OwnerId</b>: {owner}
      </span>
      <span>
        <b>OwnerName</b>: {ownername}
      </span>
      <span>
        <b>Date upload</b>: {moment.unix(dateupload).format('MM/DD/YYYY')}
      </span>
    </div>
  );
};
