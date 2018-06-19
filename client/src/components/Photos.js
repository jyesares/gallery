import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {loadMore, detailPhoto, loadInit, closeImage} from '../store/actions';
import './styles.css';
import Image from './Image';
import ImageDescription from './ImageDescription';

class Photos extends Component {
  componentDidMount() {
    this.props.loadInit();
    document.addEventListener('scroll', this.handleEventScroll.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleEventScroll);
  }

  handleEventScroll(event) {
    if (event.type === 'scroll') {
      const d = document.documentElement;
      if (d.scrollTop + d.clientHeight >= d.offsetHeight) {
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
                  onClick={e => {
                    this.props.detailPhoto(photo, e.target.offsetTop);
                    window.scrollTo(0, e.target.offsetTop - 20);
                  }}
                />
              </div>
            </div>
          ))}
          {this.props.isFetching && <div className="fetching">Loading...</div>}
        </div>
        {this.props.photo &&
          this.props.imageIsOpen && (
            <div className="detail">
              <div
                className="detailImage effect2"
                style={{
                  position: 'absolute',
                  top: `${this.props.offset}px`,
                }}
              >
                <ImageDescription
                  photo={this.props.photo}
                  closeButton={this.props.closeImage}
                />
                <Image photo={this.props.photo} enableLink={true} />
              </div>
            </div>
          )}
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
  imageIsOpen: state.imageIsOpen,
});

const mapDispatchToProps = dispatch => ({
  loadMore: () => dispatch(loadMore()),
  detailPhoto: (photo, offset) => dispatch(detailPhoto(photo, offset)),
  loadInit: () => dispatch(loadInit()),
  closeImage: () => dispatch(closeImage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Photos);
