import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadMore, fetchPhotos, detailPhoto} from '../store/actions';
import './Photos.css';

const Image = ({photo, index, onClick}) => (
  <img
    key={index || 0}
    src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${
      photo.id
    }_${photo.secret}.jpg`}
    onClick={onClick}
  />
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
      if (d.scrollTop + window.innerHeight === d.offsetHeight) {
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
            <div className="frame effect1">
              <Image
                photo={photo}
                index={i}
                onClick={e => this.props.detailPhoto(photo, e.target.offsetTop)}
              />
            </div>
          ))}
          {this.props.isFetching && <div className="fetching">Loading...</div>}
        </div>
        <div className="detail">
          {console.log(this.props)}
          {this.props.photo ? (
            <div
              className="detailFrame effect2"
              style={{
                boxShadow: '1px solid red',
                position: 'absolute',
                top: `${this.props.offset}px`,
              }}
            >
              <Image photo={this.props.photo} />
            </div>
          ) : null}
        </div>
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
