import {
  INCREMENT_PAGE,
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_FAILURE,
  FETCH_PHOTOS_SUCCESS,
  DETAIL_PHOTO,
  LOAD_FIRST_IMAGE,
} from '../constants';
import {getRecentPhotos} from '../services';

export const incrementPage = () => ({
  type: INCREMENT_PAGE,
});

export const loadMore = () => dispatch => {
  dispatch(incrementPage());
  dispatch(fetchPhotos());
};

export const fetchPhotos = () => async (dispatch, getState) => {
  dispatch(fetchPhotosRequest());
  let response;
  try {
    response = await getRecentPhotos(getState().page);
  } catch (err) {
    dispatch(fetchPhotosFailure(err));
  }
  const json = await response.json();
  dispatch(fetchPhotosSuccess(json));
};

export const fetchPhotosRequest = () => ({
  type: FETCH_PHOTOS_REQUEST,
});

export const fetchPhotosFailure = error => ({
  type: FETCH_PHOTOS_FAILURE,
  error,
});

export const fetchPhotosSuccess = data => ({
  type: FETCH_PHOTOS_SUCCESS,
  data,
});

export const detailPhoto = (data, offset) => ({
  type: DETAIL_PHOTO,
  data,
  offset,
});

export const loadInit = () => async (dispatch, getState) => {
  dispatch(fetchPhotosRequest());
  let response;
  try {
    response = await getRecentPhotos(getState().page);
  } catch (err) {
    dispatch(fetchPhotosFailure(err));
  }
  const json = await response.json();
  dispatch(fetchPhotosSuccess(json));
  dispatch(loadFirstImage(json.photos.photo[0]));
};

export const loadFirstImage = photo => ({
  type: LOAD_FIRST_IMAGE,
  photo,
});
