import React from 'react';
import moment from 'moment';

import './styles.css';

export default ({photo}) => (
  <div className="description">
    <span>
      <b>Title</b>: {photo.title}
    </span>
    <span>
      <b>ID</b>: {photo.id}
    </span>
    <span>
      <b>OwnerId</b>: {photo.owner}
    </span>
    <span>
      <b>OwnerName</b>: {photo.ownername}
    </span>
    <span>
      <b>Date upload</b>: {moment.unix(photo.dateupload).format('MM/DD/YYYY')}
    </span>
  </div>
);
