import {
  INCREMENT_PAGE,
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_FAILURE,
  FETCH_PHOTOS_SUCCESS,
  DETAIL_PHOTO,
  LOAD_FIRST_IMAGE,
  CLOSE_IMAGE,
} from '../constants';

const initialState = {
  page: 1,
  photos: [],
  isFetching: false,
  error: null,
  photo: null,
  offset: null,
  imageIsOpen: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_PAGE:
      return {...state, page: state.page + 1};
    case FETCH_PHOTOS_REQUEST:
      return {...state, isFetching: true};
    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        photos: [...state.photos, ...action.data.photos.photo],
      };
    case FETCH_PHOTOS_FAILURE:
      return {...state, isFetching: false, error: action.error};
    case DETAIL_PHOTO:
      return {
        ...state,
        photo: action.data,
        offset: action.offset,
        imageIsOpen: true,
      };
    case LOAD_FIRST_IMAGE:
      return {...state, photo: {...action.photo}};
    case CLOSE_IMAGE:
      return {...state, imageIsOpen: false};
    default:
      return state;
  }
};

export default rootReducer;
