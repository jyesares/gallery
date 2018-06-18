import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {loadMore, fetchPhotos, detailPhoto} from '../store/actions';
import './Photos.css';

const Image = ({photo, index, onClick, enableLink = false}) => {
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

const ImageDescription = ({photo}) => (
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

class Photos extends Component {
  componentDidMount() {
    this.props.fetchPhotos();
    document.addEventListener('scroll', this.handleEventScroll.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleEventScroll);
  }

  handleEventScroll(event) {
    if (event.type === 'scroll') {
      const d = document.documentElement;
      if (d.scrollTop + window.innerHeight >= d.offsetHeight) {
        document.removeEventListener('scroll', this.handleEventScroll);
        this.props.loadMore();
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="photos">
          {this.props.photos.map((photo, i) => (
            <div className="box">
              <div className="hoverName">{photo.ownername}</div>
              <div className="image effect1">
                <Image
                  photo={photo}
                  index={i}
                  onClick={e =>
                    this.props.detailPhoto(photo, e.target.offsetTop)
                  }
                />
              </div>
            </div>
          ))}
          {this.props.isFetching && <div className="fetching">Loading...</div>}
        </div>
        {this.props.photo ? (
          <div className="detail">
            <div
              className="detailImage effect2"
              style={{
                position: 'absolute',
                top: `${this.props.offset}px`,
              }}
            >
              <ImageDescription photo={this.props.photo} />
              <Image photo={this.props.photo} enableLink={true} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photos,
  page: state.page,
  isFetching: state.isFetching,
  photo: state.photo,
  offset: state.offset,
});

const mapDispatchToProps = dispatch => ({
  loadMore: () => dispatch(loadMore()),
  fetchPhotos: () => dispatch(fetchPhotos()),
  detailPhoto: (photo, offset) => dispatch(detailPhoto(photo, offset)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Photos);
